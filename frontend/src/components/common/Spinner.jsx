import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Spinner() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px'
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;