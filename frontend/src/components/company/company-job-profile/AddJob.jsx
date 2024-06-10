import React, { Suspense, useState, useEffect } from "react";
import { useLoaderData, Await } from "react-router-dom";
import StickyAppBar from "../../common/StickyAppBar";
import { defer } from "react-router-dom";
import api from "../../../utils/auth/axiosInstance";
import {  Box, FormControl, Alert,
    // FormHelperText, 
    TextField, Grid, InputLabel, Divider,
    Typography} from "@mui/material";
import Select from 'react-select';
import Spinner from '../../common/Spinner';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StateCitySelectInput from "../../StateCitySelectInput";
import { styled } from '@mui/system';
import CKEditorField from "../../common/CKEditorField";
import { graduation_years } from "../../../utils/utils";



const CustomDivider = styled(Divider)(() => ({
    // 
    backgroundColor: '#002648',
    height: '2px',
    marginBottom: '12px',
    width: '60%',
  }));

const darkTheme = createTheme({
    palette: {
      mode: 'light',
      // You can customize other colors here
    },
  });

const AddJobForm = () => {
    const { initial_data } = useLoaderData();

    return (
       <Suspense fallback={<Spinner></Spinner>}>
            <Await resolve={ initial_data }>
                {(data) => <AddJob initialdata={data}></AddJob>}
            </Await>
       </Suspense>
    );
}
// Custom styles for react-select
const selectStyles = {
menu: (provided) => ({
    ...provided,
    zIndex: 2000 // Ensure the dropdown menu appears above other elements
})
};
const AddJob = ({ initialdata }) => {

    const { initial_data } = initialdata;
    const [ formFields, setFormFields ] = useState({
        designation: '',
        job_type: '',
        domain:'',

    });
const [ errors, setErrors ] = useState([]);
const [successMessage, setSuccessMessage] = useState('');
const [ cities, setCities ] = useState([]);
const [loadingCities, setLoadingCities] = useState(false);
console.log(setErrors);


    console.log("initial data from app");
    console.log(initial_data);
    // console.log(initial_data.initial_data);
    // const job_types = [];
    const job_types = initial_data.job_types.map( item => ({
        label: item.jobtype,
        value: item.id
    }));

    const domains = initial_data.domains.map( item => ({
        label: item.name,
        value: item.id
    }));
    const yearsOptions = graduation_years();

    const states = initial_data.states.map(item => ({
        label: item.name,
        value: item.id
    }));

    const fosses = initial_data.foss.map(item => ({
        value: item.id,
        label: item.foss
    }));


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


    

    console.log(setFormFields);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });

        // Validation for salary range
        if (name === 'salary_range_min' || name === 'salary_range_max'){
            const minSalary = name === 'salary_range_min' ? parseFloat(value) : parseFloat(formFields.salary_range_min || 0);
            const maxSalary = name === 'salary_range_max' ? parseFloat(value) : parseFloat(formFields.salary_range_max || 0);
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
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setFormFields((prevFormData) => ({
            ...prevFormData,
            [name]: selectedOption.value,
        }));
    }

    const handleEditorChange = (name, data) => {
        setFormFields((prevFormData) => ({
            ...prevFormData,
            [name]: data,
        }));
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormFields((prevFormData) => ({
          ...prevFormData,
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedFields = formatFilters(formFields);
        try {
            console.log("Submit");
            // const formData = {
            //     ...formFields,
            //     status: 'pending_approval',
            // }
            const endpoint = `${process.env.REACT_APP_API_LINK}api/company/manager/jobs/`;
            const response = await api.post(endpoint, updatedFields);
            console.log('Success:', response.data);
            setErrors({});
            setSuccessMessage('Job added successfully!');
            window.scrollTo(0, 0);
            // Add your submit logic here
        } catch (error) {
            console.error('Error submitting job application:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                setErrors(error.response.data);
                setSuccessMessage('');
              } else {
                console.error('Error:', error.message);
                setSuccessMessage('');
              }
              window.scrollTo(0, 0);
        }
    };
   

    const handleDraft = () => {
        try {
            console.log("Draft");
            // Add your draft logic here
        } catch (error) {
            console.error('Error saving draft:', error);
        }
    }

    

    const buttonsData = [
        {
            "color": "warning",
            "onClickHandler": handleDraft,
            "btnText": "Save as Drafts"
        },
        {
            "color": "success",
            "onClickHandler": handleSubmit,
            "btnText": "Submit Job Applications"
        }
    ];
    return (
        <>
            <Box sx={{ p:6 }}>
            <ThemeProvider theme={darkTheme}>
                {successMessage && (
                    <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>
                )}
            </ThemeProvider>
           
              <StickyAppBar appBarTitle="Add Job" cancelBtnText="Back" cancelLink="/auth/employer/jobs" buttonsData={buttonsData}/>
             
              <Box component="form">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} mb={2}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <TextField
                                label="Designation"
                                variant="outlined"
                                id="designation"
                                name="designation"
                                value={formFields.designation}
                                onChange={handleChange}
                                error={!!errors.designation}
                                helperText={errors.designation}
                                >
                            </TextField>
                            {/* <FormHelperText>Enter the job designation</FormHelperText> */}
                            {/* {errors.designation && <div style={{ color: 'red', fontSize: 'small' }}>{errors.designation}</div>} */}
                        </FormControl>
                    </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} sx={{ mb: 2}}>
                            <InputLabel htmlFor="job_type">Job Type</InputLabel>
                            <Select name="job_type" id="job_type" styles={selectStyles}
                            value={job_types.find(option => option.value === formFields.job_type)}
                            onChange={handleSelectChange}
                            options={job_types} 
                            error={!!errors.job_type}/>
                        {errors.job_type && <div style={{ color: 'red', fontSize: 'small' }}>{errors.job_type}</div>}
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ mb: 2}}>
                            <InputLabel htmlFor="domain">Domain</InputLabel>
                            <Select name="domain" id="domain" styles={selectStyles}
                            value={job_types.find(option => option.value === formFields.domain)}
                            onChange={handleSelectChange} options={domains} 
                            error={!!errors.domain}/>
                        {errors.domain && <div style={{ color: 'red', fontSize: 'small' }}>{errors.domain}</div>}
                        </Grid>
                    </Grid>
                    <Box mb={2}>
                        <Typography>Location of Job</Typography>
                        <CustomDivider mb={2}/>
                        {/* <CustomD */}
                        <StateCitySelectInput 
                        // inputState={22}  
                        onStateChange={handleSelectChange}
                        onCityChange={handleSelectChange} mb={2}/>
                        </Box>
                        <CustomDivider mb={2}/>
                    </Box>
                    <Grid container spacing={2} sx={{ mt:2}}>
                        <Grid item xs={12} md={8} >
                            <InputLabel htmlFor="description">Job Description</InputLabel>
                            <CKEditorField label="Job Description" id="description"
                            value={formFields.description}
                            onChange={handleEditorChange} name="description" />
                            {errors.description && <div style={{ color: 'red', fontSize: 'small' }}>{errors.description}</div>}
                        </Grid>

                        <Grid item xs={12} md={8} >
                            <InputLabel htmlFor="responsibilities">Key Job Responsibilities</InputLabel>
                            <CKEditorField label="Key Job Responsibilities"  id="responsibilities"
                            value={formFields.responsibilities}
                            onChange={handleEditorChange} name="key_job_responsibilities" />
                            {errors.key_job_responsibilities && <div style={{ color: 'red', fontSize: 'small' }}>{errors.key_job_responsibilities}</div>}
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <InputLabel htmlFor="requirements">Job Requirements</InputLabel>
                            <CKEditorField label="Requirements" id="requirements"
                            value={formFields.requirements}
                            onChange={handleEditorChange} name="requirements" />
                            {errors.requirements && <div style={{ color: 'red', fontSize: 'small' }}>{errors.requirements}</div>}
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
                                    value={formFields.num_vacancies || 0}
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
                                    value={formFields.salary_range_min || ''}
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
                                    value={formFields.salary_range_max || ''}
                                    onChange={handleChange}
                                    error={!!errors.salary_range}
                                    helperText={errors.salary_range}
                                />    
                        </Grid>
              </Grid>
              <Typography variant="h6" component="h2">Student Shortlist Criteria</Typography>
              <CustomDivider />
              <Grid container spacing={2}>
              <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <InputLabel htmlFor="years">Graduation Years</InputLabel>
                <Select
                        name="filter_year"
                        id="years"
                        options={yearsOptions}
                        value={yearsOptions.filter(option => formFields.filter_year?.includes(option.value))}
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
                        value={fosses.filter(option => formFields.filter_mandatory_skills?.includes(option.value))}
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
                        value={fosses.filter(option => formFields.filter_optional_skills?.includes(option.value))}
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
                        value={states.filter(option => formFields.filter_states?.includes(option.value))}
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
                        value={cities.filter(option => formFields.filter_cities?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isLoading={loadingCities}
                        isMulti
                    />
                {/* {errors.filter_states && <div style={{ color: 'red', fontSize: 'small' }}>Select atleast 1 skill.</div>} */}
              </Grid>

              </Grid>
            </Box>
            
        </>
    )
}


export async function loader(){
    try {
        const endpoint = 'api/job-initial-data/';
        const response = await api.get(endpoint);
        console.log("job-initial-data")
        console.log(response.data)
        return defer({ initial_data: response.data });
    } catch (error) {
        console.error('Error fetching data from EmployerDashboard Loader', error);
        throw error;
    }
}


AddJob.propTypes = {
    initialdata: PropTypes.object
}
export default AddJobForm;