/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import StateAndCityInput from "./StateAndCityInput";

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

const names = [
  "University",
  "Autonomous College",
  "Affiliated College",
  "Deemed University",
];

function getStyles(name, instituteType, theme) {
  return {
    fontWeight:
      instituteType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function StudentDetails({
  instituteType,
  graduationYear,
  handleInstituteType,
  handleGraduationYear,
  GraduationYearOptions,
  studentLocationList,
  handleStudentLocationList,
}) {
  const theme = useTheme();
  //to add new state & city option in card
  const handleAddNewStateCity = () => {
    const newStudentLocationList = [
      ...studentLocationList,
      { state: "", city: [] },
    ];
    handleStudentLocationList(newStudentLocationList);
  };

  const card = (
    <>
      <CardContent>
        {/* card description */}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Select Student Details like Graduation Year, Institute Type, Student
          State & City.
        </Typography>
        {/* student details input */}
        <Grid container spacing={2} sx={{ mt: "0.5rem" }}>
          {/* institution type */}
          <Grid item sx={{ width: "20rem" }}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="studentInstituteType" sx={{ fontSize: "0.9rem" }}>
                Institute Type
              </InputLabel>
              <Select
                labelId="studentInstituteType"
                id="studentInstituteType"
                multiple
                value={instituteType}
                onChange={handleInstituteType}
                sx={{ height: "auto" }}
                input={
                  <OutlinedInput
                    id="studentInstituteType"
                    label="Institute Type"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    sx={{ fontSize: "0.7rem" }}
                    style={getStyles(name, instituteType, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* graduation year */}
          <Grid item sx={{ width: "20rem" }}>
            <FormControl
              sx={{
                mt: { xs: "1rem", sm: "0rem", md: 0, lg: "0rem" },
                width: "100%",
              }}
              size="small"
            >
              <InputLabel
                id="studentGraduationYear"
                sx={{ fontSize: "0.9rem" }}
              >
                Graduation Year
              </InputLabel>
              <Select
                labelId="studentGraduationYear"
                id="studentGraduationYear"
                multiple
                value={graduationYear}
                onChange={handleGraduationYear}
                sx={{ height: "auto" }}
                input={
                  <OutlinedInput
                    id="studentGraduationYear"
                    label="Graduation Year"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
                {GraduationYearOptions.map((name) => (
                  <MenuItem
                    key={name}
                    sx={{ fontSize: "0.7rem" }}
                    value={name}
                    style={getStyles(name, instituteType, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* state & city */}
        <StateAndCityInput
          data={studentLocationList}
          manipulateStudentLocationList={handleStudentLocationList}
        ></StateAndCityInput>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ fontSize: "0.8rem", ml: "0.5rem" }}
          onClick={handleAddNewStateCity}
        >
          + Add State & City Filter
        </Button>
      </CardActions>
    </>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default StudentDetails;
