import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EventLayout from "./eventCardLayout";
import { Link } from "react-router-dom";
import { featuredEventList } from "../../constants/featuredEvents";
import EventSection from "./eventSectionLayout";
function FeaturedEventsCards() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="events/view-all" style={{ textDecoration: "none" }}>
          <Button size="small" variant="text">
            View all
          </Button>
        </Link>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        rowSpacing={4}
        sx={{ marginTop: "-1rem" }}
      >
        {featuredEventList.map((obj, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <EventLayout data={obj}></EventLayout>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
function FeaturedEvents() {
  return <EventSection Component={<FeaturedEventsCards />}></EventSection>;
}
export default FeaturedEvents;
