import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
function AboutSection() {
  return (
    <>
      <Box
        sx={{
          marginTop: "2rem",
          p: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
          }}
        >
          About Us
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "-0.2rem",
          }}
        ></Divider>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ mt: "1rem", lineHeight: "2rem" }}
        >
          The Spoken Tutorial Project is a Massive Open Online Courses or MOOCs
          based IT-software training project of the National Mission on
          Education through ICT, funded by Ministry of Human Resource
          Development, Government of India. Topper students from Spoken Tutorial
          Tests will be able to apply for the jobs via Job Recommendation
          System. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Typography variant="subtitle2" gutterBottom sx={{ mt: "1rem" }}>
          Welcome to a brighter future with us!
        </Typography>
      </Box>
    </>
  );
}

export default AboutSection;
