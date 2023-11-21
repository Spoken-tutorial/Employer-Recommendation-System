import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import CompanyForm from "./CompanyForm";
import JobForm from "./JobForm";


const RegistrationStepper = ({domains, states, jobtypes, fosses, skills, cities, degrees, disciplines}) => {

    const [activeStep, setActiveStep] = React.useState(1);
    const [companyNameExists, setCompanyNameExists] = useState(false);
    const [formData, setFormData] = useState({
        company_name: '',
        firstname: '',
        lastname: '',
        phone: '',
        company_website: '',
        is_agency: false,
        email: '',
        password: '',
        otp: '',
        otp_verified: false,

        job_state: [],
        job_city: [],
        job_minsalary: '',
        job_maxsalary: '',
        mandatory_skills: [],
        optional_skills: [],
        skills: [],
        student_states: [],
        student_cities: [],
        degrees: [],
        disciplines: [],
        years: [],
        job_description: '',
        job_responsibilities:'',
        job_skills:'',
        
        // job_title: '',
        // job_sector: '',
        // job_type: '',
        
        // job_location: '',
        // job_country: '',
        
        // job_zipcode: '',
        
        // job_salary_type: '',
        // job_skills: '',
        // job_foss: '',
        // job_degree: '',
        // job_discipline: '',
        // job_experience: '',
        // job_remote: false,
        // job_agency: false,
        // job_agency_name: '',
        // job_agency_email: '',
        // job_agency_phone: '',
        // job_agency_website: '',
        // job_agency_address: '',
        // job_agency_city: '',
        // job_agency_state: '',
        // job_agency_country: '',
        // job_agency_zipcode: '',
        // job_agency_logo: '',
        // job_agency_description: '',
        // job_agency_facebook: '',
        // job_agency_linkedin: '',
        // job_agency_twitter: '',
        // job_agency_instagram: '',

        

    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        // const form = event.target;
        // console.log("*******")
        // console.log(form)
        // if(form.checkValidity()){
        //     console.log('form is valid')
        // }else{
        //     console.log('form is not valid')
        // }
        console.log("inside handle form submit")
        console.log(formData)
    }

    const handleSelectedOptions = (selectedOptions, controlName) => {
        // console.log("inside handle selected options")
        // console.log(selectedOptions)
        // console.log(controlName)
        
        const data = {...formData, [controlName]: selectedOptions};
        setFormData(data);
        // console.log(formData)
    }

    const handleFormData = (event) => {
        // console.log("inside handle formData")
        // console.log(event)
        // console.log(event.target.name, event.target.value)
        const {name, value} = event.target;
        const data = {...formData, [name]: value};
        setFormData(data);
    }

    const handleCKEditorData = (  name, textdata) => {
        
        const data = {...formData, [name]: textdata}
        setFormData(data)
    }

    useEffect(() => {
        if (activeStep === 2) {
            checkCompanyNameExists();
        }
    }, [activeStep]);

    const checkCompanyNameExists = async () => {
        try {
            // Replace with your actual backend API call to check the company name
            // const response = await fetch('your_backend_api_endpoint_here');
            // if (response.status === 200) {
                if(!true){
                setCompanyNameExists(true); // Company name exists
            } else {
                setCompanyNameExists(false); // Company name does not exist
            }
        } catch (error) {
            console.error('Error checking company name:', error);
            setCompanyNameExists(false);
        }
    };


    const handleNext = () => {
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // if(activeStep < 2){
        //     setActiveStep(activeStep + 1);
        // }
        if (activeStep === 1) {
            checkCompanyNameExists();
        }
        
        if (!companyNameExists && activeStep < 2) {
            setActiveStep(activeStep + 1);
        }
    }

    const handleBack = () => {
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if(activeStep > 1){
            setActiveStep(activeStep - 1);
        }
    }

    const renderStep = () => {
        switch(activeStep){
            case 1:
                return (
                    <Form onSubmit={handleFormSubmit}>
                    <CompanyForm formData={formData} handleFormData={handleFormData}/>
                    {/* <Button variant="primary" type="submit">Submit</Button> */}
                </Form>
                )
                
                
            case 2:
                if (companyNameExists) {
                    return (
                    <Form onSubmit={handleFormSubmit}>
                            <CompanyForm formData={formData} handleFormData={handleFormData}/>
                            {/* <Button variant="primary" type="submit">Submit</Button> */}
                    </Form>
                    )
                    
                }
                return (
                    <Form onSubmit={handleFormSubmit}>
                        <JobForm domains={domains} states={states} jobtypes={jobtypes} 
                        fosses={fosses} skills={skills} cities={cities} degrees={degrees} disciplines={disciplines}
                        formData={formData} handleFormData={handleFormData} handleFormSubmit={handleFormSubmit}
                        handleSelectedOptions = {handleSelectedOptions} handleCKEditorData={handleCKEditorData}/>
                        <Button variant="primary" type="submit" className="mb-2 ">Submit</Button><span className="mx-2">OR</span>
                        <Button variant="warning" type="submit" className="mb-2">Save Draft</Button>
                    </Form>
                )
                    
                
            default:
                return <CompanyForm />
        }
    }

    return (
        <>  
            <div className="container">
            {companyNameExists && <Alert variant="danger">Company name already exists in the database.</Alert>}
                <div className="step-container">
                    {
                        [1,2].map((step) => (
                            <div key={step} className={`step ${activeStep === step ? 'active' : ''}`} onClick={() => setActiveStep(step)}>
                                <div className="step-circle">{step}</div>
                                <div className="step-title ">
                                    <strong>
                                        {step === 1 && 'Company Details'}
                                        {step === 2 && 'Job Details'}
                                    </strong>
                                {/* <span className="step-circle1">{step}</span> */}
                                    
              
                                </div>
                            </div>
                            

                        ))
                    }
                </div>
                <div className="step-content">
                    {renderStep(activeStep)}
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={handleBack} disabled={activeStep === 1}>Back</button>
                    <button className="btn btn-primary" onClick={handleNext} disabled={activeStep === 2}>Next</button>
                </div>
            </div>
            
        </>
    ) 
}

export default RegistrationStepper;