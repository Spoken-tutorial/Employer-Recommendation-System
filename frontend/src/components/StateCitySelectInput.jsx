import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { InputLabel } from "@mui/material";
import PropTypes from 'prop-types';
import api from "../utils/auth/axiosInstance";
import {Grid,} from '@mui/material';
// import zIndex from "@mui/material/styles/zIndex";

const StateCitySelectInput = ({inputState, inputCity, onStateChange, onCityChange, state_field_name="state_job",city_field_name="city_job", gridsize=4}) => {
    const [ states, setStates ] = useState([]);
    const [ cities, setCities ] = useState([]);
    const [ selectedState, setSelectedState ] = useState(inputState);
    const [ selectedCity, setSelectedCity ] = useState(inputCity);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    const customStyles = {
        menu: (provided) => (
            {
                ...provided,
                zIndex: 4000,
            }
        )
    }

    const handleStateChange = (selectedOption, { name }) => {
        setSelectedState(selectedOption.value);
        if(onStateChange){
            onStateChange(selectedOption, { name });
        }
    }

    const handleCityChange = (selectedOption, { name }) => {
        setSelectedCity(selectedOption.value);
        if(onCityChange){
            // console.log("onCityChange present");
            onCityChange(selectedOption, { name });
        }
    }
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect(() => {
        
        // Fetch states from the API when the component mounts
        const fetchStates = async () => {
            setLoadingStates(true);
            await sleep(1000); // Simulate delay
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
            } finally {
                setLoadingStates(false);
            }
        
        }
        fetchStates();
    }, [])

    useEffect(() => {
        const fetchCities = async () => {
          if (selectedState) {
            setLoadingCities(true);
            try {
            //   const endpoint = `${process.env.REACT_APP_API_LINK}api/cities/${selectedState}/cities`;
              const endpoint = `${process.env.REACT_APP_API_LINK}api/states/${selectedState}/cities`;
              console.log("endpoint is : ", endpoint);
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
          }
        };
        fetchCities();
      }, [selectedState]); // Dependency array includes props.state to refetch cities when state changes

    return(
        <>
            <Grid container spacing={2}>
              <Grid item md={gridsize}>
                <InputLabel>State</InputLabel>
                <Select options={states} name={state_field_name} onChange={handleStateChange} 
                value={states.find(option => option.value === selectedState)  || null}
                styles={customStyles}
                isLoading={loadingStates}/>
              </Grid>

              <Grid item md={gridsize}>
                <InputLabel>City</InputLabel>
                <Select options={cities} name={city_field_name} onChange={handleCityChange} 
                value={cities.find(option => option.value === selectedCity)  || null}
                styles={customStyles}
                isLoading={loadingCities}/>
              </Grid>
            </Grid>
            
        </>
    )
}

StateCitySelectInput.propTypes = {
    inputState: PropTypes.number,
    inputCity: PropTypes.number,
    state_field_name: PropTypes.string,
    onStateChange: PropTypes.func,
    city_field_name: PropTypes.string,
    onCityChange: PropTypes.func,
    gridsize: PropTypes.number
};
export default StateCitySelectInput;