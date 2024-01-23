import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EventLayout from "./eventCardLayout";
import { HashLink } from "react-router-hash-link";
import { viewAllEventList } from "../../constants/viewAllEvents";
import scrollWithOffset from "../../utils/hashScrollwithOffset";
import EventSection from "./eventSectionLayout";
import { scrollToTop } from "../../utils/scrollToTop";

function ViewAllEventsCards() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HashLink
          to="/#events"
          style={{ textDecoration: "none" }}
          scroll={(el) => scrollWithOffset(el)}
        >
          <Button size="small" variant="text">
            Go Back
          </Button>
        </HashLink>
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
        {viewAllEventList.map((obj, index) => (
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
function ViewAllEvents() {
  return <EventSection Component={<ViewAllEventsCards />}></EventSection>;
}
export default ViewAllEvents;
