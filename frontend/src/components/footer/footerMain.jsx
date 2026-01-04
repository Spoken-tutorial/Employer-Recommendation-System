import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { about, training } from "../../constants/footer";
import FooterList from "./footer-list";
import BottomEnd from "./copyright-social";
import ContactDetails from "./contact-details";
import { Link } from "react-router-dom";

function FooterMain() {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: "#002648",
          width: "100%",
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={4} alignItems="flex-start">
          {/* Title & Logo */}
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Link to="https://www.iitb.ac.in/" reloadDocument target="_blank">
                <Avatar
                  sx={{
                    width: "4rem",
                    height: "4rem",
                    margin: { xs: "auto", md: "0" },
                    mb: 1,
                  }}
                  alt="IIT Bombay"
                  src="https://jrs.spoken-tutorial.org/static/images/iitb-logo.png"
                />
              </Link>
              <Link
                to="https://www.iitb.ac.in/"
                reloadDocument
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="overline"
                  display="block"
                  sx={{ 
                    color: "#ffffff", 
                    textAlign: { xs: "center", md: "left" },
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em"
                  }}
                >
                  DEVELOPED AT IIT BOMBAY
                </Typography>
              </Link>
              <Typography
                variant="h6"
                sx={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: { xs: "center", md: "left" },
                  mt: 0.5,
                  fontSize: "1.25rem"
                }}
              >
                Spoken Tutorial JRS
              </Typography>
            </Box>
          </Grid>
          {/* Footer Lists */}
          <Grid item xs={6} md={2}>
            <FooterList fTitle={"Training"} fList={training}></FooterList>
          </Grid>
          <Grid item xs={6} md={2}>
            <FooterList fTitle={"About Us"} fList={about}></FooterList>
          </Grid>
          <Grid item xs={12} md={5}>
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