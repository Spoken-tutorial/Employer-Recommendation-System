/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
function CompanyLayout({ data }) {
  return (
    <Link
      to="www.google.com"
      target="_blank"
      style={{ textDecoration: "none" }}
      reloadDocument
    >
      <Box
        sx={{
          width: { xs: "17rem", sm: "18rem", md: "20rem" },
          height: "5rem",
          display: "flex",
          alignItems: "center",
          borderStyle: "solid",
          borderWidth: "0.02rem",
          borderRadius: "0.3rem",
          borderColor: "#ffffff",
          backgroundColor: "#F9F9F9",
          boxShadow: "4px 5px 8px rgba(0, 0, 0, 0.3)",
          "&:hover": {
            borderColor: "#FFA500CC",
            borderWidth: "0.1rem",
            transform: "scale(1.03)",
          },
        }}
      >
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={data.logo}
              sx={{ width: "5rem", height: "3rem" }}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="body"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#002648" }}
                >
                  {data.companyName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  display="block"
                  gutterBottom
                  sx={{ color: "#002648" }}
                >
                  {data.domain}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
}
export default CompanyLayout;
