import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ContactUsForm from "./ContactUsForm";

function ContactUs() {
  return (
    <>
      <Box
        sx={{
          marginTop: "2rem",
          p: "1rem",
          marginBottom: "3.5rem",
        }}
        id="contact-us"
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
          Contact Us
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "-0.2rem",
          }}
        ></Divider>
        <ContactUsForm />
      </Box>
    </>
  );
}

export default ContactUs;
