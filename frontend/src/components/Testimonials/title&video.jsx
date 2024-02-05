/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import TestimonialLayout from "./TestimonialLayout";
import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";

function TitleAndVideo({ data }) {
  return (
    <>
      {/* Event videos title and date */}
      <Grid
        container
        spacing={3}
        rowSpacing={10}
        sx={{
          marginTop: "-1rem",
          transition: "max-height 0.5s ease-in-out",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {data.map((obj, index) => (
          <>
            <Box sx={{ m: 3, height: "auto" }}>
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                <TestimonialLayout data={obj}></TestimonialLayout>
                <Divider
                  sx={{
                    height: "0.1rem",
                    backgroundColor: "#000000",
                    mt: "0.1rem",
                    width: {
                      xs: "17rem",
                      sm: "18rem",
                      md: "20rem",
                      lg: "19rem",
                    },
                    position: "relative",
                    bottom: "1rem",
                    opacity: "5%",
                  }}
                ></Divider>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{
                    fontSize: "0.8rem",
                    mt: "-0.5rem",
                    lineHeight: "1.4rem",
                    width: {
                      xs: "17rem",
                      sm: "18rem",
                      md: "20rem",
                      lg: "19rem",
                    },
                    textAlign: "center",
                    opacity: "90%",
                  }}
                >
                  {obj.event}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{
                    fontSize: "0.8rem",
                    lineHeight: "1.4rem",
                    width: {
                      xs: "17rem",
                      sm: "18rem",
                      md: "20rem",
                      lg: "19rem",
                    },
                    textAlign: "center",
                    opacity: "80%",
                  }}
                >
                  {obj.date}
                </Typography>
                <Divider
                  sx={{
                    height: "0.1rem",
                    backgroundColor: "#000000",
                    width: {
                      xs: "17rem",
                      sm: "18rem",
                      md: "20rem",
                      lg: "19rem",
                    },
                    opacity: "5%",
                  }}
                ></Divider>
              </Grid>
            </Box>
          </>
        ))}
      </Grid>
    </>
  );
}

export default TitleAndVideo;
