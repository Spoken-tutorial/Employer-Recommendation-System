/* eslint-disable react/prop-types */
import React from "react";
import Alert from "@mui/material/Alert";
function AlertBox({ alertMessage, alertType, style }) {
  return (
    <Alert severity={alertType} sx={style}>
      {alertMessage}
    </Alert>
  );
}

export default AlertBox;
