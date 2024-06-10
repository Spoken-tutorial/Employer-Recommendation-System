import React, { useEffect, useState } from "react";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { InputLabel, Typography, Button, Box, TextField, Grid, Card, CardHeader, CardContent, Alert} from "@mui/material";

import BusinessIcon from '@mui/icons-material/Business';
import PlaceIcon from '@mui/icons-material/Place';
import Select from 'react-select';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useLoaderData } from "react-router-dom";
import api from "../../../utils/auth/axiosInstance";
import { defer } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StateCitySelectInput from "../../StateCitySelectInput";

const selectStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 2000 // Ensure the dropdown menu appears above other elements
    })
  };

const darkTheme = createTheme({
palette: {
    mode: 'light',
    // You can customize other colors here
},
});

const CompanyUserProfile = () => {

    const { initialFormData } = useLoaderData();
    // const { user, company, location, states, districts, cities, domains } = initialFormData;
    const { user, company, location, domains } = initialFormData;
    const [ formUser, setFormUser ]  = useState(user);
    const [ formCompany, setFormCompany ]  = useState(company);
    const [ formLocation, setFormLocation ]  = useState(location);
    const [ formPassword, setFormPassword ]  = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('warning');
    const [ changedUserData, setChangedUserData ] = useState({});
    const [ errors, setErrors ] = useState({});

   
    // const states_data = states.map(item => ({
    //     'label': item.name,
    //     'value': item.id
    // }));

    // const districts_data = districts.map(item => ({
    //     'label': item.name,
    //     'value': item.id
    // }));

    // const cities_data = cities.map(item => ({
    //     'label': item.name,
    //     'value': item.id
    // }));

    const domains_data = domains.map(item => ({
        'label': item.name,
        'value': item.id
    }));

    
    useEffect(()=>{
        // setFormUser(user);
        // setFormCompany(company);
        // setFormLocation(location);
    })

    const handleUserProfileUpdate = async () => {
        try {
            console.log('handleUserProfileUpdate');
            const endpoint = `${process.env.REACT_APP_API_LINK}api/profile/company/user/`;
            console.log("changedUserData",changedUserData);
            const response = await api.patch(endpoint, changedUserData);
            console.log(response.data);
            setSuccessMessage('User profile updated successfully');
            setAlertStatus('success');
        } catch (error) {
            console.log("error");
            setSuccessMessage('Error in updating profile');
            setAlertStatus('error');
            console.log(error);
        }
    }

    const handleUserPasswordReset = async () => {
        
        try {
            console.log('handleUserPasswordReset');
            const endpoint = `${process.env.REACT_APP_API_LINK}api/profile/company/reset-password/`;
            console.log("formPassword",formPassword);
            console.log("endpoint",endpoint);
            const response = await api.patch(endpoint, formPassword);
            console.log(response.data);
            setSuccessMessage('User password updated successfully');
            setAlertStatus('success');
            
            window.scrollTo(0, 0);
        } catch (error) {
            console.log("error");
            setSuccessMessage('Error in resetting  password');
            setAlertStatus('error');
            console.log("error");
            console.log(error.response.data);
            setErrors(error.response.data);
            console.log("error current_password");
            // console.log(errors.current_password.join(' '));
            window.scrollTo(0, 0);
        }
        
    }

    // const handleChange = (e) => {
    const handleUserProfileChange = (e) => {
        
        const { name, value } = e.target;
        console.log("name, value", name, value);
        // setFormUser((prevData) => ({
        //     ...prevData,
        //     [name] : value
        // }))
        setFormUser({
            ...formUser,
            [name]: value
        });

        setChangedUserData({
            ...changedUserData,
            [name]: value
        })
    };

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setFormCompany((prevData) => ({
            ...prevData,
            [name] : value
        }));
    };
    
   
    const handleDomainChange = (selectedOptions, { name }) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormCompany((prevFormData) => ({
          ...prevFormData,
          [name]: selectedValues,
        }));
    };

    const handleLocationChange = (selectedOption, { name }) => {
        console.log(selectedOption, name);
        setFormLocation((prevFormData) => ({
            ...prevFormData,
            [name]: selectedOption.value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormLocation((prevData) => ({
            ...prevData,
            [name] : value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        console.log("name, value", name, value);
        setFormPassword((prevData) => ({
            ...prevData,
            [name] : value
        }));
    };

    const handleCompanyUpdate = async () => {
        try {
            console.log('handleCompanyUpdate');
            console.log('formCompany', formCompany);
            const endpoint = `${process.env.REACT_APP_API_LINK}api/profile/company/data/`;
            
            const response = await api.patch(endpoint, formCompany);
            console.log(response.data);
            setSuccessMessage('Company profile updated successfully');
            setAlertStatus('success');
        } catch (error) {
            console.log("error");
            setSuccessMessage('Error in updating company profile');
            setAlertStatus('error');
            console.log(error);
        }
       
    }

    const handleLocationUpdate = async () => {
        try {
            console.log('handleCompanyUpdate');
            console.log('formCompany', formCompany);
            const endpoint = `${process.env.REACT_APP_API_LINK}api/profile/company/location/`;
            
            const response = await api.post(endpoint, formLocation);
            console.log(response.data);
            setSuccessMessage('Company profile updated successfully');
            setAlertStatus('success');
            window.scrollTo(0, 0);
        } catch (error) {
            console.log("error");
            setSuccessMessage('Error in updating company profile');
            setAlertStatus('error');
            console.log(error);
            window.scrollTo(0, 0);
        }
    }
    
   

    return(
        <>
            <Box mb={6} >
            <ThemeProvider theme={darkTheme}>
                {successMessage && (
                    <Alert severity={alertStatus} sx={{ mb: 2 }}>{successMessage} </Alert>
                )}
            </ThemeProvider>
            <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <CardHeader
                avatar={<AccountBoxIcon />}
                title={
                    <Typography variant="h5" component="div">
                        User Profile
                    </Typography>}>
            </CardHeader>
            <CardContent>
            <Box component="form">
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <TextField
                        label="First Name"
                        variant="outlined"
                        name="first_name"
                        value={formUser.first_name}
                        onChange={handleUserProfileChange}
                        fullWidth
                        size="small"/>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                        label="Last Name"
                        variant="outlined"
                        name="last_name"
                        value={formUser.last_name}
                        onChange={handleUserProfileChange}
                        fullWidth
                        size="small"
                    />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={formUser.email}
                        fullWidth
                        size="small"
                        // InputProps={{
                        //     readOnly: true,
                        // }}
                    />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                        label="Contact Number"
                        variant="outlined"
                        name="phone"
                        value={formUser.phone}
                        onChange={handleUserProfileChange}
                        fullWidth
                        size="small"
                    />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' , mt: 2}}>
                <Button style={{ textTransform: 'none' }} type="submit" variant="contained" color="primary" onClick={handleUserProfileUpdate}>Update User Profile</Button>
            </Box>
            </CardContent>
            {/* <CardActions>
            <Button style={{ textTransform: 'none' }}  variant="contained"> Update User Profile</Button>
      </CardActions> */}
            </Card>
            
            </Box>
            <Box>
            <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
                <CardHeader
                    avatar={<BusinessIcon />}
                    title={
                        <Typography variant="h5" component="div">
                            Company Profile
                        </Typography>
                    }
                />
                <CardContent>
                    <Grid container spacing={2}>
                    <Grid item md={12}>
                            <TextField
                            label="Company Name"
                            variant="outlined"
                            name="name"
                            value={formCompany.name}
                            onChange={handleCompanyChange}
                            fullWidth
                            size="small"
                        />
                        </Grid>
                        <Grid item md={6}>
                        <InputLabel htmlFor="domain">Domain</InputLabel>
                            <Select name="domain" id="domain"
                            value={domains_data.find(option => option.value === formCompany.domain)}
                            onChange={handleDomainChange}
                            options={domains_data} 
                            styles={selectStyles}
                            isMulti
                            // error={!!errors.job_type}
                            />
                        </Grid>

                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' , mt: 2}}>
                        <Button style={{ textTransform: 'none' }} variant="contained" color="primary" onClick={handleCompanyUpdate}>Update Company Profile</Button>
                    </Box>
                </CardContent>
                </Card>
            </Box>
            <Box>
            <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
                <CardHeader
                    avatar={<PlaceIcon />}
                    title={
                        <Typography variant="h5" component="div">
                            Company Location
                        </Typography>
                    }
                />
                <CardContent>
                    <Box>
                    <StateCitySelectInput 
                        // inputState={22}  
                        onStateChange={handleLocationChange}
                        onCityChange={handleLocationChange} mb={2} state_field_name="state" city_field_name="city"/>
                    </Box>
                    <Grid container spacing={2}>
                    
                        {/* <Grid item md={6}>
                            <InputLabel htmlFor="state">State</InputLabel>
                                <Select name="state" id="state"
                                value={states_data.find(option => option.value === formLocation.state)}
                                onChange={handleLocationChange}
                                options={states_data} 
                                styles={selectStyles}
                                // error={!!errors.job_type}
                                />
                        </Grid>
                        <Grid item md={6}>
                            <InputLabel htmlFor="city">City</InputLabel>
                                <Select name="city" id="city"
                                value={cities_data.find(option => option.value === formLocation.city)}
                                onChange={handleLocationChange}
                                options={cities_data} 
                                styles={selectStyles}
                                // error={!!errors.job_type}
                                />
                        </Grid> */}
                        <Grid item md={6}>
                            <InputLabel>Pincode</InputLabel>
                            <TextField
                                // label="Company Name"
                                variant="outlined"
                                name="pincode"
                                value={formLocation.pincode}
                                onChange={handleAddressChange}
                                fullWidth
                                size="small"
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                name="address"
                                value={formLocation.address}
                                onChange={handleAddressChange}
                                fullWidth
                                multiline
                                rows={4} // Number of rows for the textarea
                            />
                        </Grid>
                        
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' , mt: 2}}>
                            <Button style={{ textTransform: 'none' }} type="submit" variant="contained" color="primary" onClick={handleLocationUpdate}>Update Company Address</Button>
                        </Box>
                </CardContent>
                </Card>
            </Box>

            <Box>
            <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <CardHeader
                avatar={<LockResetIcon />}
                title={
                    <Typography variant="h5" component="div">
                        Reset Password
                    </Typography>
                }
            />
            <CardContent>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& > *': {
                            mb: 2, // margin-bottom
                        },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Old Password"
                                type="password"
                                variant="outlined"
                                name="current_password"
                                value={formPassword.current_password}
                                onChange={handlePasswordChange}
                                fullWidth
                                size="small"
                                error={!!errors.current_password}
                                helperText={errors.current_password && errors.current_password.join(' ')}
                            />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="New Password"
                                type="password"
                                variant="outlined"
                                name="new_password"
                                value={formPassword.new_password}
                                onChange={handlePasswordChange}
                                fullWidth
                                size="small"
                                error={!!errors.new_password}
                                helperText={errors.new_password && errors.new_password.join(' ')}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Re-enter New Password"
                                type="password"
                                variant="outlined"
                                name="retype_new_password"
                                value={formPassword.retype_new_password}
                                onChange={handlePasswordChange}
                                fullWidth
                                size="small"
                                error={!!errors.retype_new_password}
                                helperText={errors.retype_new_password && errors.retype_new_password.join(' ')}
                                
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' , mt: 2}}>
                            <Button style={{ textTransform: 'none' }} variant="contained" color="primary" onClick={handleUserPasswordReset}>Reset Password</Button>
                        </Box>
                </Box>
            </CardContent>
        </Card>
            </Box>
        </>
    )
}

export default CompanyUserProfile;


export async function loader(){
    
    try {
        const endpoint = `${process.env.REACT_APP_API_LINK}api/profile/company/`;
        const response = await api.get(endpoint);
        const initialFormData = response.data;
        console.log("initialFormData");
        console.log(initialFormData);
        return defer({ initialFormData });
    } catch (error) {
        console.error('Error fetching data from EmployerDashboard Loader', error);
        throw error;
    }
}