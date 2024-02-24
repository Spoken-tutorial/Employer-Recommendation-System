/* eslint-disable react/prop-types */
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { state, citiesOfState } from "../../utils/stateCities";

//props recieve state & city variables and their respective setVariables

function StateAndCityInput(props) {
  const handleOfficeStateChange = (event) => {
    props.setState(event.target.value);
  };

  const handleOfficeCityChange = (event) => {
    props.setCity(event.target.value);
  };
  return (
    <>
      {/* state */}
      <FormControl
        variant="outlined"
        sx={{
          width: { xs: "auto", md: "24rem" },
          mr: { xs: 0, md: "3rem" },
          mb: { xs: "1.5rem", md: 0 },
        }}
        size="small"
      >
        <InputLabel id="officeState" sx={{ fontSize: "0.9rem" }}>
          State (Office)
        </InputLabel>
        <Select
          labelId="State (Office)"
          id="officeState"
          value={props.state}
          onChange={handleOfficeStateChange}
          label="institute-type"
        >
          {state.map((stateName) => (
            <MenuItem
              key={stateName}
              value={stateName}
              sx={{ fontSize: "0.7rem" }}
            >
              {stateName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* city */}
      <FormControl
        variant="outlined"
        sx={{
          width: { xs: "auto", md: "24rem" },
        }}
        size="small"
      >
        <InputLabel id="officeLocation" sx={{ fontSize: "0.9rem" }}>
          City (Office)
        </InputLabel>
        <Select
          labelId="city (Office)"
          id="officeLocation"
          value={props.city}
          disabled={props.state == "" ? true : false}
          onChange={handleOfficeCityChange}
          label="institute-type"
        >
          {props.state != ""
            ? citiesOfState[props.state].map((stateName) => (
                <MenuItem
                  key={stateName}
                  value={stateName}
                  sx={{ fontSize: "0.7rem" }}
                >
                  {stateName}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}

export default StateAndCityInput;
