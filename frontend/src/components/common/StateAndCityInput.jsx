/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import { state, citiesOfState } from "../../utils/stateCities";
// import { citiesOfState } from "../../utils/stateCities";
import api from "../../utils/auth/axiosInstance";

//props recieve state & city variables and their respective setVariables

function StateAndCityInput(props) {

  // alert(props);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(()=>{
    // Fetch states from the API when the component mounts
    const fetchStates = async () => {
      try {
        const endpoint = `${process.env.REACT_APP_API_LINK}api/states/`;
        const response = await api.get(endpoint); // Assuming you're using axios for HTTP requests
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
     
    }
    fetchStates();
  },[]);

  useEffect(() => {
    const fetchCities = async () => {
      if (props.state) {
        try {
          const endpoint = `${process.env.REACT_APP_API_LINK}api/states/${props.state}/cities`;
          const response = await api.get(endpoint); // Assuming you're using axios for HTTP requests
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    fetchCities();
  }, [props.state]); // Dependency array includes props.state to refetch cities when state changes

  const handleOfficeStateChange = (event) => {
    props.setState(event.target.value);
  };

  const handleOfficeCityChange = (event) => {
    props.setCity(event.target.value);
  };

  return (
    <>
      {/* state */}
      <FormControl
        variant="outlined"
        sx={{
          width: { xs: "auto", md: "24rem" },
          mr: { xs: 0, md: "3rem" },
          mb: { xs: "1.5rem", md: 0 },
        }}
        size="small"
      >
        <InputLabel id="officeState" sx={{ fontSize: "0.9rem" }}>
          State (Office)
        </InputLabel>
        <Select
          labelId="State (Office)"
          id="officeState"
          value={props.state || ""}
          onChange={handleOfficeStateChange}
          label="institute-type"
        >
          {states.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              sx={{ fontSize: "0.7rem" }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* city */}
      <FormControl
        variant="outlined"
        sx={{
          width: { xs: "auto", md: "24rem" },
        }}
        size="small"
      >
        <InputLabel id="officeLocation" sx={{ fontSize: "0.9rem" }}>
          City (Office)
        </InputLabel>
        <Select
          labelId="city (Office)"
          id="officeLocation"
          value={props.city || ""}
          disabled={props.state == "" ? true : false}
          onChange={handleOfficeCityChange}
          label="institute-type"
        >
          {props.state != ""
            ? cities.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  sx={{ fontSize: "0.7rem" }}
                >
                  {item.name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}

export default StateAndCityInput;
