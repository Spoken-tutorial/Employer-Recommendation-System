import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types'; // Import PropTypes
import DateRangeIcon from '@mui/icons-material/DateRange';
import TodayIcon from '@mui/icons-material/Today';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import WorkIcon from '@mui/icons-material/Work';

function JobFair({jobfair}){

    return (
        <> 
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                     <WorkIcon /> {jobfair.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <DateRangeIcon/> Event Date : {jobfair.formatted_start_date} - {jobfair.formatted_end_date}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <TodayIcon/> Registration Date : {jobfair.formatted_student_last_registration}
                    <br />
                    </Typography>
                    <Typography variant="body1">
                    <div dangerouslySetInnerHTML={{ __html: jobfair.description }} />
                    <br />
                    </Typography>
                    
                </CardContent>
                <CardActions>
                    <Button size="small">View Details</Button>
                </CardActions>
            </Card>
        </>
    )
}

JobFair.propTypes = {
    jobfair: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        formatted_start_date: PropTypes.string,
        formatted_end_date: PropTypes.string,
        formatted_student_last_registration: PropTypes.string,

    })
};
export default JobFair;