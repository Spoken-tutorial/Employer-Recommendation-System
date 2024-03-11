/* eslint-disable no-undef */

//to get job list
export async function getJobsByUserId(userId) {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_LINK +
        `/api/jobs/?format=json&user_id=${userId}`
    );
    if (!response.ok) {
      throw { message: "Failed to fetch jobs", status: response.status };
    }
    const jobsData = await response.json();
    return jobsData;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
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
