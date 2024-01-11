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
import Grid from "@mui/material/Grid";
import { state, citiesOfState } from "../../../utils/stateCities";
function StudentDetails({
  instituteType,
  graduationYear,
  studentState,
  studentCity,
  handleInstituteType,
  handleGraduationYear,
  handleStudentState,
  handleStudentCity,
  GraduationYearOptions,
}) {
  const card = (
    <>
      <CardContent>
        {/* card description */}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Select Student Details like Graduation Year, Institute Type and more.
        </Typography>
        {/* student details input */}
        <Grid container spacing={2} sx={{ mt: "0.5rem" }}>
          {/* institution type */}
          <Grid item sx={{ width: "20rem" }}>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: { xs: "14rem", md: "18rem" },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#054C77" },
              }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ fontSize: "0.7rem" }}
              >
                Institute Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={instituteType}
                onChange={handleInstituteType}
                label="institute-type"
                sx={{ fontSize: "0.8rem" }}
              >
                <MenuItem value={10} sx={{ fontSize: "0.7rem" }}>
                  University
                </MenuItem>
                <MenuItem value={20} sx={{ fontSize: "0.7rem" }}>
                  Autonomous College
                </MenuItem>
                <MenuItem value={30} sx={{ fontSize: "0.7rem" }}>
                  Affiliated College
                </MenuItem>
                <MenuItem value={30} sx={{ fontSize: "0.7rem" }}>
                  Deemed University
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* graduation year */}
          <Grid item sx={{ width: "20rem" }}>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: { xs: "14rem", md: "18rem" },
                ml: { sm: "0", md: "1rem" },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#054C77" },
              }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ fontSize: "0.7rem" }}
              >
                Graduate Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={graduationYear}
                onChange={handleGraduationYear}
                label="graduation-year"
                sx={{ fontSize: "0.8rem" }}
              >
                {GraduationYearOptions}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: "0.5rem" }}>
          {/* student state */}
          <Grid item sx={{ width: "20rem" }}>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: { xs: "14rem", md: "18rem" },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#054C77" },
              }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ fontSize: "0.7rem" }}
              >
                Student State
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={studentState}
                onChange={handleStudentState}
                sx={{ fontSize: "0.8rem" }}
                label="institute-type"
              >
                {state.map((stateName, index) => (
                  <MenuItem
                    key={index}
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
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: { xs: "14rem", md: "18rem" },
                ml: { sm: "0", md: "1rem" },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#054C77" },
              }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ fontSize: "0.7rem" }}
              >
                Student City
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={studentCity}
                onChange={handleStudentCity}
                disabled={studentState == "" ? true : false}
                label="graduation-year"
                sx={{ fontSize: "0.8rem" }}
              >
                {studentState != ""
                  ? citiesOfState[studentState].map((stateName, index) => (
                      <MenuItem
                        key={index}
                        value={stateName}
                        sx={{ fontSize: "0.7rem" }}
                      >
                        {stateName}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default StudentDetails;
