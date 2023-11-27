/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import OpenInFullTwoToneIcon from "@mui/icons-material/OpenInFullTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import { Link } from "react-router-dom";

function EventLayout({ data }) {
  return (
    <Link
      to="www.google.com"
      target="_blank"
      style={{ textDecoration: "none" }}
      reloadDocument
    >
      <Box
        sx={{
          width: { xs: "17rem", sm: "18rem", md: "20rem", lg: "19rem" },
          height: "8.5rem",
          display: "flex",
          alignItems: "center",
          borderStyle: "solid",
          borderWidth: "0.02rem",
          borderRadius: "0.3rem",
          borderColor: "#ffffff",
          backgroundColor: "#F9F9F9",
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
              {data.eventName}
            </Typography>

            <Divider sx={{ backgroundColor: "#000000", height: "0.05rem" }}>
              <Typography
                variant="caption"
                sx={{
                  position: "relative",
                  left: {
                    xs: "6.1rem",
                    sm: "6.5rem",
                    md: "7.7rem",
                    lg: "7.1rem",
                  },
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
                {data.status}
              </Typography>
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
                  {data.date}
                </Typography>
              </Grid>

              <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
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
                  {data.location}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OpenInFullTwoToneIcon
                  sx={{
                    width: "1rem",
                    color: "#002648",
                    "&:hover": {
                      transform: "scale(1.3)",
                    },
                  }}
                ></OpenInFullTwoToneIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
}
export default EventLayout;
