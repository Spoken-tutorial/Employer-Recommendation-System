/* eslint-disable react/prop-types */
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import EventLayout from "./eventCardLayout";
import EventSection from "./eventSectionLayout";
function FeaturedEventsCards(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        rowSpacing={4}
        sx={{ marginTop: "-1rem" }}
      >
        {props.data.map((obj, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <EventLayout data={obj} category={"past"}></EventLayout>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
function FeaturedEvents(props) {
  return (
    <EventSection
      Component={<FeaturedEventsCards data={props.data} />}
    ></EventSection>
  );
}
export default FeaturedEvents;
