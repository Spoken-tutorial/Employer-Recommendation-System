import React, {useEffect, useState} from "react";
import { Button, Form, Row, Col, OverlayTrigger, Tooltip, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;
const empty_options = []
    const degree = [
        { value: 'btech', label: 'B.Tech' },
        { value: 'mtech', label: 'M.Tech' },
        { value: 'phd', label: 'PhD' },
    ]
    const discipline = [
        { value: 'computer science', label: 'Computer Science' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'mechanical', label: 'Mechanical' },
    ]
    const years = [
        
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        
    ]

    
const JobForm = ({domains, states, jobtypes, fosses, skills, cities, degrees, disciplines, formData, handleFormData, handleSelectedOptions, handleCKEditorData}) => {


    const [maxSalary, setMaxSalary] = useState(0);
    const [minSalary, setMinSalary] = useState(0);
    const [salaryError, setSalaryError] = useState(null);
    const [mandatoryFoss, setMandatoryFoss] = useState([]);
    const [optionalFoss, setOptionalFoss] = useState([]);
    const [years, setYears] = useState([]);
    const [jobCities, setJobCities] = useState([]);
    const [selectedCompanyStates, setSelectedCompanyStates] = useState([]);
    const [selectedJobCities, setSelectedJobCities] = useState([]);
    

    const handleMaxSalaryChange = (event) => {
        // console.log('setting max salary')
        const value = parseInt(event.target.value, 10) // Parse the string as a base-10 integer
        const min_salary = parseInt(minSalary, 10)
        setMaxSalary(value);
        // console.log('value', value, typeof value)
        // console.log('min_salary', min_salary, typeof min_salary)
        
        // setSalaryError(value < minSalary)
        if(value < min_salary){
            setSalaryError(true);
        }else{
            setSalaryError(false);
        }
        handleFormData(event);
    }
    const handleMinSalaryChange = (event) => {
        // console.log('setting min salary')
        const value = parseInt(event.target.value, 10) // Parse the string as a base-10 integer
        const max_salary = parseInt(maxSalary, 10)
        setMinSalary(value);
        // setSalaryError(value > max_salary)
        if(value > max_salary){
            setSalaryError(true);
        }else{
            setSalaryError(false);
        }
        handleFormData(event);
    }

    const handleCompanyStateChange = (selectedOptions) => {

        // console.log('selectedOptions', selectedOptions)
        setSelectedCompanyStates(selectedOptions)
        handleSelectedOptions(selectedOptions, 'job_state')
    }

    const handleCompanyCityChange = (selectedOptions) => {

        // console.log('selectedOptions', selectedOptions)
        // setJobCities(selectedOptions)
        setSelectedJobCities(selectedOptions)
        handleSelectedOptions(selectedOptions, 'job_city')
        
    }

 
    const handleCitiesOnOpen = async () => {
        try {
            const url = `${baseUrl}/api/utils/cities/?states[]=${selectedCompanyStates.map(state => state.value).join('&states[]=')}`
            // console.log('url ************', url)
            const response = await axios.get(url);
            // console.log('response', response)
            setJobCities(response.data.cities.map(city => ({'label': city.name, 'value': city.id })));
        } catch (error) {
            
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // console.log('form submitted')
        // console.log('formData', formData)
    }
    useEffect(() => {
        // document.title = "Job Form";
        // console.log('useEffect of JobForm')
        // console.log('cities ****', )
        // console.log(cities)
        // console.log('fosses', fosses)
        setMandatoryFoss(fosses)
        setOptionalFoss(fosses)
        const current_year = new Date().getUTCFullYear()
        const graduating_years = [current_year-1, current_year, current_year+1]
        setYears(graduating_years.map(year => ({'label': year, 'value': year })));
        // setJobCities(cities)
    }, []);

    return (
        <>
            <div>
                <div className="mb-2" >
                    <Row>
                        
                        <Col xs='6'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Designation (Job Position)*</Form.Label>
                                <Form.Control type="text" placeholder="Enter job title" value={formData.job_title} name="job_title" onChange={handleFormData}/>
                            </Form.Group>
                        </Col>
                        <Col xs='6'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Job Sector</Form.Label>
                                <Select options={domains} isMulti value={formData.job_sector} name="job_sector" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'job_sector')}/>
                            </Form.Group>
                        </Col>
                        
                        <Col xs='6'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>State</Form.Label>
                                <Select options={states} isMulti value={selectedCompanyStates}
                                name="job_state" onChange={(selectedOptions) => handleCompanyStateChange(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                        <Col xs='6'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>City</Form.Label>
                                <Select options={jobCities} isMulti onMenuOpen={handleCitiesOnOpen}  value={selectedJobCities}
                                name="job_city" onChange={(selectedOptions) => handleCompanyCityChange(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                        
                        <Col xs='12'>
                            <Form.Group className="mb-3" controlId="formCompany">
                            <Form.Label>Job Type</Form.Label>
                            <div>
                            <ToggleButtonGroup type="radio"  name="job_type">
                                {
                                    jobtypes.map((jobtype, index) => (
                                        <ToggleButton key={jobtype.id} id={`tbg-btn-${jobtype.id}`} value={jobtype.id} name="job_type" variant="outline-secondary" onClick={handleFormData}>
                                            {jobtype.jobtype}
                                        </ToggleButton>
                                    ))
                                }
                                </ToggleButtonGroup>
                            </div>
                         
                            
                            </Form.Group>
                        </Col>
                        <Col xs='3'>
                            <Form.Group className="mb-3" controlId="formCompany">
                            <Form.Label>Annual Salary (Minimum)</Form.Label>
                                <Form.Control type="number" placeholder=""  
                                value={formData.job_minsalary} name="job_minsalary" onChange={handleMinSalaryChange}/>
                            </Form.Group>
                        </Col>
                        <Col xs='3'>
                            <Form.Group className="mb-3" controlId="formCompany">
                            <Form.Label>Annual Salary (Maximum)</Form.Label>
                                <Form.Control type="number" placeholder="" 
                                value={formData.job_maxsalary} name="job_maxsalary" onChange={handleMaxSalaryChange}/>
                            </Form.Group>
                        </Col>
                        <Col xs='12'>
                            {salaryError === true && <p className="text-danger">Maximum salary should be greater than minimum salary</p>}
                        </Col>

                       
                        <p>Skill requirements</p><hr/>
                        
                        <Col xs='6'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Mandatory Technology / Programming Languages : </Form.Label>
                                <Select options={fosses} isMulti name="mandatory_skills" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'mandatory_skills')}/>
                            </Form.Group>
                        </Col>
                        <Col xs='6'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Optional Technology / Programming Languages : </Form.Label>
                                <Form.Text muted>(Good to have)</Form.Text>
                                <Select options={fosses} isMulti
                                name="optional_skills" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'optional_skills')}/>
                            </Form.Group>
                        </Col>
                        <Col xs='12'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Skills : </Form.Label>
                                <Select options={skills} isMulti
                                name="skills" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'skills')}/>
                            </Form.Group>
                        </Col>
                        <p>Filter students based on location : </p>
                        <Col xs='6'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>State</Form.Label>
                                <Select options={states} isMulti
                                name="student_states" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'student_states')}/>
                            </Form.Group>
                        </Col>
                        <Col xs='6'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>City</Form.Label>
                                <Select options={cities} isMulti
                                name="student_cities" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'student_cities')}/>
                            </Form.Group>
                        </Col>
                        <Col xs='4'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Degree</Form.Label>
                                <Select options={degrees} isMulti
                                name="degrees" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'degrees')}/>
                            </Form.Group>
                        </Col>
                        <Col xs='4'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Discipline</Form.Label>
                                <Select options={disciplines} isMulti
                                name="disciplines" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'disciplines')}/>
                            </Form.Group>
                        </Col>
                        <Col xs='4'>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Graduating year of students :</Form.Label>
                                <Select options={years} isMulti
                                name="years" onChange={(selectedOptions) => handleSelectedOptions(selectedOptions, 'years')}/>
                            </Form.Group>
                        </Col>
                        <Col xs='12'>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Job Description</Form.Label>
                            <CKEditor value={formData.job_description} name="job_description" 
                            editor={ ClassicEditor }
                            data=""
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                // const data = editor.getData();
                                // const d = {...formData, 'job_description': data};
                                console.log('editor.getData()', editor.getData())
                                console.log('event', event)
                                handleCKEditorData('job_description', editor.getData())
                                // handleFormData(event)
                                // console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Job Responsibilities</Form.Label>
                            <CKEditor value={formData.job_responsibilities} name="job_responsibilities" 
                            editor={ ClassicEditor }
                            data=""
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                // const data = editor.getData();
                                // const d = {...formData, 'job_description': data};
                                console.log('editor.getData()', editor.getData())
                                console.log('event', event)
                                handleCKEditorData('job_responsibilities', editor.getData())
                                // handleFormData(event)
                                // console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Additional Skills Required</Form.Label>
                            <CKEditor value={formData.job_skills} name="job_skills" 
                            editor={ ClassicEditor }
                            data=""
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                // const data = editor.getData();
                                // const d = {...formData, 'job_description': data};
                                console.log('editor.getData()', editor.getData())
                                console.log('event', event)
                                handleCKEditorData('job_skills', editor.getData())
                                // handleFormData(event)
                                // console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                            </Form.Group>
                        
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    ) 
}

export default JobForm;