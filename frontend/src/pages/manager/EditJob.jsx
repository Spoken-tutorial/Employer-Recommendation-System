import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function ManagerEditJob() {
    const { job_id } = useParams();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const url = `admin/manager/jobs/${job_id}/`;
                const response = await axiosInstance.get(url);
                setForm(response.data);
            } catch (error) {
                setErrors({ error: "Failed to fetch job details" });
            }
        };
        fetchJob();
    }, [job_id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `admin/manager/jobs/edit/${job_id}/`;
            await axiosInstance.put(url, form);
            setSuccess("Job updated successfully!");
        } catch (error) {
            setErrors(error.response?.data || { error: "Failed to update job" });
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" mb={2}>Edit Job (Manager)</Typography>
            <form onSubmit={handleFormSubmit}>
                {/* Render job form fields here, similar to employer */}
                <Button type="submit" variant="contained">Update</Button>
            </form>
            {success && <Typography color="success.main">{success}</Typography>}
            {errors.error && <Typography color="error">{errors.error}</Typography>}
        </Container>
    );
}
