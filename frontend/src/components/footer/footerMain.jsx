import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { about } from "../../constants/footer";
import FooterList from "./footer-list";
import BottomEnd from "./copyright-social";
import ContactDetails from "./contact-details";

function FooterMain() {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: "#002648",
          width: "100%",
          position: { xs: "", sm: "", md: "", lg: "" },
          bottom: { xs: "", sm: "", md: "", lg: "0" },
        }}
      >
        <Grid container spacing={2}>
          {/* Title & Logo */}
          <Grid item xs={12} md={3}>
            <Avatar
              sx={{
                width: "4rem",
                height: "4rem",
                textAlign: "center",
                margin: "auto",
                marginTop: "0.5rem",
              }}
              alt="IIT Bombay"
              src="../../../iitb-logo.png"
            />
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={{ color: "#ffffff", textAlign: "center" }}
            >
              Developed at IIT Bombay
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "-0.8rem",
              }}
            >
              Spoken Tutorial JRS
            </Typography>
          </Grid>
          {/* Footer Lists */}
          <Grid item xs={4} md={2}>
            <FooterList fTitle={"Trainings"} fList={about}></FooterList>
          </Grid>
          <Grid item xs={4} md={2}>
            <FooterList fTitle={"About"} fList={about}></FooterList>
          </Grid>
          <Grid item xs={4} md={2}>
            <FooterList fTitle={"Lorem"} fList={about}></FooterList>
          </Grid>
          <Grid item xs={12} md={3}>
            <ContactDetails></ContactDetails>
          </Grid>
        </Grid>
        {/* Bottom end copyright & social media */}
        <Divider
          sx={{
            backgroundColor: "#ffffff",
            mb: "0.1rem",
            mt: "0.1rem",
          }}
        ></Divider>
        <BottomEnd></BottomEnd>
      </Box>
    </footer>
  );
}
export default FooterMain;
