import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function ManagerCompanyDetail() {
    const { company_id } = useParams();
    const [company, setCompany] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const url = `admin/manager/companies/${company_id}/`;
                const response = await axiosInstance.get(url);
                setCompany(response.data);
            } catch (error) {
                setError("Failed to fetch company details");
            }
        };
        fetchCompany();
    }, [company_id]);

    if (error) return <Typography color="error">{error}</Typography>;
    if (!company) return <Typography>Loading...</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" mb={2}>Company Details (Manager)</Typography>
            <Typography variant="body1">Name: {company.name}</Typography>
            
        </Container>
    );
}
