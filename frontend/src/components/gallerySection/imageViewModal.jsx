/* eslint-disable react/prop-types */
import React from "react";
import { Box } from "@mui/material";

function ImageViewModal(props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderRadius: "0.5rem",
        maxWidth: "80vw",
        maxHeight: "80vh",
      }}
    >
      <img
        src={props.url}
        alt="Full Screen Image"
        style={{ maxWidth: "80%", maxHeight: "80%", borderRadius: "0.5rem" }}
      />
    </Box>
  );
}

export default ImageViewModal;
