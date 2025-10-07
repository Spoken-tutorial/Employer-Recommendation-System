// src/layouts/StudentLayout.tsx
import { Outlet } from "react-router-dom";
import { Container, Box, useTheme } from "@mui/material";
import StudentNav from "./StudentNav";

export default function StudentLayout() {
  const theme = useTheme();
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: theme.palette.background.default }}>
      <StudentNav />
      <Container sx={{ py: 3, flex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
