import { BuildOutlined, PersonOutline, EmailOutlined, PhoneOutlined, Public, AssignmentInd, WorkOutline, CalendarToday, 
  Numbers, BusinessCenter, CurrencyRupee, SchoolOutlined, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, IconButton, TextField, InputAdornment, Typography, Card, CardContent, Divider, useTheme, Paper,
  MenuItem
 } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import JobForm from "../../components/common/JobForm";
import JobFiltersForm from "../../components/common/JobFiltersForm";
import ReactQuill from "react-quill";
import Select from "react-select";
import axiosInstance from "../../api/axiosInstance";

export default function CompanyRegistration() {
  const theme = useTheme();
  // password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const [form, setForm] = useState({
    company: {
      name: "",
      website: "",
    },
    employer: {
      phone: "",
    },
    job: {
      designation: "",
      salary_range_min: null,
      salary_range_max: null,
      domain: "",
      last_app_date: null,
      num_vacancies: null,
      description: "",
      requirements: "",
      key_job_responsibilities: "",
      state_of_job:"",
      city_of_job:"",
      job_type:"",
      courses:[],
      course_groups: [],
      degrees: [],
      disciplines: [],
      graduation_years: [],
      institute_types: [],
      states: [],
      cities: []
    },
    
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
});

  const [errors, setErrors] = useState({
    name: "",
    website: "",
    phone: "",
    user: {
      first_name: "",
      last_name: "",
      email: "",
    },
    job: {
      designation: "",
      domain: "",
      last_app_date: "",
      num_vacancies: "",
    },
  });

  const navigate = useNavigate();

  // Formatter function
  const formatRupee = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Example options (replace with your actual data)
  const courseOptions = [
    { value: 1, label: "B.Tech" },
    { value: 2, label: "M.Tech" },
    { value: 3, label: "MBA" },
  ];
  const degreeOptions = [
    { value: 1, label: "Bachelor" },
    { value: 2, label: "Master" },
  ];
  const disciplineOptions = [
    { value: 1, label: "Computer Science" },
    { value: 2, label: "Electronics" },
  ];
  const graduationYearOptions = [
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
  ];
  const institutionTypeOptions = [
    { value: 1, label: "Private" },
    { value: 2, label: "Government" },
  ];
  const stateOptions = [
    { value: 1, label: "Maharashtra" },
    { value: 2, label: "Karnataka" },
  ];
  const cityOptions = [
    { value: 1, label: "Mumbai" },
    { value: 2, label: "Bangalore" },
  ];

  const FakePost = (form) => {
    const status = false;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status)
          resolve({
            email: "ankitamk@gmail.com",
            companyName: "ABC Test Company",
            is_draft: false,
          });
        else reject(new Error(JSON.stringify({ name: "Already exist" })));
      }, 1000);
    });
  };

  const handleFormSubmit = async (e) => {
    alert('submitted');
    e.preventDefault();
    try {
      const lastAppDate = form.job.last_app_date;
      let formattedDate = null;
      if (lastAppDate && !isNaN(new Date(lastAppDate).getTime())) {
        formattedDate = new Date(lastAppDate).toISOString();
      }
      
       // Prepare cleaned copy of form
    const cleanedForm = {
      ...form,
      job: {
        ...form.job,
        ...(formattedDate ? { last_app_date: formattedDate } : {}),
      },
    };

      const response = await axiosInstance.post("/employer/register/", cleanedForm);
      const res = response.data;
      console.log("res");
      console.log(res);
      navigate("/success", {
        state: {
          email: res.user?.email || "your email entered during registration",
          companyName: res.company?.name || "",
          
        }
      });
    } catch (error) {
       console.error("API Error:", error);
       let nameError = "Something went wrong. Please try again.";
       
      if (error.response){
        const data = error.response.data;
        console.log("error.response.data");
        console.log(data);
        setErrors(error.response.data);
      }
    }
  };
  
  const handleEmployerInputChange = (e) => {
    setForm((prev) => ({
      ...prev,
      employer: {
        ...prev.employer,
        [e.target.name]: e.target.value,
      },
    }));
  };
   const handleCompanyInputChange = (e) => {
    setForm((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleUserInputChange = (e) => {
    setForm((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleJobInputChange = (e) => {
    setForm((prev) => ({
      ...prev,
      job: {
        ...prev.job,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleEligibilityChange = (field) => (selectedOptions) => {
    setForm((prev) => ({
      ...prev,
      job: {
        ...prev.job,
        // [field]: selected || [],
        [field]: selectedOptions ? selectedOptions.map(option => option.value) : [],
      },
    }));
  };

  const handleQuillChange = (value, data) => {
        setForm((prev) => ({
            ...prev,
            job: {
              ...prev.job,
              [data]: value,
          },
        }));
    }

  // Custom styles for react-select to match theme
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: theme.palette.primary.main,
      minHeight: 40,
      boxShadow: "none",
      "&:hover": { borderColor: theme.palette.primary.dark },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? theme.palette.primary.main
        : state.isFocused
        ? theme.palette.action.hover
        : undefined,
      color: state.isSelected
        ? theme.palette.primary.contrastText
        : theme.palette.text.primary,
    }),
  };

  return (
    <Paper
      elevation={4}
      sx={{
        background: theme.palette.background.default,
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: theme.palette.primary.main,
            letterSpacing: 1,
          }}
        >
          Company Registration
        </Typography>
        <form onSubmit={handleFormSubmit}>
          {/* Company Details */}
          <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.primary.main}` }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <BuildOutlined sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Company Details
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <TextField
                label="Company Name"
                name="name"
                fullWidth
                required
                size="small"
                margin="normal"
                value={form.company.name}
                onChange={handleCompanyInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentInd sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors.company?.name)}
                helperText={errors.company?.name}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Website"
                name="website"
                type="url"
                fullWidth
                size="small"
                margin="normal"
                value={form.company.website}
                onChange={handleCompanyInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Public sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors.company?.website)}
                helperText={errors.company?.website}
                sx={{ mb: 2 }}
              />
            </CardContent>
          </Card>

          {/* Representative Details */}
          <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.secondary.main}` }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PersonOutline sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Company Representative Details
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="First Name"
                  name="first_name"
                  required
                  size="small"
                  fullWidth
                  value={form.user.first_name}
                  onChange={handleUserInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ color: theme.palette.secondary.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.user?.first_name)}
                  helperText={errors.user?.first_name}
                />
                <TextField
                  label="Last Name"
                  name="last_name"
                  required
                  size="small"
                  fullWidth
                  value={form.user.last_name}
                  onChange={handleUserInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ color: theme.palette.secondary.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.user?.last_name)}
                  helperText={errors.user?.last_name}
                />
              </Box>
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  size="small"
                  fullWidth
                  value={form.user.email}
                  onChange={handleUserInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined sx={{ color: theme.palette.secondary.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.user?.email)}
                  helperText={errors.user?.email}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  size="small"
                  fullWidth
                  required
                  value={form.employer?.phone || ""}
                  onChange={handleEmployerInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlined sx={{ color: theme.palette.secondary.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.employer?.phone)}
                  helperText={errors.employer?.phone}
                />
              </Box>
              <Box gap={2} display="flex">
                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    size="small"
                    fullWidth
                    required
                    
                    value={form.user?.password || ""}
                    onChange={handleUserInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ color: theme.palette.secondary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.user?.password)}
                    helperText={errors.user?.password}
                  />

                  <TextField
                    label="Confirm Password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    size="small"
                    fullWidth
                    required
                    value={form.user?.confirm_password || ""}
                    onChange={handleUserInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ color: theme.palette.secondary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleToggleConfirmPassword} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.user?.confirm_password)}
                    helperText={errors.user?.confirm_password}
                  />

              </Box>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.info.main}` }}>
            <CardContent>
               <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Note: Adding job during registration is not mandatory, you can add job once you register company and login to dashboard.
              </Typography>
                  {/* <JobForm form={form} errors={errors} handleJobInputChange={handleJobInputChange}/> */}
                  <section>
             <Box display="flex" alignItems="center" mb={2}>
                <WorkOutline sx={{ color: theme.palette.info.main, mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Add Job Details
                </Typography>
              </Box>
             
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="Job Designation"
                  name="designation"
                  size="small"
                  fullWidth
                  required
                  value={form.job?.designation}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkOutline sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.designation)}
                  helperText={errors.job?.designation}
                />
                
              </Box>
              <Box display="flex" mb={2} gap={2}>
                <TextField
                  select
                  label="Domain"
                  name="domain"
                  size="small"
                  fullWidth
                  value={form.job.domain}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessCenter sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.domain)}
                  helperText={errors.job?.domain}
                >
                  <MenuItem value="">Select Domain</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Job Type"
                  name="job_type"
                  size="small"
                  fullWidth
                  value={form.job.job_type}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessCenter sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.job_type)}
                  helperText={errors.job?.job_type}
                >
                  <MenuItem value="">Select Domain</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </TextField>

              </Box>
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="Last Application Date"
                  name="last_app_date"
                  type="date"
                  size="small"
                  fullWidth
                  value={form.job.last_app_date}
                  onChange={handleJobInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.last_app_date)}
                  helperText={errors.job?.last_app_date}
                />
                <TextField
                  label="Number of Vacancies"
                  name="num_vacancies"
                  type="number"
                  size="small"
                  fullWidth
                  value={form.job.num_vacancies}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1 },
                  }}
                  error={Boolean(errors.job?.num_vacancies)}
                  helperText={errors.job?.num_vacancies}
                />
                
              </Box>
              <Box gap={2} display="flex" mb={2}>
                <TextField
                  select
                  label="State"
                  name="state_of_job"
                  size="small"
                  fullWidth
                  value={form.job?.state_of_job}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessCenter sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.state_of_job)}
                  helperText={errors.job?.state_of_job}
                >
                  <MenuItem value="">Select Domain</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </TextField>
                <TextField
                  select
                  label="City"
                  name="city_of_job"
                  size="small"
                  fullWidth
                  value={form.job?.city_of_job}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessCenter sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.city_of_job)}
                  helperText={errors.job?.city_of_job}
                >
                  <MenuItem value="">Select Domain</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </TextField>
              </Box>
              <Box display="flex" gap={2}>
                
               <Box mb={2}>
                <TextField
                  label="Minimum Salary"
                  name="salary_range_min"
                  type="number"
                  size="small"
                  fullWidth
                  value={form.job?.salary_range_min}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupee sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1 },
                  }}
                  error={Boolean(errors.job?.num_vacancies)}
                  helperText={errors.job?.num_vacancies}
                />
                {/* Display formatted salary below the field */}
                {form.job?.salary_range_min > 0 && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    {formatRupee(form.job.salary_range_min)}
                  </Typography>
                )}
               </Box>
                <Box mb={2}>
                  <TextField
                  label="Maximum Salary"
                  name="salary_range_max"
                  type="number"
                  size="small"
                  fullWidth
                  value={form.job?.salary_range_max}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupee sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1 },
                  }}
                  error={Boolean(errors.job?.num_vacancies)}
                  helperText={errors.job?.num_vacancies}
                />
                 {form.job?.salary_range_max > 0 && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    {formatRupee(form.job.salary_range_max)}
                  </Typography>
                )}
                </Box>
                
              </Box>
              <Box mt={3} mb={2}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Job Description
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={form.job?.description}
                  onChange={(value) => handleQuillChange(value, "description")}
                  placeholder="Enter job description..."
                  style={{ marginBottom: 16 }}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Job Requirements
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={form.job?.requirements}
                  onChange={(value) => handleQuillChange(value, "requirements")}
                  placeholder="Enter job requirements..."
                  style={{ marginBottom: 16 }}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Key Job Responsibilities
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={form.job?.key_job_responsibilities}
                  onChange={(value) => handleQuillChange(value, "key_job_responsibilities")}
                  placeholder="Enter key job responsibilities..."
                  style={{ marginBottom: 8 }}
                />
              </Box>
        </section>
            </CardContent>
          </Card>

          {/* Student Eligibility Criteria */}
          
          <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.success.main}` }}>
            <CardContent>
              {/* <JobFiltersForm form={form}/> */}
              <section>
        <Box display="flex" alignItems="center" mb={2}>
                <SchoolOutlined sx={{ color: theme.palette.success.main, mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Student Eligibility Criteria for the job
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
               <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Courses Groups
                </Typography>
                <Select
                  isMulti
                  name="course_groups"
                  options={courseOptions}
                  // value={form.job.course_groups}
                  value={courseOptions.filter(opt => form.job?.course_groups?.includes(opt.value))}
                  onChange={handleEligibilityChange("course_groups")}
                  classNamePrefix="select"
                  placeholder="Select course groups"
                  // styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Courses
                </Typography>
                <Select
                  isMulti
                  name="courses"
                  options={courseOptions}
                  // value={form.job.courses}
                  value={courseOptions.filter(opt => form.job?.courses?.includes(opt.value))}
                  onChange={handleEligibilityChange("courses")}
                  classNamePrefix="select"
                  placeholder="Select courses"
                  // styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Degree
                </Typography>
                <Select
                  isMulti
                  name="degrees"
                  options={degreeOptions}
                  // value={form.job.degrees}
                  value={degreeOptions.filter(opt => form.job?.degrees?.includes(opt.value))}
                  onChange={handleEligibilityChange("degrees")}
                  classNamePrefix="select"
                  placeholder="Select degree"
                  // styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Discipline
                </Typography>
                <Select
                  isMulti
                  name="discipline"
                  options={disciplineOptions}
                  // value={form.job.disciplines}
                  value={disciplineOptions.filter(opt => form.job?.disciplines?.includes(opt.value))}
                  onChange={handleEligibilityChange("disciplines")}
                  classNamePrefix="select"
                  placeholder="Select discipline"
                  // styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Graduation Year
                </Typography>
                <Select
                  isMulti
                  name="graduation_years"
                  options={graduationYearOptions}
                  // value={form.job.graduation_years}
                  value={graduationYearOptions.filter(opt => form.job?.graduation_years?.includes(opt.value))}
                  onChange={handleEligibilityChange("graduation_years")}
                  classNamePrefix="select"
                  placeholder="Select graduation year"
                  // styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Institution Type
                </Typography>
                <Select
                  isMulti
                  name="institute_types"
                  options={institutionTypeOptions}
                  // value={form.job.institute_types}
                  value={institutionTypeOptions.filter(opt => form.job?.institute_types?.includes(opt.value))}
                  onChange={handleEligibilityChange("institute_types")}
                  classNamePrefix="select"
                  placeholder="Select institution type"
                  // styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  State
                </Typography>
                <Select
                  isMulti
                  name="states"
                  options={stateOptions}
                  // value={form.job.states}
                  value={stateOptions.filter(opt => form.job?.states?.includes(opt.value))}
                  onChange={handleEligibilityChange("states")}
                  classNamePrefix="select"
                  placeholder="Select state"
                  // styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  City
                </Typography>
                <Select
                  isMulti
                  name="cities"
                  options={cityOptions}
                  // value={form.job.cities}
                  value={cityOptions.filter(opt => form.job?.cities?.includes(opt.value))}
                  onChange={handleEligibilityChange("cities")}
                  classNamePrefix="select"
                  placeholder="Select city"
                  // styles={selectStyles}
                />
              </Box>
        </section>
            </CardContent>
          </Card>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1.1rem",
                background: theme.palette.primary.main,
                "&:hover": {
                  background: theme.palette.primary.dark,
                },
              }}
            >
              Register
            </Button>
          </Box>
        </form>
      </Container>
    </Paper>
  );
}