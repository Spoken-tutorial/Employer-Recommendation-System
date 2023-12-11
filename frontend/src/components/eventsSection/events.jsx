import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Outlet } from "react-router-dom";
function EventSection() {
  return (
    <>
      <Box sx={{ marginTop: "2rem", p: "1rem", marginBottom: "2rem" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
          }}
        >
          Events
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
          }}
        ></Divider>
        <Outlet></Outlet>
      </Box>
    </>
  );
}

export default EventSection;
