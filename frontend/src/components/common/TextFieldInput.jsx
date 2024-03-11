/* eslint-disable react/prop-types */
import React from "react";
import TextField from "@mui/material/TextField";

function TextFieldInput({ value, setValue, label, id, type }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      size="small"
      value={value}
      type={type ? type : "text"}
      onChange={handleChange}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#002648",
          },
        },
        "& label.Mui-focused": {
          color: "#002648",
        },
        width: { xs: "auto", md: "24rem" },
        mr: { xs: 0, md: "3rem" },
        mb: { xs: "1.5rem", md: 0 },
      }}
    />
  );
}

export default TextFieldInput;
