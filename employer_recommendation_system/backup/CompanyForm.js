import React, {useState, useEffect, useRef } from "react";
import { Button, Form, Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
const CompanyForm = ({formData, handleFormData}) => {

    useEffect(() => {
        // document.title = "Company Form";
    }, []);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [otpStatus, setOTPStatus] = useState(null);

    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isSiteValid, setIsSiteValid] = useState(true);

    const phoneRef = useRef(null);

    
    const handleCompanyForm = () => {
        phoneRef.current.isInvalid ? setIsPhoneValid(false) : setIsPhoneValid(true)
    }

    const handlePasswordChange = (e) => { setPassword(e.target.value); }
    const handleConfirmPasswordChange = (e) => {
        // setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password)
        handleFormData(e);
    }

    const [selectedRadioOption, setSelectedRadioOption] = useState('');
    const [showOTPField, setShowOTPField] = useState(false);
    const handleOptionChange = (e) => {
        setSelectedRadioOption(e.target.value);
        handleFormData(e);
    }
    const handleOTP = async () => {
        setShowOTPField(true);
        try {
            const response = await fetch('http://localhost:5000/api/v1/otp', {});
            if (response.status === 200) {
                setOTPStatus(true);
                // console.log('OTP sent successfully');
            } else {
                setOTPStatus(false);
                // console.error('Error sending OTP');
            }
        } catch (error) {
                setOTPStatus(false);
        }
    }
    return (
        <>
            <div>
                
                <div>
                <Form.Group className="mb-3" controlId="formCompany">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your company name" value={formData.company_name} 
                    name="company_name" onChange={handleFormData} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Row>
                        <Col xs='12'>
                            <Form.Label>Account Manager Name</Form.Label>
                        </Col>
                        <Col xs='6'>
                            <Form.Control type="text" placeholder="Enter your first name" value={formData.firstname} name="firstname" onChange={handleFormData}/>
                        </Col>
                        <Col xs='6'>
                            <Form.Control type="text" placeholder="Enter your last name" value={formData.lastname} name="lastname" onChange={handleFormData}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Col xs='6'>
                    <Form.Group className="mb-6" controlId="phone">
                        <Form.Label>Phone </Form.Label>
                        <Form.Control type="tel" placeholder="" value={formData.phone} name="phone" 
                        onChange={handleFormData} pattern="[0-9]{10,}" inputMode="numeric" 
                        isInvalid={!isPhoneValid} ref={phoneRef}/>
                        <Form.Control.Feedback type="invalid">
                            Error Message
                    </Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col xs='6'>
                    <Form.Group className="mb-6" controlId="url">
                    <Form.Label>Company Website </Form.Label>
                    <Form.Control type="url" placeholder="" value={formData.company_website} 
                    name="company_website" onChange={handleFormData} isInvalid={!isSiteValid} />
                    <Form.Control.Feedback type="invalid">
                        Error Message
                    </Form.Control.Feedback>
                </Form.Group>
                        </Col>


                </Row>
                <Form.Group className="mb-3" controlId="accountType">
                    <Form.Label>You are from : </Form.Label>
                    <div style={{display: 'flex'}}>
                        
                    <Form.Check type="radio" label="From a Company" name='is_agency' value="false" onChange={handleOptionChange}/>
                     
                     <OverlayTrigger placement="top" className="flex"
                    overlay={<Tooltip>You are directly hiring for your above mentioned company</Tooltip>}>
                    <span className="ms-2"><FontAwesomeIcon icon={faCircleQuestion} /></span>
                    </OverlayTrigger>
                    </div>
                    <div style={{display: 'flex'}}>
                        
                    <Form.Check type="radio" label="From a recruitment agency" name='is_agency' value="true" onChange={handleOptionChange}/>
                     
                     <OverlayTrigger placement="top" className="flex"
                    overlay={<Tooltip >If your firm is hiring on behalf of another company</Tooltip>}>
                    <span className="ms-2"><FontAwesomeIcon icon={faCircleQuestion} /></span>
                    </OverlayTrigger>
                    </div>
                </Form.Group>
                
                {selectedRadioOption === 'agency' && 
                    <Form.Group className="mb-3" controlId="formForAgency">
                        <Form.Label>Company you are recruiting for</Form.Label>
                        <Form.Control type="text" placeholder="Enter the company name you are recruiting for" name="proxy_company"/>
                    </Form.Group>
                }
                
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="" value={formData.email} name="email" onChange={handleFormData}/>
                    <Form.Text muted>OTP will be sent to this email for verification. This email will be used for login.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                <Form.Label >Password</Form.Label>
                    <Form.Control
                        type="password" 
                        aria-describedby="passwordHelpBlock" onChange={handlePasswordChange}

                    />
                    <Form.Text muted>
                        Your password must be 8-20 characters long, contain letters, numbers & symbols
                    </Form.Text>    
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label >Confirm Password</Form.Label>
                    <Form.Control
                        type="password" name="password"
                        aria-describedby="passwordHelpBlock" onChange={handleConfirmPasswordChange}
                    />
                    
                   {!passwordsMatch ? <Form.Text className="text-danger">Passwords do not match</Form.Text> : ''}
                </Form.Group>
                
                </div>
                <Button variant="primary" className="mb-2" onClick={()=>handleOTP()}>Get OTP for Email Verification</Button>
                {showOTPField && 
                    <Form.Group className="mb-3" controlId="formForOTP">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control type="text" placeholder="Enter OTP received on your email" className="mb-2" name='otp' value={formData.otp} onChange={handleFormData}/>
                        {otpStatus === true && <Form.Text className="text-success">OTP sent successfully.</Form.Text>}
                        {otpStatus === false && <Form.Text className="text-success">Error in sending OTP to above email.</Form.Text>}
                        <Form.Text >Didn't receive OTP ? <Button variant="outline-secondary" size="sm">Resend OTP</Button></Form.Text>
                    </Form.Group>
                }
            </div>
        </>
    ) 
}

export default CompanyForm;