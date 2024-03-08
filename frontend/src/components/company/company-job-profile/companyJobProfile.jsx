/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import JobListTable from "./jobListTable";
import { Link, defer, useLoaderData, Await } from "react-router-dom";
import { getJobsByUserId } from "../../../utils/api/company/jobs";
import { jwtDecode } from "jwt-decode";
import { Suspense } from "react";
import Spinner from "../../common/Spinner";

function CompanyJobProfile() {
  const { jobListData } = useLoaderData();

  return (
    <>
      <Box sx={{ marginTop: "2rem", p: "1rem", marginBottom: "6rem" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
          }}
        >
          Job List
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
          }}
        ></Divider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ mt: "2rem", color: "#73726f", ml: "0rem", mb: "0.5rem" }}
            >
              A list of all the jobs posted by your company including their
              designation, status, creation date and action.
            </Typography>
            {/* add new job action button */}
            <Link to="addNewJob" style={{ textDecoration: "none" }}>
              New Job +
            </Link>
          </Box>
        </Box>
        {/* data grid */}
        <Suspense
          fallback={
            <Box sx={{ height: "100vh" }}>
              <Spinner></Spinner>
            </Box>
          }
        >
          <Await resolve={jobListData}>
            {(data) => (
              <>
                <JobListTable jobList={data} />
              </>
            )}
          </Await>
        </Suspense>
      </Box>
    </>
  );
}

export default CompanyJobProfile;
export function loader() {
  const token = localStorage.getItem("access");
  const decodedInfo = jwtDecode(token);
  return defer({ jobListData: getJobsByUserId(decodedInfo.user_id) });
}
