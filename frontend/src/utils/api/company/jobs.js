/* eslint-disable no-undef */

import api from "../../auth/axiosInstance";
// import { defer } from "react-router-dom";

//to get job list
export async function getJobsByUserId(token) {
  const headers = {
    'Authorization' : 'Bearer ' + token,
    'Content-Type': 'application/json',
  }
  try {
    const options = {
      method: 'GET',
      headers: headers
    }
    const apiUrl = `${process.env.REACT_APP_API_LINK}/api/company/manager/jobs`
    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      throw { message: "Failed to fetchs jobs", status: response.status };
    }
    const jobsData = await response.json();
    console.log(jobsData);
    return jobsData;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

//to get initial job form data
export async function getJobFormInitialData(job_id) {
  const endpoint = `${process.env.REACT_APP_API_LINK}api/job-data/${job_id}`;
  const response = await api.get(endpoint);
  console.log("response.data");
  console.log(response.data);
  return response.data;
  
  // return defer({ dashboardData: response.data });
}
