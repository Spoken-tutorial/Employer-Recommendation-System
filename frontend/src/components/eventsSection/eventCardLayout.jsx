/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
//import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import EventModal from "./eventModal";

function EventLayout({ data, category }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "17rem", sm: "18rem", md: "20rem", lg: "22rem" },
        height: "12rem",
        display: "flex",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: "0.02rem",
        borderRadius: "0.3rem",
        borderColor: "#ffffff",
        backgroundColor: "#F9F9F9",
        p: 1,
        boxShadow: "4px 5px 8px rgba(0, 0, 0, 0.3)",
        "&:hover": {
          borderColor: "#FFA500CC",
          borderWidth: "0.1rem",
          transform: "scale(1.03)",
        },
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography
            variant="body"
            display="block"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#002648",
              textAlign: "center",
              mt: "0.5rem",
            }}
          >
            {data.name}
          </Typography>

          <Divider sx={{ backgroundColor: "#000000", height: "0.05rem" }}>
            {category === "upcoming" ? (
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  right: "1rem",
                  animation: `blink 1.5s infinite`,
                  "@keyframes blink": {
                    "50%": {
                      opacity: 0,
                    },
                  },
                  color: "#FFA500CC",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  mt: "0.1rem",
                }}
              >
                {category == "upcoming" ? "Upcoming" : "Over"}
              </Typography>
            ) : null}
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
              <CalendarMonthTwoToneIcon
                sx={{ color: "#FFA500CC", ml: "0.5rem", mt: "0.5rem" }}
              ></CalendarMonthTwoToneIcon>
              <Typography
                variant="body2"
                display="block"
                gutterBottom
                sx={{ color: "#000000", mt: "0.7rem", ml: "0.5rem" }}
              >
                {data.formatted_start_date}
              </Typography>
            </Grid>
            <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
              <CalendarMonthTwoToneIcon
                sx={{ color: "#000000", ml: "0.5rem", mt: "0.5rem" }}
              ></CalendarMonthTwoToneIcon>
              <Typography
                variant="body2"
                display="block"
                gutterBottom
                sx={{ color: "#000000", mt: "0.7rem", ml: "0.5rem" }}
              >
                {data.formatted_end_date}
              </Typography>
            </Grid>

            {/* <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
              <LocationOnTwoToneIcon
                sx={{ color: "#FFA500CC", ml: "0.5rem", mt: "0.3rem" }}
              ></LocationOnTwoToneIcon>
              <Typography
                variant="body2"
                display="block"
                gutterBottom
                sx={{
                  color: "#000000",
                  mt: "0.5rem",
                  ml: "0.3rem",
                  pb: "0.2rem",
                }}
              >
                {data.formatted_start_date}
              </Typography>
            </Grid> */}
            <Grid
              item
              xs={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <EventModal data={data} category={category}></EventModal>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
export default EventLayout;