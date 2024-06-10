import React, { useState, useEffect } from "react";
import api from "../../../utils/auth/axiosInstance";
import { defer, useLoaderData } from "react-router-dom";
import StickyAppBar from "../../common/StickyAppBar";
import { Alert, Box, Grid, TextField, InputLabel, Typography, Divider, styled, InputAdornment } from "@mui/material";
// import { Alert, Grid, TextField, InputLabel } from "@mui/material";
import Select from 'react-select';
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PinIcon from '@mui/icons-material/Pin';
import PasswordIcon from '@mui/icons-material/Password';
import StateCitySelectInput from "../../StateCitySelectInput";
import CKEditorField from "../../common/CKEditorField";
import { graduation_years } from "../../../utils/utils";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaceIcon from '@mui/icons-material/Place';
// import { state } from "../../../utils/stateCities";

const CustomDivider = styled(Divider)(() => ({
    backgroundColor: 'orange',
    height: '2px',
    marginBottom: '12px',
  }));


// Custom styles for react-select
const selectStyles = {
    menu: (provided) => ({
        ...provided,
        zIndex: 2000 // Ensure the dropdown menu appears above other elements
    })
    };

function RegisterCompany(){

    const [ formData, setFormData ] = useState({
        name:'',
        website: '',
        description:'',
        domain:[],
        user:{
            username: '',
            password: ''
        },
        job:{
            filters: {},
            designation: ''
        },
        location:{

        }
    });
    const [ errors, setErrors ] = useState({
        // name:'',
        // website: '',
        // description:'',
        // domain:[],
        // user:{
        //     username: '',
        //     password: ''
        // },
        job:{
            filters: {},
            // designation: ''
        }
    });
    const [ notification, setNotification ] = useState();
    const { data } = useLoaderData();
    const { initial_data } = data;
    const { domains, job_types, foss, states } = initial_data;
    const [ cities, setCities ] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const domains_data = domains.map(item => ({
        label: item.name,
        value: item.id
    }));

    const jobtypes_data = job_types.map(item => ({
        label: item.jobtype,
        value: item.id
    }));

    const fosses_data = foss.map(item => ({
        label: item.foss,
        value: item.id
    }));
    
    const states_data = states.map(item => ({
        label: item.name,
        value: item.id
    }));
    
    const yearsOptions = graduation_years();

    const handleRegistration = async () => {
        try {
            // console.log("Company Registration Success");
            console.log("formData", formData);
            const endpoint = `${process.env.REACT_APP_API_LINK}api/register/company/`;
            console.log("endpoint", endpoint);
            // let data = {
            //     ...formData,
            //     'user': {
            //         ...formData.user,
            //         'username': formData.user.email
            //     }
            // }
            // console.log("data", data);
            const response = await api.post(endpoint, formData); // Assuming you're using axios for HTTP requests
            console.log("success")
            console.log(response.data)
            setNotification({ type: "success", message: "Company registration successful!"})
        } catch (error) {
            console.log("Company Registration Failed");
            console.log("error.response.data");
            let errorData = error.response && error.response.data ? error.response.data : "Unknown error";
            console.log(error.response.data);
            if (typeof errorData === 'string') {
                console.log("IFFF")
                try {
                    errorData = JSON.parse(errorData);
                } catch (parseError) {
                    console.error("Error parsing error response data:", parseError);
                }
            }

            setErrors(errorData.error);
            console.log("errorData")
            console.log(errorData);

            setNotification({ type: "error", message: "Error in registration. Please check below errors!"})
        }
        
    }
    useEffect(() => {
        const fetchCities = async () => {
            setLoadingCities(true);
            try {
              const endpoint = `${process.env.REACT_APP_API_LINK}api/cities/`;
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


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // }

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        // setFormData({
        //     ...formData,
        //     company: {
        //         ...formData.company,
        //         [name]: value
        //     }
        // })
        setFormData({
            ...formData,
            [name]: value
        })
    }; 

    const handleDomainChange = (selectedOption, { name }) => {
        setFormData({
            ...formData,
            company: {
                ...formData.company,
                [name]: [selectedOption.value]
            }
        })
    };
    
    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            user: {
                ...formData.user,
                [name]: value
            }
        })
    };

    const handleJobChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            job: {
                ...formData.job,
                [name]: value
            }
        })
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData({
            ...formData,
            job : {
                ...formData.job,
                filters: {
                    ...formData.job.filters,
                    [name]: selectedValues
                }
            }
        })
      };

    const handleJobEditorChange = (name, data) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: data,
        }));
    };

    const handleJobSelectChange = (selectedOption, { name }) => {
        setFormData({
            ...formData,
            job: {
                ...formData.job,
                [name]: selectedOption.value
            }
        })
    };

    const handleCompanyLocationSelectChange = (selectedOption, { name }) => {
        setFormData({
            ...formData,
            location: {
                ...formData.location,
                [name]: selectedOption.value
            }
        })
    };

    const handleCompanyLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            location: {
                ...formData.location,
                [name]: value
            }
        })
    };


    
  
    const buttonsData = [
        {
            "color": "success",
            "onClickHandler": handleRegistration,
            "btnText": "Submit Registration Form"
        }
    ];


    return (
        <>
             {notification && (
                    <Alert severity={notification.type} sx={{ mb: 2 }}>{notification.message}</Alert>
                )}
            <StickyAppBar appBarTitle="Company Registration" cancelBtnText="Cancel" cancelLink="/" buttonsData={buttonsData}/>
            <Box mt={4} mb={4}>
                <Typography variant="h6" component="h2">Company Profile</Typography>
                <CustomDivider/>
            </Box>
            <Grid container spacing={4}>
                <Grid item md={6}>
                    <TextField 
                        label="Company Name"
                        variant="outlined"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleCompanyChange}
                        error={!!errors.name}
                        helperText={errors.name && errors.name.join(' ')}
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><BusinessIcon/></InputAdornment>,
                        }}
                        

                    />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                        label="URL"
                        variant="outlined"
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleCompanyChange}
                        error={!!errors.website}
                        helperText={errors.website}
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><LinkIcon/></InputAdornment>,
                        }}
                        
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField 
                        label="Description"
                        variant="outlined"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleCompanyChange}
                        error={!!errors.description}
                        helperText={errors.description || "Company Description"}
                        fullWidth
                        size="small"
                        multiline
                        rows={4}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><DescriptionIcon/></InputAdornment>,
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container mt={2}>
            <Grid md={6}>
                    <InputLabel>Domain</InputLabel>
                    <Select 
                    options={domains_data}
                    styles={selectStyles}
                    onChange={handleDomainChange}
                    name="domain"
                    value={domains_data.find(option => option.value === formData.domain)}
                    />
                </Grid>
            </Grid>
            <Box mt={4} mb={4}>
                <Typography variant="h6" component="h2">Company Location</Typography>
                <CustomDivider/>
            </Box>
            
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <StateCitySelectInput 
                            onStateChange={handleCompanyLocationSelectChange}
                            onCityChange={handleCompanyLocationSelectChange} mb={2} gridsize={6}
                            state_field_name="state_id"
                            city_field_name="city_id"/>
                    </Grid>
                    <Grid item md={4}>
                        <InputLabel>Pincode</InputLabel>
                        <TextField 
                            label="Pincode"
                            variant="outlined"
                            id="pincode"
                            name="pincode"
                            value={formData.location.pincode}
                            onChange={handleCompanyLocationChange}
                            error={!!errors.location && !!errors.location.pincode}
                            helperText={errors.location && errors.location.pincode}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    <Grid item md={12}>
                    <TextField 
                        label="Address"
                        variant="outlined"
                        id="address"
                        name="address"
                        value={formData.location && formData.location.address}
                        onChange={handleCompanyLocationChange}
                        error={!!errors.location && !!errors.location.address}
                        helperText={errors.location && errors.location.address || "Company Address"}
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PlaceIcon/></InputAdornment>,
                        }}
                    />
                </Grid>
                </Grid>
                
            <Grid container spacing={2}>
            </Grid>
            <Box mt={4} mb={4}>
                <Typography variant="h6" component="h2">User Profile</Typography>
                <CustomDivider/>
            </Box>
            <Grid container spacing={2}>
                <Grid item md={6}>
                        <TextField 
                            label="First Name"
                            variant="outlined"
                            id="first_name"
                            name="first_name"
                            value={formData.user.first_name}
                            onChange={handleUserChange}
                            error={!!errors.first_name}
                            helperText={errors.first_name}
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment>,
                            }}
                        />
                </Grid>
                <Grid item md={6}>
                        <TextField 
                            label="Last Name"
                            variant="outlined"
                            id="last_name"
                            name="last_name"
                            value={formData.user.last_name}
                            onChange={handleUserChange}
                            error={!!errors.last_name}
                            helperText={errors.last_name}
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment>,
                            }}
                        />
                </Grid>
                <Grid item md={4}>
                        <TextField 
                            label="Email"
                            variant="outlined"
                            id="email"
                            name="email"
                            value={formData.user.email}
                            onChange={handleUserChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><MailIcon/></InputAdornment>,
                            }}
                        />
                </Grid>
                <Grid item md={4}>
                        <TextField 
                            label="Username"
                            type="text"
                            variant="outlined"
                            id="username"
                            name="username"
                            value={formData.user.username}
                            onChange={handleUserChange}
                            error={!!errors.user && !!errors.user.username}
                            helperText={errors.user && errors.user.username}
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><AccountCircleIcon/></InputAdornment>,
                            }}
                        />
                </Grid>
                <Grid item md={4}>
                        <TextField 
                            label="Contact Number"
                            variant="outlined"
                            id="phone"
                            name="phone"
                            value={formData.user.phone}
                            onChange={handleUserChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PhoneIphoneIcon/></InputAdornment>,
                            }}
                        />
                </Grid>
                <Grid item md={12}>
                    <Typography mb={2}>Please enter below the OTP received on the above email: {formData.email}.</Typography>
                        <TextField 
                            label="OTP"
                            variant="outlined"
                            id="otp"
                            name="otp"
                            value={formData.user.otp}
                            onChange={handleUserChange}
                            error={!!errors.otp}
                            helperText={errors.otp}
                            
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PinIcon/></InputAdornment>,
                            }}

                        />
                </Grid>
                <Grid item md={6}>
                        <TextField 
                            label="Password"
                            variant="outlined"
                            id="password"
                            name="password"
                            value={formData.user.password}
                            onChange={handleUserChange}
                            error={!!errors.user && !!errors.user.password}
                            helperText={errors.user && errors.user.password}
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PasswordIcon/></InputAdornment>,
                            }}
                            type="password"

                        />
                </Grid>
                <Grid item md={6}>
                        <TextField 
                            label="Re-Enter Password"
                            variant="outlined"
                            id="confirm_password"
                            name="confirm_password"
                            value={formData.user.confirm_password}
                            onChange={handleUserChange}
                            error={!!errors.confirm_password}
                            helperText={errors.confirm_password}
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PasswordIcon/></InputAdornment>,
                            }}
                            type="password"

                        />
                </Grid>
            </Grid>
            <Box mt={4} mb={4}>
                <Typography variant="h6" component="h2">Job Details</Typography>
                <CustomDivider/>
            </Box>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <TextField
                        label="Job Designation"
                        size="small"
                        variant="outlined"
                        id="designation"
                        name="designation"
                        value={formData.job.designation}
                        onChange={handleJobChange}
                        error={!!errors.job && !!errors.job.designation}
                        helperText={errors.job && errors.job.designation && errors.job.designation.join(' ')}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={6} sx={{ mb: 2}}>
                    <InputLabel htmlFor="job_type">Job Type</InputLabel>
                    <Select name="job_type" id="job_type" styles={selectStyles}
                    value={job_types.find(option => option.value === formData.job.job_type)}
                    onChange={handleJobSelectChange}
                    options={jobtypes_data} 
                    error={!!errors.job_type}/>
                {errors.job_type && <div style={{ color: 'red', fontSize: 'small' }}>{errors.job_type}</div>}
                </Grid>
                <Grid item xs={12} md={6} sx={{ mb: 2}}>
                    <InputLabel htmlFor="domain">Domain</InputLabel>
                    <Select name="domain" id="domain" styles={selectStyles}
                    value={job_types.find(option => option.value === formData.job.domain)}
                    onChange={handleJobSelectChange} options={domains_data} 
                    error={!!errors.domain}/>
                {errors.domain && <div style={{ color: 'red', fontSize: 'small' }}>{errors.domain}</div>}
                </Grid>
            </Grid>
            <Box mb={2}>
                <Typography>Location of Job</Typography>
                <CustomDivider mb={2}/>
                <StateCitySelectInput 
                // inputState={22}  
                onStateChange={handleJobSelectChange}
                onCityChange={handleJobSelectChange} 
                state_field_name="state_job"
                city_field_name="city_job"
                mb={2}/>
                </Box>
            <CustomDivider mb={2}/>
            <Grid container spacing={2} sx={{ mt:2}}>
                <Grid item xs={12} md={12} >
                    <InputLabel htmlFor="description">Job Description</InputLabel>
                    <CKEditorField label="Job Description" id="description"
                    value={formData.job.description}
                    onChange={handleJobEditorChange} name="description" />
                    {errors.description && <div style={{ color: 'red', fontSize: 'small' }}>{errors.description}</div>}
                </Grid>

                <Grid item xs={12} md={12} >
                    <InputLabel htmlFor="responsibilities">Key Job Responsibilities</InputLabel>
                    <CKEditorField label="Key Job Responsibilities"  id="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleJobEditorChange} name="key_job_responsibilities" />
                    {errors.key_job_responsibilities && <div style={{ color: 'red', fontSize: 'small' }}>{errors.key_job_responsibilities}</div>}
                </Grid>

                <Grid item xs={12} md={12}>
                    <InputLabel htmlFor="requirements">Job Requirements</InputLabel>
                    <CKEditorField label="Requirements" id="requirements"
                    value={formData.requirements}
                    onChange={handleJobEditorChange} name="requirements" />
                    {errors.requirements && <div style={{ color: 'red', fontSize: 'small' }}>{errors.requirements}</div>}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sx={{ mb: 2}}>
                        <TextField
                                fullWidth
                                id="num_vacancies"
                                name="num_vacancies"
                                label="Number of vacancies"    
                                type="number"
                                variant="outlined"
                                value={formData.job.num_vacancies || 0}
                                onChange={handleJobChange}
                                error={!!errors.num_vacancies}
                                helperText={errors.num_vacancies}
                            />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ mb: 2}} >
                        <TextField
                                fullWidth
                                id="salary_range_min"
                                name="salary_range_min"
                                label="Min Salary"    
                                type="number"
                                variant="outlined"
                                value={formData.job.salary_range_min || ''}
                                onChange={handleJobChange}
                                error={!!errors.salary_range}
                                helperText={errors.salary_range}
                            />
                    </Grid>
                    
                    <Grid item xs={12} md={4} sx={{ mb: 2}}>
                        <TextField
                                fullWidth
                                id="salary_range_max"
                                name="salary_range_max"
                                label="Max Salary"
                                type="number"
                                variant="outlined"
                                value={formData.job.salary_range_max || ''}
                                onChange={handleJobChange}
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
                        value={yearsOptions.filter(option => formData.job.filters.filter_year?.includes(option.value))}
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
                        options={fosses_data}
                        value={fosses_data.filter(option => formData.job.filters.filter_mandatory_skills?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isMulti
                    />
                {errors.filter_mandatory_skills && <div style={{ color: 'red', fontSize: 'small' }}>Select atleast 1 skill.</div>}
              </Grid>
              
             <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <InputLabel htmlFor="filter_optional_skills">Optional Skills</InputLabel>
                <Select
                        name="filter_optional_skills"
                        options={fosses_data}
                        value={fosses_data.filter(option => formData.job.filters.filter_optional_skills?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isMulti
                    />
              </Grid> 
              <Grid item xs={12} md={8} sx={{ mb: 2}}>
                <InputLabel htmlFor="filter_states">States</InputLabel>
                <Select
                        name="filter_states"
                        id="filter_states"
                        options={states_data}
                        value={states_data.filter(option => formData.job.filters.filter_states?.includes(option.value))}
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
                        value={cities.filter(option => formData.job.filters.filter_cities?.includes(option.value))}
                        onChange={handleMultiSelectChange}
                        isLoading={loadingCities}
                        isMulti
                    />
                {/* {errors.filter_states && <div style={{ color: 'red', fontSize: 'small' }}>Select atleast 1 skill.</div>} */}
              </Grid>

            
            
              </Grid>
            
            
        </>
    )
}

export default RegisterCompany;

export async function loader(){
    try {
        const endpoint = `${process.env.REACT_APP_API_LINK}api/company-initial-data/`;
        const response = await api.get(endpoint);
        
        return defer({ data: response.data });
    } catch (error) {
        console.error('Error fetching data for company', error);
        throw error;
    }
}
