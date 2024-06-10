import React, { Suspense, useEffect, useState } from 'react';
import { useLoaderData, Await, Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { defer } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  Snackbar,
  Alert,
  Divider
  
} from '@mui/material';
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DatePicker } from '@mui/x-date-pickers';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { styled } from '@mui/system';
import { getJobFormInitialData } from '../../../utils/api/company/jobs'; 
import Spinner from '../../common/Spinner';
import CKEditorField from '../../common/CKEditorField';
import Select from 'react-select';

// import StateAndCityInput from '../../common/StateAndCityInput';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import api from '../../../utils/auth/axiosInstance';
import StateCitySelectInput from '../../StateCitySelectInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CustomDivider = styled(Divider)(() => ({
  // 
  backgroundColor: '#002648',
 
  height: '2px',
  marginBottom: '12px'
}));

/**
 * UpdateJobForm component handles the loading of job data and renders the JobForm component.
 * It uses Suspense and Await to manage the asynchronous data fetching and loading state.
 */
function UpdateJobForm(){
    const { initialFormData } = useLoaderData();

    return (
       <Suspense fallback={<Spinner></Spinner>}>
            <Await resolve={ initialFormData }>
                {(data) => <JobForm initialData={data}></JobForm>}
            </Await>
       </Suspense>
    );
}


/**
 * JobForm component renders the form for updating job details.
 * It manages form state, handles input changes, validates the form, and handles form submission.
 * 
 * @param {Object} initialData - Initial data for the form including job details.
 */
