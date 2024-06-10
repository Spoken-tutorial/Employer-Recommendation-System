import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types'; // Import PropTypes
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
// import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { orange } from "@mui/material/colors";
// import WorkIcon from '@material-ui/icons/Work';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function RecommendedJobData({job}){

    const [responseStatus, setResponseStatus] = useState(null);

    const handleClick = () => {
        const url = "http://127.0.0.1:8000/api/apply-job";
        const data = {
            student_id: 4,
            job_id: job.id
        }
        axios.post(url, data)
        .then(response => {
            console.log("Success");
            console.log(response);
            setResponseStatus('success');
            
        })
        .catch(error => {
            console.log("error");
            console.log(error);
            setResponseStatus('error');
        });
    };
    return (
        <>
            <Card sx={{ maxWidth: 345, m: 2, p:1 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {job.designation}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {job.description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <EditCalendarIcon /> Apply by: {job.formatted_last_app_date}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <WorkOutlineIcon/> Job Type : {job.job_type}
                    </Typography>
                </CardContent>
                <CardActions>
                    {responseStatus === 'success' && (
                        <Button startIcon={<CheckIcon/>} variant="outlined" color="success" >
                        Applied successfully
                    </Button>
                    )}
                    {responseStatus === 'error' && (
                        <Button variant="outlined" color="success" >
                        Error in application
                    </Button>
                    )}
                    {responseStatus === null && (
                        <Button variant="contained" color="success" onClick={handleClick}>
                        Apply   
                    </Button>
                    )
                        
                    }
                    
                </CardActions>
            </Card>
        </>
    )
}
function AppliedJobData({job}){
    return (
        <>
            <Card sx={{ maxWidth: 345, m: 2, p:1 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {job.designation}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {job.description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <WorkOutlineIcon sx={{ color: orange[500] }}/> Job Type : {job.job_type}
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary">
                        Status : {job.app_status}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Applied On : {job.applied_on_date}
                    </Typography> 
                </CardContent>
            </Card>
        </>
    )
    
}
RecommendedJobData.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.number.isRequired,
        designation: PropTypes.string.isRequired,
        company: PropTypes.string,
        description: PropTypes.string.isRequired,
        formatted_last_app_date: PropTypes.string.isRequired,
        job_type: PropTypes.string,
    }).isRequired,
};


AppliedJobData.propTypes = {
    job: PropTypes.shape({
        designation: PropTypes.string.isRequired,
        company: PropTypes.string,
        description: PropTypes.string.isRequired,
        job_type: PropTypes.string,
        app_status: PropTypes.string,
        applied_on_date: PropTypes.string,
    }).isRequired,
};
export { RecommendedJobData, AppliedJobData };