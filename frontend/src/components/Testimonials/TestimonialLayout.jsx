/* eslint-disable react/prop-types */
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
function TestimonialLayout({ data }) {
  const baseUrl = "https://jrs.spoken-tutorial.org";
  return (
    <Box
      sx={{
        width: { xs: "17rem", sm: "18rem", md: "20rem", lg: "19rem" },
        height: { xs: "8rem", sm: "9.5rem" },
        display: "flex",
        alignItems: "center",
        boxShadow: "4px 12px 5px rgba(0, 0, 0, 0.3)",
        "&:hover": {
          transform: "scale(1.04)",
        },
        marginBottom: "3.5rem",
      }}
    >
      <Grid container>
        <Grid item>
          <Box>
            <video
              controls
              style={{
                width: "100%",
                height: "100%",
                marginTop: "0.1rem",
                borderRadius: "0.3rem",
              }}
            >
              <source src={baseUrl + data.location} type="video/mp4"></source>
              Your browser does not support the video player.
            </video>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default TestimonialLayout;
