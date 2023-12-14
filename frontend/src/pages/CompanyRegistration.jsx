import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import Select from "react-select";
import { Form, useLoaderData, useActionData } from "react-router-dom";
import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { handleCityDropdownOpen } from "../utils/utils";
import { get_registration_data } from "../utils/helper";
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

export async function loader() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  // console.log("RegistrationForm loader");
  const url = `${baseUrl}/accounts/api/registration`;
  // console.log(url);
  const response = await axios.get(url);
  // const data = response.data;
  // console.log(response);
  // return "Data for registration form";
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];
  const formattedYears = years.map((year) => {
    return {
      value: year,
      label: year,
    };
  });
  return {
    data: response.data,
    years: formattedYears,
  };
  // return response.data;
}

export async function action({ request }) {
  // console.log("RegistrationForm action");
  const formData = await request.formData();
  // console.log("formData entries");
  // console.log(formData.entries());
  // console.log(Object.keys(formData));
  // console.log(formData.get("companyName"));
  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/accounts/api/registration`;
    // console.log(`url : ${url}`);
    // console.log(`name company : ${formData.get("companyName")}`);

    // const data = {
    //   company: {
    //     name: formData.get("companyName"),
    //     website: formData.get("website"),
    //   },
    //   manager: {
    //     first_name: formData.get("firstname"),
    //     last_name: formData.get("lastname"),
    //     email: formData.get("email"),
    //     password: formData.get("password"),
    //     confirmpassword: formData.get("confirmpassword"),
    //   },
    // };
    // console.log(`data : ${data}`);
    // console.log(data);
    const data = get_registration_data(formData);
    console.log("data");
    console.log(data);
    const response = await axios.post(url, data);
    console.log("success", response);
    // console.log(formDataObj);
  } catch (error) {
    console.log("error");
    console.log(error);
    // setErrors(error);
    return {
      status: false,
      errors: error.response.data,
    };
  }
  // const formDataObj = Object.fromEntries(formData.entries());
  // console.log("failure");
  // console.log("formDataObj");
  // console.log(formDataObj);
  return {
    status: true,
  };
}

const CustomSelect = ({
  id,
  label,
  isMulti,
  options,
  onOpen,
  onChange,
  closeMenuOnSelect = true,
  name = "a",
}) => {
  return (
    <FormControl fullWidth>
      <FormLabel id={id}>{label}</FormLabel>
      <Select
        options={options}
        isMulti={isMulti}
        onMenuOpen={onOpen}
        onChange={onChange}
        closeMenuOnSelect={closeMenuOnSelect}
        name={name}
      />
    </FormControl>
  );
};

CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isMulti: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  onOpen: PropTypes.func,
  onChange: PropTypes.func,
  closeMenuOnSelect: PropTypes.bool,
  name: PropTypes.string,
};

const Title = ({ title }) => {
  return (
    <Grid item xs={12}>
      <Box>
        <p
          style={{
            color: "black",
            fontSize: "1rem",
          }}
        >
          {title}
        </p>
      </Box>
    </Grid>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

const CompanyRegistration = () => {
  const result = useLoaderData();
  const response = useActionData();
  const errors = response && response.errors;
  const success = response && response.status ? true : false;
  console.log(`errors`);
  console.log(errors);
  // console.log("from component end");
  const [jobState, setJobState] = useState([]);
  const [jobCity, setJobCity] = useState([]);
  const [studentState, setStudentState] = useState([]);

  const [studentCity, setStudentCity] = useState([]);

  const [description, setDescription] = useState("");
  const [key_job_responsibilities, setKey_job_responsibilities] = useState("");
  const [requirements, setRequirements] = useState("");

  console.log(description, key_job_responsibilities, requirements);
  return (
    <>
      <Container m={2} p={{ xs: 1, md: 1 }}>
        {errors && (
          <Box mb={2} mt={2}>
            <Alert severity="error">
              Kindly review the registration errors below.
            </Alert>
          </Box>
        )}
        {success && <Alert severity="success">Registeration successful.</Alert>}
        <Form method="post">
          <Box>
            <Grid container spacing={2}>
              <Title title="Company Details" />
              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="error">
                  {errors && errors.company && errors.company.name
                    ? `${errors.company.name.join(", ")}`
                    : ""}
                </Typography>
                <TextField
                  required
                  id="company_name"
                  label="Company Name"
                  name="company_name"
                  // helperText="If you are from hiring agency, please enter your agency name here"
                  size="small"
                  error={
                    errors && errors.company && Boolean(errors.company.name)
                  }
                  helperText="If you are from hiring agency, please enter your agency name here"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="website"
                  label="Company Website"
                  name="website"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Title title="Account Manager Details" />
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="firstname"
                  label="First Name"
                  name="first_name"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="lastname"
                  label="Last Name"
                  name="last_name"
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Title title="Set Login Credentials" />
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  name="password"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="confirmpassword"
                  label="Confirm Password"
                  name="confirm_password"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="is-agency">
                    Are you from a hiring agency?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="is-agency"
                    defaultValue="no"
                    name="is_agency"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Title title="Job Details" />
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="designation"
                  label="Designation (Job Title)"
                  name="designation"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  id="vacancies"
                  label="Number of Vacancies"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  name="num_vacancies"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="min-salary">
                    Minimum Salary (Monthly)
                  </InputLabel>
                  <OutlinedInput
                    id="min-salary"
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    label="Minimum Salary (Monthly)"
                    name="salary_range_min"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="max-salary">
                    Maximum Salary (Monthly)
                  </InputLabel>
                  <OutlinedInput
                    id="max-salary"
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    label="Maximum Salary (Monthly)"
                    name="salary_range_max"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="job-sector"
                  label="Job Sector"
                  isMulti={false}
                  options={result.data.domains}
                  name="domain"
                ></CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="job-state"
                  label="State (Location of Job)"
                  isMulti={true}
                  options={result.data.states}
                  onChange={(choice) => {
                    console.log(choice);
                    setJobState(choice);
                  }}
                ></CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="job-city"
                  label="City (Location of Job)"
                  isMulti={true}
                  options={jobCity}
                  onOpen={() => handleCityDropdownOpen(jobState, setJobCity)}
                  closeMenuOnSelect={false}
                  name="job-city"
                ></CustomSelect>
              </Grid>
              <Title title="Student Eligibility Criteria" />
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="skills"
                  label="Skills"
                  isMulti={true}
                  options={result.data.skills}
                  name="skills"
                ></CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="foss-mandatory"
                  label="Mandatory Technology / Programming Languages"
                  isMulti={true}
                  options={result.data.fosses}
                  name="foss-mandatory"
                ></CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="foss-optional"
                  label="Optional Technology / Programming Languages"
                  isMulti={true}
                  options={result.data.fosses}
                  name="foss-optional"
                ></CustomSelect>
              </Grid>
              <Title title="Filter students based on location" />
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="state"
                  label="State"
                  isMulti={true}
                  options={result.data.states}
                  onChange={(choice) => {
                    console.log(choice);
                    setStudentState(choice);
                  }}
                  name="filter-state"
                ></CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="city"
                  label="City"
                  isMulti={true}
                  options={studentCity}
                  closeMenuOnSelect={false}
                  onOpen={() =>
                    handleCityDropdownOpen(studentState, setStudentCity)
                  }
                  name="filter-city"
                ></CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="degree"
                  label="Degree"
                  isMulti={true}
                  options={result.data.degrees}
                  name="degrees"
                ></CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="discipline"
                  label="Discipline"
                  isMulti={true}
                  options={result.data.disciplines}
                  name="disciplines"
                ></CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect
                  id="year"
                  label="Graduating year of students"
                  isMulti={true}
                  options={result.years}
                  name="years"
                ></CustomSelect>
              </Grid>
              <Grid item xs={12}>
                <p>Job Description</p>
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                    console.log({ event, editor, data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <p>Job Responsibilities</p>
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setKey_job_responsibilities(data);
                    console.log({ event, editor, data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <p>Additional Skills Required</p>
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();

                    setRequirements(data);
                    console.log({ event, editor, data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </Grid>
            </Grid>
            <input type="hidden" name="description" value={description} />
            <input
              type="hidden"
              name="key_job_responsibilities"
              value={key_job_responsibilities}
            />
            <input type="hidden" name="requirements" value={requirements} />
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}
            >
              Submit
            </Button>
          </Box>
        </Form>
      </Container>
    </>
  );
};

export default CompanyRegistration;
