/* eslint-disable react/prop-types */
import React from "react";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { state, citiesOfState } from "../../utils/stateCities";

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

function getStyles(name, cityName, theme) {
  return {
    fontWeight:
      cityName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function StateAndCityMultipleInput({ data, manipulateStudentLocationList }) {
  const handleStudentState = (event, index) => {
    const newData = [...data];
    newData[index].state = event.target.value;
    manipulateStudentLocationList(newData);
  };

  const handleFossDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    manipulateStudentLocationList(newData);
  };
  const theme = useTheme();
  const [cityName, setcityName] = React.useState([]);

  const handleMultipleCitiesChange = (event, index) => {
    const {
      target: { value },
    } = event;
    setcityName(typeof value === "string" ? value.split(",") : value);
    const newData = [...data];
    newData[index].city = typeof value === "string" ? value.split(",") : value;
    manipulateStudentLocationList(newData);
  };

  return (
    <>
      {data.length != 0 ? (
        <>
          {data.map((obj, index) => (
            <>
              <Grid container spacing={2} sx={{ mt: "0.5rem" }} key={index}>
                {/* student state */}
                <Grid item sx={{ width: "20rem" }}>
                  <FormControl
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                    size="small"
                  >
                    <InputLabel id="studentState" sx={{ fontSize: "0.9rem" }}>
                      Student State
                    </InputLabel>
                    <Select
                      labelId="studentState"
                      id="studentState"
                      value={obj.state}
                      onChange={(e) => handleStudentState(e, index)}
                      sx={{ fontSize: "0.8rem" }}
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
                </Grid>
                <Grid item sx={{ width: "20rem" }}>
                  {/* multiple cities */}
                  <FormControl sx={{ width: "100%" }} size="small">
                    <InputLabel id="studentCity" sx={{ fontSize: "0.9rem" }}>
                      Student City
                    </InputLabel>
                    <Select
                      labelId="studentCity"
                      id="studentCity"
                      multiple
                      disabled={obj.state == "" ? true : false}
                      value={obj.city}
                      onChange={(e) => handleMultipleCitiesChange(e, index)}
                      input={
                        <OutlinedInput id="studentCity" label="Student City" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              sx={{
                                backgroundColor: "#002648",
                                color: "#ffffff",
                                fontSize: "0.7rem",
                              }}
                            />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {obj.state != ""
                        ? citiesOfState[obj.state].map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, cityName, theme)}
                              sx={{ fontSize: "0.7rem" }}
                            >
                              {name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  {/* delete button */}
                  <IconButton
                    aria-label="delete"
                    sx={{ mt: "1rem", fontSize: "0.3rem!important" }}
                    onClick={() => {
                      handleFossDelete(index);
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: "1.1rem" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </>
          ))}
        </>
      ) : null}
    </>
  );
}
export default StateAndCityMultipleInput;