function JobForm({ initialData }){
    const { job_id } = useParams();
    const { initial_data, job } = initialData;
    const [ formData, setFormData ] = useState(job || {});
    const [ errors, setErrors ] = useState({});
    const [ changedFields, setChangedFields ] = useState({});
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const [ states, setStates ] = useState([]);
    const [ cities, setCities ] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);

    

    const job_types = initial_data.job_types.map(item => ({
        value: item.id,
        label: item.jobtype
    }));

    const domains = initial_data.domains.map(item => ({
        value: item.id,
        label: item.name
    }));

    const fosses = initial_data.foss.map(item => ({
        value: item.id,
        label: item.foss
    }));

    const graduation_years = (currentYear) => {
        const range = 4;
        const years = [];
        for (let i = currentYear - range; i <= currentYear + range; i++) {
            years.push({ value: i, label: i.toString() });
          }
        return years;
    }

    const currentYear = new Date().getFullYear();
    const yearsOptions = graduation_years(currentYear);
    
    useEffect(()=>{
        if(job){
            setFormData(job);
        }
    },[job]);

    useEffect(() => {
        
      // Fetch states from the API when the component mounts
      const fetchStates = async () => {
          // setLoadingStates(true);
          // await sleep(1000); // Simulate delay
          try {
          const endpoint = `${process.env.REACT_APP_API_LINK}api/states/`;
          const response = await api.get(endpoint); // Assuming you're using axios for HTTP requests
          let state_data = response.data.map(item => (
              {
                  value: item.id,
                  label: item.name
              }
          ));
          setStates(state_data);
          } catch (error) {
          console.error('Error fetching states:', error);
          } 
      
      }
      fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
        setLoadingCities(true);
        try {
          const endpoint = `${process.env.REACT_APP_API_LINK}api/cities/`;
          console.log("city endpoint is : ", endpoint);
          const response = await api.get(endpoint); // Assuming you're using axios for HTTP requests
          let city_data = response.data.map(item => (
            {
                value: item.id,
                label: item.name
            }
        ));
        setCities(city_data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        } finally {
            setLoadingCities(false);
        }
    };
    fetchCities();
  }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name] : value
        });

        setChangedFields({
            ...changedFields,
            [name] : value
        });

        if(value){
          setErrors((prevErrors) => {
            const {[name]: error, ...others} = prevErrors;
            console.log(error);
            return others;
         });
        }

        // Validation for salary range
        if (name === 'salary_range_min' || name === 'salary_range_max'){
            const minSalary = name === 'salary_range_min' ? parseFloat(value) : parseFloat(formData.salary_range_min || 0);
            const maxSalary = name === 'salary_range_max' ? parseFloat(value) : parseFloat(formData.salary_range_max || 0);
            if (minSalary > maxSalary) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  salary_range: 'Max salary must be greater than min salary',
                }));
              } else {
                setErrors(prevErrors => {
                  const { salary_range, ...rest } = prevErrors;
                  console.log(salary_range);
                  return rest;
                });
              }
        }
    }

    const handleEditorChange = (name, data) => {
        setFormData({
          ...formData,
          [name]: data,
        });
        setChangedFields({
          ...changedFields,
          [name]: data,
        });

        if(name == "description"){
          setErrors((prevErrors) => {
            const {[name]: error, ...others} = prevErrors;
            console.log(error);
            return others;
         });
        }
      };

    const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedOption.value,
    }));

    setChangedFields((prevChangedFields) => ({
        ...prevChangedFields,
        [name]: selectedOption.value,
    }));
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: selectedValues,
        }));
    
        setChangedFields((prevChangedFields) => ({
          ...prevChangedFields,
          [name]: selectedValues,
        }));

        if(selectedValues.length!=0){
          setErrors((prevErrors) => {
            const {[name]: error, ...others} = prevErrors;
            console.log(error);
            return others;
         });
        }
      };

      // const handleDateChange = (newDate) => {
      //   setFormData((prevFormData) => ({
      //     ...prevFormData,
      //     'last_application_date': newDate,
      //   }));
    
      //   setChangedFields((prevChangedFields) => ({
      //     ...prevChangedFields,
      //     'last_application_date': newDate,
      //   }));

      //   if(newDate){
      //     setErrors((prevErrors) => {
      //       const {last_application_date, ...others} = prevErrors;
      //       console.log(last_application_date);
      //       return others;
      //    });
      //   }
      // }

    const validate = () => {
        const minSalary = Number(formData.salary_range_min);
        const maxSalary = Number(formData.salary_range_max);
        let formErrors = {};
        if (!formData.designation) formErrors.designation = "Designation is required";
        if (minSalary > maxSalary) formErrors.salary_range = 'Max salary must be greater than min salary';
        return formErrors;
    }


    const formatFilters = (changedFields) => {
      let updatedFields = changedFields;
                  if('filter_year' in updatedFields){
                    updatedFields = {
                      ...updatedFields,
                      filters: {
                        ...updatedFields.filters,
                        'filter_year': updatedFields.filter_year,
                      },
                    };
                    delete updatedFields.filter_year;
                  }
                  if('filter_mandatory_skills' in updatedFields){
                    updatedFields = {
                      ...updatedFields,
                      filters: {
                        ...updatedFields.filters,
                        'filter_mandatory_skills': updatedFields.filter_mandatory_skills,
                      },
                    };
                    delete updatedFields.filter_mandatory_skills;

                  }
                  if('filter_optional_skills' in updatedFields){
                    updatedFields = {
                      ...updatedFields,
                      filters: {
                        ...updatedFields.filters,
                        'filter_optional_skills': updatedFields.filter_optional_skills,
                      },
                    };
                    delete updatedFields.filter_optional_skills;

                  }
                  if('filter_states' in updatedFields){
                    updatedFields = {
                      ...updatedFields,
                      filters: {
                        ...updatedFields.filters,
                        'filter_states': updatedFields.filter_states,
                      },
                    };
                    delete updatedFields.filter_states;

                  }
                  if('filter_cities' in updatedFields){
                    updatedFields = {
                      ...updatedFields,
                      filters: {
                        ...updatedFields.filters,
                        'filter_cities': updatedFields.filter_cities,
                      },
                    };
                    delete updatedFields.filter_cities;

                  }
      return updatedFields;
    }

    const handleDraftSubmit =  async(e) => {
      e.preventDefault();
      const formErrors = validate();
      if (Object.keys(formErrors).length == 0){
          try {
              const updatedFields = formatFilters(changedFields);
              // Add the API call here to update the job details
              try {
                const endpoint = `${process.env.REACT_APP_API_LINK}api/job-data/${job_id}`;
                const response = await api.patch(endpoint, updatedFields); // Assuming you're using axios for HTTP requests
                console.log(response);
                setNotification({ open: true, message: 'Form submitted successfully', severity: 'success' });
              } catch (error) {
                console.error('Error fetching states:', error);
                setNotification({ open: true, message: 'Error in form submission', severity: 'error' });
              }
            } catch (error) {
              console.log("Error in Form submission");
            }
      }else{
          setErrors(formErrors);
      }
  }

    const validateRequiredFields = () => {

      let formErrors = {};
      if (!formData.designation) formErrors.designation = "Designation is required";
      if (!formData.city_job) formErrors.city_job = "Designation is required";
      if (!formData.state_job) formErrors.state_job = "Designation is required";
      if (!formData.job_type) formErrors.job_type = "Designation is required";
      if (!formData.domain) formErrors.domain = "Designation is required";
      if (!formData.description) formErrors.description = "Designation is required";
      if (formData.filter_year === null || formData.filter_year === undefined || formData.filter_year.length === 0) formErrors.filter_year = "Designation is required";     
      if (formData.filter_mandatory_skills === null || formData.filter_mandatory_skills === undefined || formData.filter_mandatory_skills.length === 0) formErrors.filter_mandatory_skills = "Designation is required";     
      if (!formData.last_application_date) formErrors.last_application_date = "Designation is required";
      if (!formData.num_vacancies) formErrors.num_vacancies = "Designation is required";
      if (!formData.salary_range_max) formErrors.salary_range_max = "Designation is required";
      if (!formData.salary_range_min) formErrors.salary_range_min = "Designation is required";
      
      return formErrors;

    }

    const handleSubmit =  async(e) => {
        e.preventDefault();
        const formErrors = validateRequiredFields();
        if (Object.keys(formErrors).length == 0){
            try {
                const updatedFields = formatFilters(changedFields);
                // Add the API call here to update the job details
                try {
                  
                  console.log("updatedFields **********", updatedFields)
                  const endpoint = `${process.env.REACT_APP_API_LINK}api/job-data/${job_id}`;
                  const response = await api.patch(endpoint, updatedFields); // Assuming you're using axios for HTTP requests
                  console.log(response);
                  setNotification({ open: true, message: 'Form submitted successfully', severity: 'success' });
                } catch (error) {
                  console.error('Error fetching states:', error);
                  setNotification({ open: true, message: 'Error in form submission', severity: 'error' });
                }
              } catch (error) {
                console.log("Error in Form submission");
              }
        }else{
            setErrors(formErrors);
        }
    }

    const handleCloseNotification = () => {
      setNotification({ ...notification, open: false });
  };

     // Custom styles for react-select
  const selectStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 2000 // Ensure the dropdown menu appears above other elements
    })
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      // You can customize other colors here
    },
  });

    return (

      <Box sx={{ p:6 }}>
            <AppBar position="sticky" sx={{mb:6, backgroundColor: "#002648"}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Update Job Details
            </Typography>
            <Button component={Link}  to="/auth/employer/jobs" variant="contained" sx={{backgroundColor: "grey", mr: 1.5, mt: 1.5, mb: 1.5}} >Cancel</Button>
            <Button variant="contained" color="warning" sx={{ mr: 1.5,mt: 1.5, mb: 1.5 }} onClick={handleDraftSubmit}>Save as Draft</Button>
            <Button variant="contained" color="success" sx={{ mr: 1.5,mt: 1.5, mb: 1.5 }} onClick={handleSubmit}>Submit Job Application</Button>
          </Toolbar>
          <ThemeProvider theme={darkTheme}>
          <Snackbar
            open={notification.open}
            autoHideDuration={10000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ width: '50%', mt: 10}}
        >
            <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>  
        </ThemeProvider>
        </AppBar>        
            <form onSubmit={handleSubmit}>
              
            <Grid container spacing={2}>
              <Grid item xs={8}>
             

              </Grid>
              <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <TextField
                    fullWidth
                    id="designation"
                    name="designation"
                    label="Designation"
                    variant="outlined"
                    value={formData.designation || ''}
                    onChange={handleChange}
                    error={!!errors.designation}
                    helperText={errors.designation}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} sx={{ mb: 2}}>
                    <InputLabel htmlFor="job_type">Job Type</InputLabel>
                    <Select name="job_type" id="job_type" styles={selectStyles}
                    value={job_types.find(option => option.value === formData.job_type)}
                    onChange={handleSelectChange} options={job_types} />
                </Grid>
                  <Grid item xs={12} md={4} sx={{ mb: 2}}>
                    <InputLabel htmlFor="domain">Domain</InputLabel>
                    <Select name="domain" id="domain" styles={selectStyles}
                    value={domains.find(option => option.value === formData.domain)}
                    onChange={handleSelectChange} options={domains} />
                </Grid>
              </Grid>
              <StateCitySelectInput inputState={formData.state_job} inputCity={formData.city_job} 
                  onStateChange={handleSelectChange}
                  onCityChange={handleSelectChange} />
              <Grid container spacing={2} sx={{ mt:2}}>
              <Grid item xs={12} md={8} >
                <InputLabel htmlFor="description">Job Description</InputLabel>
                <CKEditorField label="Job Description" value={formData.description} id="description"
                  onChange={handleEditorChange} name="description" />
                  {errors.description && <div style={{ color: 'red', fontSize: 'small' }}>Please add job description.</div>}
              </Grid>

              <Grid item xs={12} md={8} >
                <InputLabel htmlFor="responsibilities">Key Job Responsibilities</InputLabel>
                <CKEditorField label="Key Job Responsibilities" value={formData.key_job_responsibilities} id="responsibilities"
                  onChange={handleEditorChange} name="key_job_responsibilities" />
              </Grid>

              <Grid item xs={12} md={8}>
                <InputLabel htmlFor="requirements">Job Requirements</InputLabel>
                <CKEditorField label="Requirements" value={formData.requirements} id="requirements"
                onChange={handleEditorChange} name="requirements" />
              </Grid>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={12} md={2} sx={{ mb: 2}}>
                <TextField
                        fullWidth
                        id="num_vacancies"
                        name="num_vacancies"
                        label="Number of vacancies"    
                        type="number"
                        variant="outlined"
                        value={formData.num_vacancies || 0}
                        onChange={handleChange}
                        error={!!errors.num_vacancies}
                        helperText={errors.num_vacancies}
                    />
              </Grid>
              <Grid item xs={12} md={2} sx={{ mb: 2}} >
                <TextField
                        fullWidth
                        id="salary_range_min"
                        name="salary_range_min"
                        label="Min Salary"    
                        type="number"
                        variant="outlined"
                        value={formData.salary_range_min || ''}
                        onChange={handleChange}
                        error={!!errors.salary_range}
                        helperText={errors.salary_range}
                    />
              </Grid>
              
              <Grid item xs={12} md={2} sx={{ mb: 2}}>
                <TextField
                        fullWidth
                        id="salary_range_max"
                        name="salary_range_max"
                        label="Max Salary"
                        type="number"
                        variant="outlined"
                        value={formData.salary_range_max || ''}
                        onChange={handleChange}
                        error={!!errors.salary_range}
                        helperText={errors.salary_range}
                    />    
              </Grid>

             
              </Grid>
              <Typography variant="h6" component="h2">Student Shortlist Criteria</Typography>
              <CustomDivider />
              {/* <Divider/> */}
              
              <Grid container spacing={2}>
              
              <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <InputLabel htmlFor="years">Graduation Years</InputLabel>
                <Select
                        name="filter_year"
                        id="years"
                        options={yearsOptions}
                        value={yearsOptions.filter(option => formData.filter_year?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isMulti
                        error={!!errors.filter_year}
                    />
                    {errors.filter_year && <div style={{ color: 'red', fontSize: 'small' }}>Select an option</div>}
              </Grid>
              <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <InputLabel htmlFor="filter_mandatory_skills">Mandatory Skills</InputLabel>
                <Select
                        name="filter_mandatory_skills"
                        id="filter_mandatory_skills"
                        options={fosses}
                        value={fosses.filter(option => formData.filter_mandatory_skills?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isMulti
                    />
                {errors.filter_mandatory_skills && <div style={{ color: 'red', fontSize: 'small' }}>Select atleast 1 skill.</div>}
              </Grid>
              <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <InputLabel htmlFor="filter_optional_skills">Optional Skills</InputLabel>
                <Select
                        name="filter_optional_skills"
                        options={fosses}
                        value={fosses.filter(option => formData.filter_optional_skills?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isMulti
                    />
              </Grid>
              <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <InputLabel htmlFor="filter_states">State</InputLabel>
                <Select
                        name="filter_states"
                        id="filter_states"
                        options={states}
                        value={states.filter(option => formData.filter_states?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isMulti
                    />
                {/* {errors.filter_states && <div style={{ color: 'red', fontSize: 'small' }}>Select atleast 1 skill.</div>} */}
              </Grid>
              <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <InputLabel htmlFor="filter_cities">City</InputLabel>
                <Select
                        name="filter_cities"
                        id="filter_cities"
                        options={cities}
                        value={cities.filter(option => formData.filter_cities?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isLoading={loadingCities}
                        isMulti
                    />
                {/* {errors.filter_states && <div style={{ color: 'red', fontSize: 'small' }}>Select atleast 1 skill.</div>} */}
              </Grid>
              </Grid>
            </form>   
           
      </Box>
      );
}

JobForm.propTypes = {
    initialData: PropTypes.shape({
      initial_data: PropTypes.object, // Adjust the shape based on the actual structure of initial_data
      job: PropTypes.object,
    }).isRequired
  };
  
export async function loader({ params }){
    const initialFormData = await getJobFormInitialData(params.job_id);
    return defer({ initialFormData });
}

export default UpdateJobForm;