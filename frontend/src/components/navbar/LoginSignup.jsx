import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
function LoginSigup({ type }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: type === "lg" ? "none" : "flex",
          sm: type === "lg" ? "none" : "flex",
          md: type === "lg" ? "flex" : "none",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent={type === "lg" ? "flex-end" : "flex-start"}
      >
        <Grid item>
          <Button sx={{ p: 0 }}>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={{ color: "#ffffff" }}
            >
              Login
            </Typography>
          </Button>
        </Grid>
        <Divider
          orientation="vertical"
          sx={{
            backgroundColor: "#ffffff",
            mr: "0.5rem",
            height: "1.2rem",
            mt: "0.4rem",
          }}
          flexItem
        />
        <Grid item>
          <Button sx={{ p: 0 }}>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={{ color: "#ffffff" }}
            >
              Register
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginSigup;
