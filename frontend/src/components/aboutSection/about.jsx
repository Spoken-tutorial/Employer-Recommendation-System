import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
function AboutSection() {
  return (
    <>
      <Box
        sx={{
          marginTop: "2rem",
          px: { xs: "1rem", md: "2rem" },
          marginBottom: "3.5rem",
        }}
        id="about-us"
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#054C77",
            fontSize: { xs: "1.5rem" },
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
          variant="body1"
          gutterBottom
          sx={{ mt: "1rem", lineHeight: "2rem" }}
        >
          The Spoken Tutorial Project is a Massive Open Online Courses or MOOCs
          based IT-software training project of the National Mission on
          Education through ICT, funded by Ministry of Human Resource
          Development, Government of India. Topper students from Spoken Tutorial
          Tests will be able to apply for the jobs via Job Recommendation
          System.
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom sx={{ mt: "1rem" }}>
          Welcome to a brighter future with us!
        </Typography>
      </Box>
    </>
  );
}

export default AboutSection;