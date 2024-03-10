/* eslint-disable react/prop-types */
import React from "react";
import TextField from "@mui/material/TextField";
import TextFieldInput from "../../common/TextFieldInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import StateAndCityInput from "../../common/StateAndCityInput";
import Select from "@mui/material/Select";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import StateAndCityMultipleInput from "../../common/StateAndCityMultipleInput";
import Button from "@mui/material/Button";
import MultipleSelectInput from "../../common/MultipleSelectInput";
import "../company-job-profile/AddNewJobDailog/style.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import CKEditorBox from "../../common/CKEditor";

function CompanyDetails({
  domains,
  disciplines,
  graduationYears,
  degrees,
  skills,
  foss,
}) {
  const [companyName, setCompanyName] = React.useState("");
  const [maxSalaryHelperText, setMaxSalaryHelperText] = React.useState("");
  const [jobSector, setJobSector] = React.useState("");
  const [jobState, setJobState] = React.useState("");
  const [jobCity, setJobCity] = React.useState("");
  const [maxSalaryError, setMaxSalaryError] = React.useState(false);
  const [minSalary, setMinSalary] = React.useState("");
  const [maxSalary, setMaxSalary] = React.useState("");
  const [companyWebsite, setCompanyWebsite] = React.useState("");
  const [accManagerFirstName, setAccManagerFirstName] = React.useState("");
  const [accManagerLastName, setAccManagerLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [accManagerPhone, setAccManagerPhone] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [vacancy, setVacancy] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [keyResponsibilities, setKeyResponsibilities] = React.useState("");
  const [Qualifications, setQualification] = React.useState("");
  const [gradYears, setGradYears] = React.useState([]);
  const [studentSkills, setStudentSkills] = React.useState([]);
  const [mandatorySkills, setMandatorySkills] = React.useState([]);
  const [optionalSkills, setOptionalSkills] = React.useState([]);
  const [degree, setDegree] = React.useState([]);
  const [discipline, setDiscipline] = React.useState([]);
  const [studentLocation, setStudentLocation] = React.useState([]);

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

  //to add new state & city option for student state and city
  const handleAddNewStateCity = () => {
    const newStudentLocationList = [
      ...studentLocation,
      { state: "", city: [] },
    ];
    setStudentLocation(newStudentLocationList);
  };
  const handleJobSector = (event) => {
    setJobSector(event.target.value);
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
        id="company-profile"
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
          Register Your Company
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
            mb: "1rem",
          }}
        ></Divider>

        {/* comapny name company website box */}
        <Typography
          gutterBottom
          sx={{
            mt: "2rem",
            mb: "0rem",
            opacity: "60%",
            color: "#002648",
          }}
        >
          Company Details
        </Typography>
        <Box
          sx={{
            mt: "1rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "73%" },
          }}
        >
          {/* comapny name */}
          <TextFieldInput
            id={"companyName"}
            label={"Company Name"}
            value={companyName}
            setValue={setCompanyName}
          ></TextFieldInput>

          {/* comapny website */}
          <TextFieldInput
            id={"companyWebsite"}
            label={"Company Website"}
            value={companyWebsite}
            setValue={setCompanyWebsite}
          ></TextFieldInput>
        </Box>

        {/* account manager details */}
        <Typography
          gutterBottom
          sx={{
            mt: "2rem",
            mb: "0rem",
            opacity: "60%",
            color: "#002648",
          }}
        >
          Account Manager Details
        </Typography>
        <Box
          sx={{
            mt: "1rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "73%" },
          }}
        >
          {/* account manager first name */}
          <TextFieldInput
            id={"accManagerFirstName"}
            label={"First Name"}
            value={accManagerFirstName}
            setValue={setAccManagerFirstName}
          ></TextFieldInput>

          {/* account manager last name */}
          <TextFieldInput
            id={"accManagerLastName"}
            label={"Last Name"}
            value={accManagerLastName}
            setValue={setAccManagerLastName}
          ></TextFieldInput>

          {/* account manager phone*/}
          <TextFieldInput
            id={"accManagerPhone"}
            label={"Phone Number"}
            value={accManagerPhone}
            type={"number"}
            setValue={setAccManagerPhone}
          ></TextFieldInput>
        </Box>

        {/* login credentials */}
        <Typography
          gutterBottom
          sx={{
            mt: "2rem",
            mb: "0rem",
            opacity: "60%",
            color: "#002648",
          }}
        >
          Login Credentials
        </Typography>
        <Box
          sx={{
            mt: "1rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "73%" },
          }}
        >
          {/* email */}
          <TextFieldInput
            id={"email"}
            label={"Email"}
            value={email}
            type={"email"}
            setValue={setEmail}
          ></TextFieldInput>

          {/* password*/}
          <TextFieldInput
            id={"password"}
            type={"password"}
            label={"Password"}
            value={password}
            setValue={setPassword}
          ></TextFieldInput>

          {/* confirm password */}
          <TextFieldInput
            id={"confirmPassword"}
            label={"Confirm Password"}
            type={"password"}
            value={confirmPassword}
            setValue={setConfirmPassword}
          ></TextFieldInput>
        </Box>

        {/* hiring agency */}
        <FormControl>
          <FormLabel
            htmlFor="hiringAgency"
            sx={{
              "&.Mui-focused": {
                color: "#002648",
              },
              mt: "2rem",
            }}
          >
            Are you from hiring agency?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="no"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="yes"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#002648",
                    },
                  }}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#002648",
                    },
                  }}
                />
              }
              label="No"
            />
          </RadioGroup>
        </FormControl>

        {/* job details */}
        <Typography
          gutterBottom
          sx={{
            mt: "2rem",
            mb: "0rem",
            opacity: "60%",
            color: "#002648",
          }}
        >
          Job Details
        </Typography>
        <Box
          sx={{
            mt: "1rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: { xs: "100%", md: "73%" },
          }}
        >
          {/* job title */}
          <TextFieldInput
            id={"jobTitle"}
            label={"Job Title"}
            value={jobTitle}
            setValue={setJobTitle}
          ></TextFieldInput>

          {/* vaccancies*/}
          <TextFieldInput
            id={"vacancies"}
            label={"No. of Vacancy"}
            value={vacancy}
            type={"number"}
            setValue={setVacancy}
          ></TextFieldInput>

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
              value={jobSector}
              label="Job Domain"
              onChange={handleJobSector}
              size="small"
            >
              {domains.map((opt) => (
                <MenuItem
                  key={opt.id}
                  value={opt.name}
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
            state={jobState}
            setState={setJobState}
            city={jobCity}
            setCity={setJobCity}
          ></StateAndCityInput>
        </Box>

        {/* salary */}
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
            label="Additional Qualifications/Skills Required"
            data={Qualifications}
            setData={setQualification}
          ></CKEditorBox>
        </Box>

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

        {/* skills */}
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
            value={studentSkills}
            setValue={setStudentSkills}
            options={skills}
            size="small"
            id="studentSkills"
            label="Skills"
          ></MultipleSelectInput>
        </Box>

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
            label="Mandatory Technology / Programming Languages"
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
            label="Optional Technology / Programming Languages"
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
export default CompanyDetails;
