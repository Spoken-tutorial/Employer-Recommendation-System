/* eslint-disable no-undef */

//to get job list
export async function getJobList(token) {
  try {
    const url = process.env.REACT_APP_API_LINK + "/api/company/manager/jobs/";

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      return { message: response.detail, status: response.status };

    }
    const jobsData = await response.json();
    return jobsData;
  } catch (error) {
    return { message: "Error fetching jobs:", error };
  }
}

//to get initial job form data
export async function getJobFormInitialData() {
  const response = await fetch(
    process.env.REACT_APP_API_LINK + "/api/job-data/?format=json"
  );
  if (!response.ok) {
    throw { message: "Failed to fetch homepage", status: 500 };
  }
  const jsonData = await response.json();
  return jsonData;
}
