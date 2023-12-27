/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import JobListTable from "./jobListTable";
function CompanyJobProfile() {
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
            <Button
              size="small"
              variant="text"
              sx={{
                mt: { xs: "0.8rem", sm: "1rem", md: "0.2rem" },
                height: "1.5rem",
              }}
            >
              New Job +
            </Button>
          </Box>
        </Box>
        {/* data grid */}
        <JobListTable />
      </Box>
    </>
  );
}

export default CompanyJobProfile;
