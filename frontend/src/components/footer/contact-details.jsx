import React from "react";
import { Box, Typography } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import Grid from "@mui/material/Grid";

function ContactDetails() {
  return (
    <Box
      sx={{
        mt: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        pl: { xs: 2, md: 4 },
      }}
    >
      {/* Address */}
      <Box
        sx={{ 
          display: "flex", 
          alignItems: "flex-start", 
          mb: 2,
          width: "100%"
        }}
      >
        <LocationOnRoundedIcon
          sx={{ 
            color: "#ffffff", 
            mr: 1, 
            mt: 0.5,
            fontSize: "1.2rem"
          }}
        />
        <Typography
          variant="caption"
          sx={{ 
            color: "#ffffff", 
            lineHeight: 1.4,
            fontSize: "0.875rem"
          }}
        >
          Spoken Tutorial Project, TCS Lab, Behind CAD Centre, IIT Bombay, Powai, Mumbai - 400076
        </Typography>
      </Box>

      {/* Phone and Email in a row */}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CallRoundedIcon 
              sx={{ 
                color: "#ffffff", 
                mr: 1,
                fontSize: "1.2rem"
              }} 
            />
            <Typography
              variant="caption"
              sx={{ 
                color: "#ffffff",
                fontSize: "0.875rem"
              }}
            >
              + 91 22 25764229
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailRoundedIcon 
              sx={{ 
                color: "#ffffff", 
                mr: 1,
                fontSize: "1.2rem"
              }} 
            />
            <Typography
              variant="caption"
              sx={{ 
                color: "#ffffff",
                fontSize: "0.875rem"
              }}
            >
              hr@spoken-tutorial.org
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactDetails;
