import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import axiosManager from "../../api/axiosManager";

export default function ManagerJobDetail() {
    const { job_id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const url = `admin/manager/jobs/${job_id}/`;
                const response = await axiosManager.get(url);
                setJob(response.data);
            } catch (error) {
                setError("Failed to fetch job details");
            }
        };
        fetchJob();
    }, [job_id]);

    if (error) return <Typography color="error">{error}</Typography>;
    if (!job) return <Typography>Loading...</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" mb={2}>Job Details (Manager)</Typography>
            <Typography variant="body1">Title: {job.title}</Typography>
        </Container>
    );
}
