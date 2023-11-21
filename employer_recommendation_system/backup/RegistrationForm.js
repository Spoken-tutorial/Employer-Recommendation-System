import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import RegistrationStepper from "../components/RegistrationStepper";
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

const RegistrationForm = () => {

    const [domains, setDomains] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [jobtypes, setJobtypes] = React.useState([]);
    const [fosses, setFosses] = React.useState([]);
    const [skills, setSkills] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [degrees, setDegrees] = React.useState([]);
    const [disciplines, setDisciplines] = React.useState([]);

    const fetchData = async () => {
        const url  = `${baseUrl}/accounts/api/registration/data/`
        // console.log('url', url)
        try {
            const response = await axios.get(url);
            
            // console.log('response', response)
            // console.log('response.data', response.data)
            // console.log('response.data.domains', response.data.domains)
            setDomains(response.data.domains.map(domain => ({'label': domain.name, 'value': domain.id })));
            setStates(response.data.states.map(state => ({'label': state.name, 'value': state.id })));
            setCities(response.data.cities.map(city => ({'label': city.name, 'value': city.id })));
            setJobtypes(response.data.jobtypes);
            // console.log(response.data)
            setFosses(response.data.fosses.map(foss => ({'label': foss.foss__foss, 'value': foss.foss__id })));
            // console.log('response.data.fosses', fosses)
            setSkills(response.data.skills.map(skill => ({'label': skill.name, 'value': skill.id })));
            setDegrees(response.data.degrees.map(degree => ({'label': degree.name, 'value': degree.id })));
            setDisciplines(response.data.disciplines.map(discipline => ({'label': discipline.name, 'value': discipline.id })));

        } catch (error) {
            console.log('error in fetching data', error)
        }
    }
    useEffect(() => {
        document.title = "Registration Form";
        fetchData();
        
    }, []);
    return (
        <>
            <div>
                <RegistrationStepper domains={domains} states={states} jobtypes={jobtypes} 
                                    fosses={fosses} skills={skills} cities={cities} degrees={degrees} disciplines={disciplines}/>
                
            </div>
        </>
    ) 
}

export default RegistrationForm;