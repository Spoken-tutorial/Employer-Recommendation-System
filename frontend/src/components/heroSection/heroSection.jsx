import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextAndBtn from "./textAndBtn";

function HeroSection() {
  return (
    <>
      <Box sx={{ marginTop: "2rem", p: "1rem", marginBottom: "2rem" }}>
        <Grid container alignItems="center">
          {/*Left part*/}
          <Grid item sm={12} md={8} sx={{ pl: "1rem" }}>
            <TextAndBtn></TextAndBtn>
          </Grid>
          {/*Right Part*/}
          <Grid
            item
            sm={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Avatar
              sx={{
                width: { xs: "18rem", md: "20rem" },
                height: "20rem",
                textAlign: "center",
              }}
              alt="IIT Bombay"
              src="../../../heroSectionAsset.png"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default HeroSection;
