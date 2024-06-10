import React, { useEffect, useState } from "react";
// import JobData from "./JobData";
import Grid from '@mui/material/Grid';
import axios from 'axios';
import {Typography} from '@mui/material';
import Divider from "@mui/material/Divider";
import JobFair from "./jobfair";
import { RecommendedJobData, AppliedJobData } from './JobData';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SectionTitle from '../../common/sectionTitle';
import InfoIcon from '@mui/icons-material/Info';
import { indigo, orange } from "@mui/material/colors";
import { jwtDecode } from "jwt-decode";


// const jobs = [
//     { id: 1, title: "Software Engineer", company: "Google", description: "Develop cutting-edge software solutions.", lastDate: "2023-12-31" },
//     { id: 2, title: "Data Analyst", company: "Facebook", description: "Analyze data trends for business insights.", lastDate: "2023-12-15" },
// ]
function Dashboard(){
    
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const access = localStorage.getItem("access");
        const decoded = jwtDecode(access);
        const student_id = decoded.student_id;
        
        const fetchData = async () => {
            try {
                const url = `${process.env.REACT_APP_API_LINK }api/dashboard/student/${student_id}`;
                const response = await axios.get(url);
                const recommended_jobs = response.data.recommeded_jobs
                const applied_jobs = response.data.applied_jobs
                const events = response.data.events
                
                setAppliedJobs(applied_jobs.map(item => ({
                    ...item.job_detail,
                    app_status: item.app_status,
                    applied_on_date: item.applied_on_date
                    })))
                setRecommendedJobs(recommended_jobs)
                setEventsData(events.map(item => ({
                    ...item.event,
                    
                    type: item.type,
                    formatted_student_last_registration: item.formatted_student_last_registration
                
                })))
              console.log("appliedJobs")        
              console.log(appliedJobs)  
              console.log("recommendedJobs")  
              console.log(recommendedJobs)  
              console.log("events")  
              console.log(eventsData)  
                
            } catch (error) {
                console.log("There is an error")
            }
        }
        fetchData();
    }, []);

    return (
        
        <>
            <SectionTitle icon={<BookmarkBorderIcon sx={{ color: orange[900] }}/>}
             title={<span style={{ color: indigo[900] }}>Recommended Jobs</span>} 
             link="https://mui.com/material-ui/react-divider/#flex-item"/>
            {/* <Typography variant="h5" gutterBottom><BookmarkBorderIcon/> Recommended Jobs </Typography> */}
            
            {recommendedJobs.length > 0 ? <Grid container spacing={2} sx={{ marginBottom : 2 }}>
                {
                    recommendedJobs.map(job => (
                        <Grid item xs={12} sm={6} md={4} key={job.id}>
                            <RecommendedJobData job={job} />
                        </Grid>
                    ))
                }

            </Grid> : 
            <>
                <Typography variant="body1" color="text.secondary" sx={{ margin: 2 }}>
                    <InfoIcon />No data available
                </Typography>
                <Divider sx={{ backgroundColor: "#000000", mb: 5 }}/>
            </>
            

            }
            {/* <Typography variant="h5" gutterBottom><BeenhereIcon /> Applied Jobs </Typography> */}
            <SectionTitle icon={<BeenhereIcon sx={{ color: orange[900] }}/>} 
            title={<span style={{ color: indigo[900] }}>Applied Jobs</span>} 
            link="https://mui.com/material-ui/react-divider/#flex-item"/>
             {/* <Divider sx={{ backgroundColor: "#000000", mb: "0.2 rem" }}/> */}
             {appliedJobs.length > 0 ?
                <>
                        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            
            {
                appliedJobs.map(job => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <AppliedJobData job={job} type="applied"/>
                    </Grid>
                ))
            }

        </Grid> 
        <Divider sx={{ backgroundColor: "#000000", mb: 5 }}/>
                </>
            :
                <Typography variant="body1" color="text.secondary">
                <InfoIcon />No data available
            </Typography>

             }
            
            {/* <Typography variant="h5" gutterBottom> Upcoming Events </Typography> */}
            {eventsData.length > 0 && 
                <>
                <SectionTitle icon={<BeenhereIcon/>} title="Upcoming Events" link="https://mui.com/material-ui/react-divider/#flex-item"/>
                {/* <Divider sx={{ backgroundColor: "#000000", mb: "0.2 rem" }}/> */}
                 <Grid container spacing={2} >
                    {
                        eventsData.map(jobfair => (
                            
                            <Grid item xs={12} key={jobfair.id}>
                                <JobFair jobfair={jobfair}/>
                            </Grid>
                        ))
                    }
    
                </Grid> 
                </>
            }
        </>
    );
}

export default Dashboard    