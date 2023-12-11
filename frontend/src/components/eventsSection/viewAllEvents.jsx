import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EventLayout from "./eventCardLayout";
import { Link } from "react-router-dom";
import { viewAllEventList } from "../../constants/viewAllEvents";
function ViewAllEvents() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="../" style={{ textDecoration: "none" }}>
          <Button size="small" variant="text">
            Go Back
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
        {viewAllEventList.map((obj, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
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

export default ViewAllEvents;
