import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

function TextAndBtn() {
  return (
    <Grid container direction="column" justifyContent="flex-start" sx={{}}>
      <Grid item>
        <Box>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bolder",
              color: "#002648",
              fontSize: { xs: "2rem" },
            }}
          >
            Spoken Tutorial
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#FFA500CC",
            fontSize: { xs: "1.5rem" },
          }}
        >
          Job Recommendation System
        </Typography>
      </Grid>
      <Divider
        sx={{
          backgroundColor: "#000000",
          mt: "-0.4rem",
          width: { xs: "17rem", sm: "21rem", md: "22rem" },
        }}
      ></Divider>
      <Grid item>
        <Typography variant="subtitle1" gutterBottom sx={{ mt: "0.7rem" }}>
          A platform to connect potential employers with students having the
          right skills set across India.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "#054C77",
            color: "#ffffff",
            mt: "1.5rem",
            "&:hover": {
              color: "#ffffff",
              backgroundColor: "#002648",
            },
          }}
        >
          Get Started
        </Button>
      </Grid>
    </Grid>
  );
}
export default TextAndBtn;
