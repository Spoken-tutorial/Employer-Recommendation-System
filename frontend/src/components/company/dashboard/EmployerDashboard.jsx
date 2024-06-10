import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import PendingActionsIcon from '@mui/icons-material/PendingActions'; 
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline'; 

import PendingIcon from '@mui/icons-material/Pending';
import DateRangeIcon from '@mui/icons-material/DateRange';

import { defer, useLoaderData } from 'react-router-dom';
// import api from "../../../api";
import api from "../../../utils/auth/axiosInstance";

function EmployerDashboard(){
    const { dashboardData } = useLoaderData();
    const { job_application_data, pending_job_status } = dashboardData;
    
    const jobs = [
        {
          title: 'Software Engineer',
          totalApplicants: 20,
          rejected: 5,
          selected: 3,
          pending: 12,
          lastSubmissionDate: '2024-05-20',
        },
        {
          title: 'Product Manager',
          totalApplicants: 15,
          rejected: 4,
          selected: 2,
          pending: 9,
          lastSubmissionDate: '2024-05-18',
        },
        {
          title: 'Data Scientist',
          totalApplicants: 25,
          rejected: 10,
          selected: 5,
          pending: 10,
          lastSubmissionDate: '2024-05-22',
        },
        // Add more job entries as needed
      ];
      console.log(jobs);
      return (
        <>
            <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 4}}>
            <Typography variant="h6" component="div" sx={{padding: 2}}>Pending Job Application Status</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Job ID</TableCell>
                        <TableCell align="left"><WorkIcon /> Job Title</TableCell>
                        <TableCell align="left"><PendingActionsIcon /> Status</TableCell>
                        <TableCell align="left"><DateRangeIcon /> Date Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        pending_job_status.map((job, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{job.id}</TableCell>
                                <TableCell align="left">{job.designation}</TableCell>
                                <TableCell align="left">{job.status}</TableCell>
                                <TableCell align="left">{job.date_created}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ marginTop: 2}}>
            <Typography variant="h6" component="div" sx={{padding: 2}}>Posted Job Application Overview</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Job ID</TableCell>
                        <TableCell align="left"><WorkIcon /> Job Title</TableCell>
                        <TableCell align="left"><PeopleIcon /> Total Applicants</TableCell>
                        <TableCell align="left"><PendingIcon /> Pending</TableCell>
                        <TableCell align="left"><DateRangeIcon /> Last Application Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        job_application_data.map((job, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{job.job_id}</TableCell>
                                <TableCell align="left">{job.designation}</TableCell>
                                <TableCell align="left">{job.total_students}</TableCell>
                                <TableCell align="left">{job.pending_students}</TableCell>
                                <TableCell align="left">{job.last_app_date}</TableCell>

                                
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </>
        

        
      );
}

export default EmployerDashboard;
// export async function loader(){
//     try {
//         const url = `api/dashboard/employer/`;
//         const token = localStorage.getItem('access');
//         if (!token) {
//             throw new Error('No access token found');
//         }
//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//         }
//     });
//         // const response = await api.get(url);
//         console.log("response");
//         console.log(response);
//         return defer({ dashboardData: response.data});
//     } catch (error) {
//         console.error('Failed to fetch job data 1', error);
//         throw new Error('Failed to fetch job data 1');
        
//     }
// }

export async function loader(){
    try {
        const endpoint = 'api/dashboard/employer/';
        const response = await api.get(endpoint);
        return defer({ dashboardData: response.data });
    } catch (error) {
        console.error('Error fetching data from EmployerDashboard Loader', error);
        throw error;
    }
}
