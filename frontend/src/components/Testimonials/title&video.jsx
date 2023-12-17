/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TestimonialLayout from "./TestimonialLayout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";

function TitleAndVideo({ data, defaultExpand }) {
  const [expandEvent, setExpandEvent] = useState(defaultExpand ? true : false);

  function handleExpandEvent() {
    if (!defaultExpand) setExpandEvent(!expandEvent);
  }
  return (
    <>
      {/* Event title and button */}
      <Box
        sx={{
          backgroundColor: "#E5F6FD",
          display: "flex",
          alignItems: "center",
          padding: "0.2rem",
          marginTop: "1.5rem",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "auto",
        }}
      >
        {/* Date & title */}
        <Box>
          <CalendarMonthIcon
            sx={{
              fontSize: { xs: "1.1rem", md: "1.3rem", lg: "1.6rem" },
              mt: "-0.1rem",
            }}
          ></CalendarMonthIcon>
          <Typography
            variant="overline"
            gutterBottom
            sx={{
              ml: { xs: "0.2rem", sm: "0.2rem", md: "0.4rem" },
              fontSize: {
                xs: "0.5rem",
                sm: "0.7rem",
                md: "0.8rem",
              },
            }}
          >
            {data.title}: {data.date}
          </Typography>
        </Box>
        {/* Expand button */}
        <Box>
          {defaultExpand ? null : (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={handleExpandEvent}
            >
              {expandEvent ? (
                <ExpandLessIcon></ExpandLessIcon>
              ) : (
                <ExpandMoreIcon></ExpandMoreIcon>
              )}
            </IconButton>
          )}
        </Box>
      </Box>
      {/* Event videos */}
      {expandEvent ? (
        <Grow in={expandEvent}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            rowSpacing={10}
            sx={{
              marginTop: "-1rem",
              transition: "max-height 0.5s ease-in-out",
              maxHeight: expandEvent ? "1000px" : "0",
              overflow: "hidden",
            }}
          >
            {data.videos.map((obj, index) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TestimonialLayout data={obj}></TestimonialLayout>
              </Grid>
            ))}
          </Grid>
        </Grow>
      ) : null}
    </>
  );
}

export default TitleAndVideo;
