/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Divider from "@mui/material/Divider";
import { genderOptions } from "../../../../constants/AddNewJob";
import StateAndCityInput from "../../../common/StateAndCityInput";
import StateAndCityMultipleInput from "../../../common/StateAndCityMultipleInput";
import Button from "@mui/material/Button";
import MultipleSelectInput from "../../../common/MultipleSelectInput";
import "../AddNewJobDailog/style.css";
import CKEditorBox from "../../../common/CKEditor";
import dayjs from "dayjs";
// import JobDetails from "../AddNewJobDailog/JobDetails";

function EditJobDetails({
  domains,
  jobTypes,
  disciplines,
  graduationYears,
  degrees,
  skills,
  foss,
  data,
  handleFormSubmit,
  JobDetails,
  setJobDetails
}) {
  const [jobDesignation, setJobDesignation] = useState("");
  const [maxSalaryHelperText, setMaxSalaryHelperText] = useState("");
  const [maxSalaryError, setMaxSalaryError] = useState(false);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [jobDomain, setJobDomain] = useState("");
  const [jobType, setJobType] = useState("");
  const [gender, setGender] = useState("");
  const [officeState, setOfficeState] = useState("");
  const [officeCity, setOfficeCity] = useState("");
  const [skillName, setSkillName] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");
  const [Qualifications, setQualification] = useState("");
  const [applicationDate, setApplicationDate] = useState();
  const [gradYears, setGradYears] = useState([]);
  const [mandatorySkills, setMandatorySkills] = useState([]);
  const [optionalSkills, setOptionalSkills] = useState([]);
  const [degree, setDegree] = useState([]);
  const [discipline, setDiscipline] = useState([]);
  const [studentLocation, setStudentLocation] = useState([]);

  useEffect(() => {
    console.log("DATA USEEFFECT");
    console.log(data);
    if (data) {
      //extracting skill names from skill ids
      const filteredSkills = skills.filter((obj) =>
        // data.id.skills.includes(obj.id)
        data.skills.includes(obj.id)
      );
      const skillNames = filteredSkills.map((skill) => skill.name);
      
      //extracting discipline names from discipline ids
      const filteredDisciplines = disciplines.filter((obj) =>
        // data.id.skills.includes(obj.id)
        data.discipline.includes(obj.id)
      );
      const disciplineNames = filteredDisciplines.map((skill) => skill.name);

      //application date
      const dateString = data.last_application_date;
      const parts = dateString.split(" ");
      const monthIndex =
        new Date(Date.parse(parts[1] + " 1, 2000")).getMonth() + 1;

      const formattedDate = `${parts[2]}-${monthIndex
        .toString()
        .padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
      const lastDate = dayjs(formattedDate);

      
      setJobDesignation(data.designation || "");
      setMinSalary(data.salary_range_min || "");
      setMaxSalary(data.salary_range_max || "");
      setJobDomain(data.domain || "");
      setJobType(data.job_type || "");
      setGender(data.gender || "");
      setOfficeState(data.state_job || "");
      setOfficeCity(data.city_job || "");
      setSkillName(skillNames || []);
      setJobDescription(data.description || "");
      setKeyResponsibilities(data.key_job_responsibilities || "");
      setQualification(data.requirements || "");
      setApplicationDate(lastDate || null);
      setGradYears(data.filter_year || []);
      setMandatorySkills(data.filter_mandatory_skills || []);
      setOptionalSkills(data.filter_optional_skills || []);
      setDegree(data.degree || []);
      setDiscipline(disciplineNames || []);
      setStudentLocation(data.studentLocation || []);
    }
  }, [data]); 

  const handleJobDesignationChange = (event) => {
    const designnation = event.target.value;
    setJobDesignation(designnation);
    setJobDetails({...JobDetails, designation:designnation})
  };
  const handleMinSalaryChange = (event) => {
    const minSalary = event.target.value;
    setMinSalary(event.target.value);
    setJobDetails({...JobDetails, salary_range_min:minSalary})
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
    setJobDetails({...JobDetails, salary_range_max:newMaxSalary})
  };
  const handleJobDomainChange = (event) => {
    const domain = event.target.value;
    setJobDomain(event.target.value);
    setJobDetails({...JobDetails, domain:domain})
  };
  const handleJobTypeChange = (event) => {
    const jobType = event.target.value;
    setJobType(event.target.value);
    setJobDetails({...JobDetails, job_type:jobType})
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
        component="form"
        sx={{
          marginTop: "1rem",
          p: "1rem",
          marginBottom: "2rem",
          ml: "1rem",
        }}
        id="student-profile"
        onSubmit={handleFormSubmit}
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
          Update Existing Job #{data.id.id}
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
              {domains.map((opt) => (
                <MenuItem
                  key={opt.id}
                  value={opt.id}
                  sx={{ fontSize: "0.8rem" }}
                >
                  {opt.name}
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
              {jobTypes.map((opt) => (
                <MenuItem
                  key={opt.id}
                  value={opt.id}
                  sx={{ fontSize: "0.8rem" }}
                >
                  {opt.jobtype}
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
            options={skills}
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
            value={gradYears}
            setValue={setGradYears}
            options={graduationYears.map((year, index) => ({
              id: index,
              name: year,
            }))}
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
            options={foss}
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
            options={foss}
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
            options={degrees}
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
            options={disciplines}
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
export default EditJobDetails;
