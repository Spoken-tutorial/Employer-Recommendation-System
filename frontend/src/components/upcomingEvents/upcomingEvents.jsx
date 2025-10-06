/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import EventLayout from "../eventsSection/eventCardLayout";

function UpcomingEvents(props) {
  return (
    <>
      {(props.data || []).length > 0 ? (
        <>
          <Box
            sx={{ marginTop: "2rem", px: { xs: "1rem", md: "2rem" }, marginBottom: "3.5rem" }}
            id="upcomingEvents"
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
              Upcoming Events
            </Typography>
            <Divider
              sx={{
                backgroundColor: "#000000",
                mt: "0.3rem",
              }}
            ></Divider>
            <Box sx={{ mt: "3rem" }}>
              {(props.data || []).map((obj, index) => (
                <EventLayout
                  key={index}
                  data={obj}
                  category={"upcoming"}
                ></EventLayout>
              ))}
            </Box>
          </Box>
        </>
      ) : null}
    </>
  );
}

export default UpcomingEvents;