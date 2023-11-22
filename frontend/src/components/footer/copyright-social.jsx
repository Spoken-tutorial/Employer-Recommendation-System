import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
function BottomEnd() {
  const currentYear = new Date().getFullYear();
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{
              color: "#9396A3",
              p: "0.2rem",
              ml: "1rem",
              textAlign: "center",
            }}
          >
            &copy; {currentYear} Spoken Tutorial Job Recommendation System. All
            Rights Reserved.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <IconButton aria-label="delete">
            <FacebookRoundedIcon
              sx={{
                color: "#9396A3",
                width: "1.3rem",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            ></FacebookRoundedIcon>
          </IconButton>
          <IconButton aria-label="delete">
            <YouTubeIcon
              sx={{
                color: "#9396A3",
                width: "1.3rem",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            ></YouTubeIcon>
          </IconButton>
          <IconButton aria-label="delete">
            <LinkedInIcon
              sx={{
                color: "#9396A3",
                width: "1.3rem",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            ></LinkedInIcon>
          </IconButton>
          <IconButton aria-label="delete">
            <LanguageRoundedIcon
              sx={{
                color: "#9396A3",
                width: "1.3rem",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            ></LanguageRoundedIcon>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
export default BottomEnd;
