import { Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function ManagerLayout() {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" mb={4}>Manager Dashboard</Typography>
            {/* You can add sidebar/header here if needed */}
            <Outlet />
        </Container>
    );
}
