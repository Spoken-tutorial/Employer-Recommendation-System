import { Container, Typography, Button, Box, IconButton, Link, Snackbar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export default function ManagerCompanies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [pagesCache, setPagesCache] = useState({});
    const pagesPerBlock = 5;
    const blockSize = 50;
    const [loadedBlocks, setLoadedBlocks] = useState(new Set());

    useEffect(() => {
        const fetchBlock = async (blockIndex) => {
            const pageForBlock = blockIndex + 1; 
            try {
                const response = await axiosInstance.get("admin/manager/companies", { params: { page: pageForBlock, page_size: blockSize } });
                const payload = response?.data;
                const raw = Array.isArray(payload)
                    ? payload
                    : Array.isArray(payload?.results)
                        ? payload.results
                        : Array.isArray(payload?.companies)
                            ? payload.companies
                            : Array.isArray(payload?.data)
                                ? payload.data
                                : [];
                const total = Number(payload?.count) || Math.max(totalRows, blockIndex * blockSize + raw.length);
                const newPages = {};
                for (let i = 0; i < raw.length; i += perPage) {
                    const pageNumber = blockIndex * pagesPerBlock + (i / perPage + 1);
                    newPages[pageNumber] = raw.slice(i, i + perPage);
                }
                setPagesCache(prev => ({ ...prev, ...newPages }));
                setTotalRows(total);
                setLoadedBlocks(prev => new Set(prev).add(blockIndex));
            } catch (error) {
                setError("Failed to load companies");
            }
        };

        const init = async () => {
            setLoading(true);
            await fetchBlock(0);
            setCurrentPage(1);
            setLoading(false);
        };
        init();
    }, [perPage, pagesPerBlock, blockSize, totalRows]);

    const ensureBlockLoaded = async (blockIndex) => {
        if (loadedBlocks.has(blockIndex)) return;
        setPageLoading(true);
        const pageForBlock = blockIndex + 1;
        try {
            const response = await axiosInstance.get("admin/manager/companies", { params: { page: pageForBlock, page_size: blockSize } });
            const payload = response?.data;
            const raw = Array.isArray(payload)
                ? payload
                : Array.isArray(payload?.results)
                    ? payload.results
                    : Array.isArray(payload?.companies)
                        ? payload.companies
                        : Array.isArray(payload?.data)
                            ? payload.data
                            : [];
            const total = Number(payload?.count) || Math.max(totalRows, blockIndex * blockSize + raw.length);
            const newPages = {};
            for (let i = 0; i < raw.length; i += perPage) {
                const pageNumber = blockIndex * pagesPerBlock + (i / perPage + 1);
                newPages[pageNumber] = raw.slice(i, i + perPage);
            }
            setPagesCache(prev => ({ ...prev, ...newPages }));
            setTotalRows(total);
            setLoadedBlocks(prev => new Set(prev).add(blockIndex));
        } catch (e) {
            setError("Failed to load companies");
        } finally {
            setPageLoading(false);
        }
    };

    // snackbar 
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const created = (location.state && location.state.created) || params.get("created");
        if (created === "company") {
            setSnackMsg("Company added successfully!");
            setSnackOpen(true);
            
            if (location.state && location.state.created) {
                navigate(location.pathname, { replace: true });
            } else if (params.get("created")) {
                params.delete("created");
                const search = params.toString();
                navigate({ pathname: location.pathname, search }, { replace: true });
            }
        }
    }, [location, navigate]);

    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackOpen(false);
    };

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            cell: row => (
                <Link href={`/manager/company/${row.id}`} underline="hover" color="primary" sx={{ fontWeight: 500 }}>
                    {row.name}
                </Link>
            )
        },
        {
            name: "Contact",
            selector: row => row.contact,
        },
        {
            name: "Created At",
            selector: row => row.created_at,
        },
        {
            name: "Actions",
            cell: row => (
                <IconButton color="primary" onClick={() => navigate(`/manager/company/${row.id}`)}>
                    <VisibilityIcon />
                </IconButton>
            )
        }
    ];

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ background: '#4285f4', color: 'white', borderRadius: 2, p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Companies (Manager)</Typography>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ background: 'white', color: '#4285f4', fontWeight: 600, boxShadow: 0 }} onClick={()=>navigate("/manager/company/add")}>Add Company</Button>
            </Box>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <DataTable 
                columns={columns} 
                data={pagesCache[currentPage] || []} 
                pagination 
                paginationServer
                paginationPerPage={perPage}
                paginationRowsPerPageOptions={[perPage]}
                paginationTotalRows={totalRows}
                onChangePage={(page) => {
                    setCurrentPage(page);
                    const blockIndex = Math.floor((page - 1) / pagesPerBlock);
                    if (!pagesCache[page]) {
                        ensureBlockLoaded(blockIndex);
                    }
                    const pageWithinBlock = ((page - 1) % pagesPerBlock) + 1;
                    if (pageWithinBlock === 2) {
                        const nextBlock = blockIndex + 1;
                        if (!loadedBlocks.has(nextBlock)) ensureBlockLoaded(nextBlock);
                    }
                }}
                progressPending={loading || pageLoading}
            />
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleSnackClose}
                message={snackMsg}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Container>
    );
}
