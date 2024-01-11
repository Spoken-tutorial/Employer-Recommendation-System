/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MandatoryFoss from "./MandatoryFoss";
import OptionalFoss from "./OptionalFoss";
import StudentDetails from "./StudentDetails";

function FossFilter() {
  //holds array of foss
  const [mandatoryFossList, setMandatoryFossList] = useState([]);
  const [optionalFossList, setOptionalFossList] = useState([]);
  //for student details
  const [instituteType, setInstituteType] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [studentState, setStudentState] = useState("");
  const [studentCity, setStudentCity] = useState("");
  const handleChangeInstituteType = (event) => {
    setInstituteType(event.target.value);
  };
  const handleChangeGraduationYear = (event) => {
    setGraduationYear(event.target.value);
  };
  const handleChangeStudentState = (event) => {
    setStudentState(event.target.value);
  };
  const handleChangeStudentCity = (event) => {
    setStudentCity(event.target.value);
  };
  const currentYear = new Date().getFullYear();
  const GraduationYearOptions = [];
  for (let i = currentYear - 2; i <= currentYear + 2; i++) {
    GraduationYearOptions.push(
      <MenuItem value={i} sx={{ fontSize: "0.7rem" }}>
        {i}
      </MenuItem>
    );
  }

  //for reset button
  const handleResetClick = () => {
    setMandatoryFossList([]);
    setOptionalFossList([]);
    setInstituteType("");
    setGraduationYear("");
    setStudentState("");
    setStudentCity("");
  };
  return (
    <>
      <Box sx={{ marginTop: "2rem", p: "1rem", marginBottom: "6rem" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
          }}
        >
          Filter Students
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
          }}
        ></Divider>
        {/* student details  */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "1.5rem" }}
        >
          Student Details
        </Typography>
        <StudentDetails
          instituteType={instituteType}
          graduationYear={graduationYear}
          studentState={studentState}
          studentCity={studentCity}
          handleInstituteType={handleChangeInstituteType}
          handleGraduationYear={handleChangeGraduationYear}
          handleStudentState={handleChangeStudentState}
          handleStudentCity={handleChangeStudentCity}
          GraduationYearOptions={GraduationYearOptions}
        ></StudentDetails>
        {/* mandatory foss */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "1.5rem" }}
        >
          Mandatory FOSS
        </Typography>
        <MandatoryFoss
          mandatoryFossList={mandatoryFossList}
          manipulateFossList={setMandatoryFossList}
        />
        {/* optional foss */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "1.5rem" }}
        >
          Optional FOSS
        </Typography>
        <OptionalFoss
          optionalFossList={optionalFossList}
          manipulateFossList={setOptionalFossList}
        />
        {/* action buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#054C77",
              color: "#ffffff",
              m: "1rem",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#002648",
              },
            }}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#054C77",
              color: "#ffffff",
              m: "1rem",

              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#002648",
              },
            }}
            onClick={handleResetClick}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default FossFilter;
