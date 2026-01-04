import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextAndBtn from "./textAndBtn";

function HeroSection() {
  return (
    <>
      <Box
        sx={{ marginTop: "1rem",  marginBottom: "3.5rem" }}
        id="home"
      >
        <Grid container alignItems="center" spacing={2}>
          {/*Left part*/}
          <Grid item xs={12} md={8} sx={{ pl: { xs: "1rem", md: "2rem" } }}>
            <TextAndBtn></TextAndBtn>
          </Grid>
          {/*Right Part*/}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: { xs: "16rem", sm: "18rem", md: "20rem", lg: "24rem" },
                height: { xs: "16rem", sm: "18rem", md: "20rem", lg: "24rem" },
                textAlign: "center",
              }}
              alt="IIT Bombay"
              src="https://jrs.spoken-tutorial.org/static/images/heroSectionAsset.png"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default HeroSection;