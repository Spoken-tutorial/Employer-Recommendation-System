import React from "react";
import { Box, Typography } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
function UnderDevelopmentInfo() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "90vh",
          flexDirection: "column",
          justifyItems: "center",
          justifyContent: "center",
          alignItems: "center",
          mb: "4rem",
          mt: "-2rem",
        }}
      >
        <Box sx={{ mb: "-1.5rem" }}>
          <InfinitySpin
            visible={true}
            width="200"
            color="#002648"
            ariaLabel="infinity-spin-loading"
          />
        </Box>
        <Box
          sx={{
            width: { sm: "30rem", md: "40rem" },
            textAlign: "center",
            m: "1rem",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.05rem",
              color: "#002648",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2.2rem" },
              lineHeight: {
                xs: "1.8rem",
                sm: "2.5rem",
                md: "2.8rem",
                lg: "3rem",
                xl: "3rem",
              },
              mb: "0.5rem",
            }}
          >
            We are currently updating our website to serve you better.
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            sx={{
              mt: "1rem",
              letterSpacing: "0.05rem",
              color: "#002648",
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" },
            }}
          >
            Please bear with us as we make improvements.
          </Typography>
          <Typography
            variant="overline"
            gutterBottom
            display="block"
            sx={{
              mt: "0.5rem",
              letterSpacing: "0.05rem",
              color: "#002648",
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
            }}
          >
            <span style={{ color: "#FFA500CC", fontWeight: "bold" }}>
              Thank you for your patience!
            </span>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default UnderDevelopmentInfo;
