import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { Link } from "react-router-dom";

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
          sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}
        >
          <Link
            to="https://www.facebook.com/SpokenTutorial.org"
            reloadDocument
            target="_blank"
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
          </Link>
          <Link
            to="https://www.youtube.com/user/SpokenTutorialIITB"
            reloadDocument
            target="_blank"
          >
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
          </Link>
          <Link
            to="https://www.linkedin.com/company/spokentutorial/"
            reloadDocument
            target="_blank"
          >
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
          </Link>
          <Link
            to="https://spoken-tutorial.org/"
            reloadDocument
            target="_blank"
          >
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
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
export default BottomEnd;
