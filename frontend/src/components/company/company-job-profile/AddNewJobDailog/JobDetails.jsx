import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Divider from "@mui/material/Divider";
import {
  jobSectorOptions,
  skillsListOptions,
  jobTypeOptions,
  genderOptions,
  degreeOptions,
  disciplineOptions,
} from "../../../../constants/AddNewJob";
import StateAndCityInput from "../../../common/StateAndCityInput";
import StateAndCityMultipleInput from "../../../common/StateAndCityMultipleInput";
import Button from "@mui/material/Button";
import MultipleSelectInput from "../../../common/MultipleSelectInput";
import "./style.css";
import CKEditorBox from "../../../common/CKEditor";

function JobDetails() {
  const currentYear = new Date().getFullYear();
  const GraduationYearOptions = [];
  for (let i = currentYear - 2; i <= currentYear + 2; i++) {
    GraduationYearOptions.push(i);
  }

  const [jobDesignation, setJobDesignation] = React.useState("");
  const [maxSalaryHelperText, setMaxSalaryHelperText] = React.useState("");
  const [maxSalaryError, setMaxSalaryError] = React.useState(false);
  const [minSalary, setMinSalary] = React.useState("");
  const [maxSalary, setMaxSalary] = React.useState("");
  const [jobDomain, setJobDomain] = React.useState("");
  const [jobType, setJobType] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [officeState, setOfficeState] = React.useState("");
  const [officeCity, setOfficeCity] = React.useState("");
  const [skillName, setSkillName] = React.useState([]);
  const [jobDescription, setJobDescription] = React.useState("");
  const [keyResponsibilities, setKeyResponsibilities] = React.useState("");
  const [Qualifications, setQualification] = React.useState("");
  const [applicationDate, setApplicationDate] = React.useState();
  const [graduationYears, setGraduationYears] = React.useState([]);
  const [mandatorySkills, setMandatorySkills] = React.useState([]);
  const [optionalSkills, setOptionalSkills] = React.useState([]);
  const [degree, setDegree] = React.useState([]);
  const [discipline, setDiscipline] = React.useState([]);
  const [studentLocation, setStudentLocation] = React.useState([]);

  const handleJobDesignationChange = (event) => {
    setJobDesignation(event.target.value);
  };
  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
  };
  const handleMaxSalaryChange = (event) => {
    const newMaxSalary = event.target.value;

    if (
      newMaxSalary !== "" &&
      minSalary !== "" &&
      parseInt(newMaxSalary, 10) < parseInt(minSalary, 10)
    ) {
      setMaxSalaryError(true);
      setMaxSalaryHelperText("Max Salary must be greater than Min Salary");
    } else {
      setMaxSalaryError(false);
      setMaxSalaryHelperText("");
    }
    // Always update the maxSalary state
    setMaxSalary(newMaxSalary);
  };
  const handleJobDomainChange = (event) => {
    setJobDomain(event.target.value);
  };
  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  //to add new state & city option for student state and city
  const handleAddNewStateCity = () => {
    const newStudentLocationList = [
      ...studentLocation,
      { state: "", city: [] },
    ];
    setStudentLocation(newStudentLocationList);
  };

  return (
    <>
      {/* parent box */}
      <Box
        sx={{
          marginTop: "1rem",
          p: "1rem",
          marginBottom: "2rem",
          ml: "1rem",
        }}
        id="student-profile"
      >
        {/* page title */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
            mt: "1rem",
          }}
        >
          Add New Job
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
            mb: "1rem",
          }}
        ></Divider>

        {/* designation job sector box */}
        <Box
          sx={{
            mt: "3rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "73%" },
          }}
        >
          {/* designation */}
          <TextField
            id="jobDesignation"
            label="Job Designation"
            variant="outlined"
            size="small"
            value={jobDesignation}
            onChange={handleJobDesignationChange}
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

          {/* job domain */}
          <FormControl
            sx={{
              width: { xs: "auto", md: "24rem" },
            }}
          >
            <InputLabel id="jobDomain">Job Domain</InputLabel>
            <Select
              labelId="Job Domain"
              id="jobDomain"
              value={jobDomain}
              label="Job Domain"
              onChange={handleJobDomainChange}
              size="small"
            >
              {jobSectorOptions.map((opt) => (
                <MenuItem key={opt} value={opt} sx={{ fontSize: "0.8rem" }}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* state and city box */}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "73%" },
          }}
        >
          <StateAndCityInput
            state={officeState}
            setState={setOfficeState}
            city={officeCity}
            setCity={setOfficeCity}
          ></StateAndCityInput>
        </Box>

        {/* job type and gender */}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "73%" },
          }}
        >
          {/* job type */}
          <FormControl
            sx={{
              width: {
                xs: "auto",
                md: "24rem",
              },
              mr: { xs: 0, md: "3rem" },
              mb: { xs: "1.5rem", md: 0 },
            }}
          >
            <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
            <Select
              labelId="Job Type"
              id="JobType"
              value={jobType}
              label="Job Type"
              onChange={handleJobTypeChange}
              size="small"
            >
              {jobTypeOptions.map((opt) => (
                <MenuItem key={opt} value={opt} sx={{ fontSize: "0.8rem" }}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* gender */}
          <FormControl
            sx={{
              width: { xs: "auto", md: "24rem" },
            }}
          >
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="Gender"
              id="gender"
              value={gender}
              label="Gender"
              onChange={handleGenderChange}
              size="small"
            >
              {genderOptions.map((opt) => (
                <MenuItem key={opt} value={opt} sx={{ fontSize: "0.8rem" }}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* multiselect skills box */}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <MultipleSelectInput
            value={skillName}
            setValue={setSkillName}
            options={skillsListOptions}
            size="small"
            id="studentSkills"
            label="Skills"
          ></MultipleSelectInput>
        </Box>

        {/* annual salary */}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "73%" },
          }}
        >
          {/* min salary */}
          <TextField
            id="annualSalaryMin"
            label="Annual Salary (Min)"
            type="number"
            variant="outlined"
            size="small"
            value={minSalary}
            onChange={handleMinSalaryChange}
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

          {/* max salary */}
          <TextField
            id="annualSalaryMax"
            error={maxSalaryError}
            helperText={maxSalaryHelperText}
            type="number"
            label="Annual Salary (Max)"
            variant="outlined"
            size="small"
            value={maxSalary}
            onChange={handleMaxSalaryChange}
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
            }}
          />
        </Box>

        {/* job description box */}
        <Box
          sx={{
            mt: "-1rem",
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <CKEditorBox
            label="Job Description"
            data={jobDescription}
            setData={setJobDescription}
          ></CKEditorBox>
        </Box>

        {/* key responsibilites box */}
        <Box
          sx={{
            mt: "-3rem",
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <CKEditorBox
            label="Key Responsibilities"
            data={keyResponsibilities}
            setData={setKeyResponsibilities}
          ></CKEditorBox>
        </Box>

        {/* Qualifications skills box */}
        <Box
          sx={{
            mt: "-3rem",
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <CKEditorBox
            label="Qualifications/Skills Required"
            data={Qualifications}
            setData={setQualification}
          ></CKEditorBox>
        </Box>

        {/* application date */}
        <DatePicker
          value={applicationDate}
          label="Last Application Date"
          onChange={(newValue) => setApplicationDate(newValue)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            width: { xs: "100%", md: "22rem" },
            mt: "1rem",
          }}
        />

        {/* Student Eligibity Criteria */}

        {/* title */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
            mt: "3rem",
          }}
        >
          Student Eligibility Criteria
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
            mb: "1rem",
          }}
        ></Divider>

        {/* graduation year */}
        <Box
          sx={{
            mt: "3rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <MultipleSelectInput
            value={graduationYears}
            setValue={setGraduationYears}
            options={GraduationYearOptions}
            size="small"
            id="graduationYear"
            label="Graduation Year"
          ></MultipleSelectInput>
        </Box>

        {/*mandatory skills*/}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <MultipleSelectInput
            value={mandatorySkills}
            setValue={setMandatorySkills}
            options={skillsListOptions}
            size="small"
            id="mandatorySkills"
            label="Mandatory Skills"
          ></MultipleSelectInput>
        </Box>

        {/*optional skills*/}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <MultipleSelectInput
            value={optionalSkills}
            setValue={setOptionalSkills}
            options={skillsListOptions}
            size="small"
            id="optionalSkills"
            label="Optional Skills"
          ></MultipleSelectInput>
        </Box>

        {/*degree*/}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <MultipleSelectInput
            value={degree}
            setValue={setDegree}
            options={degreeOptions}
            size="small"
            id="studentDegree"
            label="Degree"
          ></MultipleSelectInput>
        </Box>

        {/*discipline*/}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <MultipleSelectInput
            value={discipline}
            setValue={setDiscipline}
            options={disciplineOptions}
            size="small"
            id="studentDiscipline"
            label="Discipline"
          ></MultipleSelectInput>
        </Box>

        {/* student multiple state and multiple city */}
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "44.5rem", lg: "51rem" },
          }}
        >
          <StateAndCityMultipleInput
            data={studentLocation}
            manipulateStudentLocationList={setStudentLocation}
          ></StateAndCityMultipleInput>
        </Box>
        {/* button to add multiple state and city */}
        <Button
          size="small"
          sx={{ fontSize: "0.8rem", ml: "0.5rem" }}
          onClick={handleAddNewStateCity}
        >
          + Add State & City Filter
        </Button>
      </Box>
    </>
  );
}
export default JobDetails;
