import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Chip,
  Tooltip,
  IconButton,
  CircularProgress,
  Snackbar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const statusMap = {
  0: "draft",
  1: "pending_approval",
  2: "active",
  3: "rejected",
  4: "expired"
};

export default function ManagerJobs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const hasFetchedRef = useRef(false);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [perPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [pagesCache, setPagesCache] = useState({}); 
  const pagesPerBlock = 5; // 5 pages of 10
  const blockSize = 50;
  const [loadedBlocks, setLoadedBlocks] = useState(new Set()); 
  
  const handleRowClicked = (row) => {
    if (row.status === "draft") {
      navigate(`/manager/jobs/edit/${row.id}`);
    } else {
      navigate(`/manager/jobs/${row.id}`);
    }
  };

  useEffect(() => {
    const fetchBlock = async (blockIndex) => {
      
      const pageForBlock = blockIndex + 1; 
      try {
        const url = "admin/manager/jobs";
        const response = await axiosInstance.get(url, { params: { page: pageForBlock, page_size: blockSize } });
        const payload = response?.data;
        const raw = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
          ? payload.results
          : Array.isArray(payload?.jobs)
          ? payload.jobs
          : Array.isArray(payload?.data)
          ? payload.data
          : [];
        const total = Number(payload?.count) || Math.max(totalRows, blockIndex * blockSize + raw.length);
        const formatted = raw.map((job) => ({ ...job, status: statusMap[job.job_status] }));
        // slit into 5 pages of 10
        const newPages = {};
        for (let i = 0; i < formatted.length; i += perPage) {
          const pageNumber = blockIndex * pagesPerBlock + (i / perPage + 1);
          newPages[pageNumber] = formatted.slice(i, i + perPage);
        }
        setPagesCache((prev) => ({ ...prev, ...newPages }));
        setTotalRows(total);
        setLoadedBlocks((prev) => new Set(prev).add(blockIndex));
      } catch (err) {
        setError("Failed to load jobs");
      }
    };

    const init = async () => {
      setLoading(true);
      await fetchBlock(0);
      setCurrentPage(1);
      setLoading(false);
    };

    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      init();
    }
  }, [perPage, pagesPerBlock, blockSize, totalRows]);

  const ensureBlockLoaded = async (blockIndex) => {
    if (loadedBlocks.has(blockIndex)) return;
    setPageLoading(true);
    const pageForBlock = blockIndex + 1;
    try {
      const url = "admin/manager/jobs";
      const response = await axiosInstance.get(url, { params: { page: pageForBlock, page_size: blockSize } });
      const payload = response?.data;
      const raw = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.results)
        ? payload.results
        : Array.isArray(payload?.jobs)
        ? payload.jobs
        : Array.isArray(payload?.data)
        ? payload.data
        : [];
      const total = Number(payload?.count) || Math.max(totalRows, blockIndex * blockSize + raw.length);
      const formatted = raw.map((job) => ({ ...job, status: statusMap[job.job_status] }));
      const newPages = {};
      for (let i = 0; i < formatted.length; i += perPage) {
        const pageNumber = blockIndex * pagesPerBlock + (i / perPage + 1);
        newPages[pageNumber] = formatted.slice(i, i + perPage);
      }
      setPagesCache((prev) => ({ ...prev, ...newPages }));
      setTotalRows(total);
      setLoadedBlocks((prev) => new Set(prev).add(blockIndex));
    } catch (e) {
      setError("Failed to load jobs");
    } finally {
      setPageLoading(false);
    }
  };

  // snackbar
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const created = (location.state && location.state.created) || params.get("created");
    if (created === "job") {
      setSnackMsg("Job added successfully!");
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
    { name: "Job ID", selector: (row) => row.id, sortable: true, width: "90px" },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <Typography
          component="a"
          href={row.status === "draft" ? `/manager/jobs/edit/${row.id}` : `/manager/jobs/${row.id}`}
          color="primary"
          sx={{ textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}
        >
          {row.designation}
        </Typography>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <Chip
          size="small"
          label={row.status?.replace("_", " ")}
          sx={{
            backgroundColor:
              row.status === "draft"
                ? theme.palette.neutral?.main || theme.palette.grey[500]
                : row.status === "pending_approval"
                ? theme.palette.info.main
                : row.status === "active"
                ? theme.palette.success.main
                : row.status === "rejected"
                ? theme.palette.error.main
                : theme.palette.warning.main,
            color: "#fff",
            fontWeight: 500,
            letterSpacing: 1,
            fontSize: "0.75rem",
            height: 24,
            px: 1.2,
          }}
        />
      ),
      sortable: true,
      width: "170px",
    },
    {
      name: "Applicants",
      selector: (row) => row.num_applicants,
      cell: (row) => (
        <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
          {row.num_applicants ?? 0}
        </Typography>
      ),
      width: "120px",
    },
    {
      name: "Last Application Date",
      selector: (row) => row.last_app_date_human,
      sortable: true,
      width: "180px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Tooltip title={row.status === "draft" ? "Edit Job" : "View Job"}>
          <IconButton
            color="primary"
            onClick={() =>
              navigate(row.status === "draft" ? `/manager/jobs/edit/${row.id}` : `/manager/jobs/${row.id}`)
            }
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
      width: "110px",
    },
  ];

  return (
    <Box>
      <Box sx={{ background: '#4285f4', color: 'white', borderRadius: 2, p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Jobs (Manager)</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ background: 'white', color: '#4285f4', fontWeight: 600, boxShadow: 0 }} onClick={()=>navigate("add")}>Add Job</Button>
      </Box>
      {loading && <CircularProgress />}
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
            if (!loadedBlocks.has(nextBlock)) {
              ensureBlockLoaded(nextBlock);
            }
          }
        }}
        highlightOnHover
        pointerOnHover
        striped
        responsive
        progressPending={loading || pageLoading}
        onRowClicked={handleRowClicked}
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
    </Box>
  );
}

