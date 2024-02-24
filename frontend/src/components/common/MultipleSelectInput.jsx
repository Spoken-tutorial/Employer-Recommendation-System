/* eslint-disable react/prop-types */
import React from "react";
import FormControl from "@mui/material/FormControl";
import { Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

function MultipleSelectInput(props) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, skillName, theme) {
    return {
      fontWeight:
        skillName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const handleOptionSelect = (event) => {
    const {
      target: { value },
    } = event;
    props.setValue(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl
        sx={{
          width: { xs: "auto", md: "100%" },
        }}
      >
        <Typography sx={{ mt: "", mb: "0.5rem", opacity: "60%" }}>
          {props.label}
        </Typography>

        <Select
          id={props.id}
          value={props.value}
          multiple
          onChange={handleOptionSelect}
          size={props.size != undefined ? props.size : "small"}
          input={<OutlinedInput id={props.id} label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: "#002648",
                    color: "#ffffff",
                    fontSize: "0.8rem",
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{ fontSize: "0.8rem" }}
              style={getStyles(name, props.value, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default MultipleSelectInput;
