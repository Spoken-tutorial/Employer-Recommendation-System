/* eslint-disable react/prop-types */
import * as React from "react";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import EditJobDetails from "./EditJobDetails";
import Avatar from "@mui/material/Avatar";
import {
  Link,
  defer,
  useLoaderData,
  Await,
  // useLocation,
} from "react-router-dom";
import { getJobFormInitialData } from "../../../../utils/api/company/jobs";
import { Suspense } from "react";
import Spinner from "../../../common/Spinner";
import api from "../../../../utils/auth/axiosInstance";
import { Button, Toolbar } from "@mui/material";
import AppBar from "@mui/material";
import Toolbar from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditJobDialog() {
  const { initialFormData } = useLoaderData();
  console.log("initialFormData")
  console.log(initialFormData)
  const [jobDetails, setJobDetails] = useState({});
  console.log("jobDetails")
  console.log(jobDetails)
  const handleUpdateJob = async (event) => {
    event.preventDefault();
    try {
      console.log("jobDetails")
      console.log(jobDetails)
      const response = await api.patch(`/api/jobs/${jobDetails.id}`, jobDetails);
      console.log('Update successful', response.data);
    } catch (error) {
      console.error('Error updating job', error);
    }
  }
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        disableEscapeKeyDown={true}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#002648" }}>
          <Box sx={{ display: "flex", height: "4rem" }}>
            <Avatar
              sx={{
                backgroundColor: "#ffffff",
                mt: "0.7rem",
                ml: "1rem",
              }}
              alt="IIT Bombay"
              src="https://jrs.spoken-tutorial.org/static/images/st-logo.png"
            />
            <Typography
              sx={{
                ml: 1.5,
                flex: 1,
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                  md: "1.1rem",
                  lg: "1.3rem",
                },
                letterSpacing: "0.05rem",
                fontWeight: "bold",
                mt: "1.2rem",
              }}
              variant="h6"
              component="div"
            >
              Spoken Tutorial JRS
            </Typography>

            {/* cancel button */}
            {/* <Link to="/auth/employer/jobs" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  mt: "1.3rem",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                Cancel
              </Typography>
            </Link> */}
            <Button component={Link}  to="/auth/employer/jobs" variant="contained" sx={{backgroundColor: "grey", mr: 1.5, mt: 1.5, mb: 1.5}} >Cancel</Button>
            {/* add button */}
            {/* <Link to="/auth/employer/jobs" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  mt: "1.3rem",
                  color: "#ffffff",
                  textDecoration: "none",
                  ml: "1rem",
                  mr: "1rem",
                }}
              >
                Update
              </Typography>
            </Link> */}
            <Button variant="contained" color="success" sx={{ mr: 1.5,mt: 1.5, mb: 1.5 }} onClick={handleUpdateJob}>Update Job</Button>
          </Box>
        </AppBar>

        {/* content of dailog */}
        <Suspense
          fallback={
            <Box
              sx={{
                height: "100vh",
              }}
            >
              <Spinner></Spinner>
            </Box>
          }
        >
          <Await resolve={initialFormData}>
            {(data) => (
              
              <>
                <EditJobDetails
                  skills={data.initial_data.skills}
                  domains={data.initial_data.domains}
                  states={data.initial_data.states}
                  jobTypes={data.initial_data.job_types}
                  disciplines={data.initial_data.disciplines}
                  degrees={data.initial_data.degrees}
                  graduationYears={data.initial_data.graduation_years}
                  foss={data.initial_data.foss}
                  data={data.job}
                  handleUpdateJob={handleUpdateJob}
                  jobDetails={jobDetails}
                  setJobDetails={setJobDetails}
                ></EditJobDetails>
                
              </>
            )}
          </Await>
        </Suspense>
      </Dialog>
    </React.Fragment>
  );
}
export function loader({ params }) {
  console.log("params")
  console.log(params)
  return defer({ initialFormData: getJobFormInitialData(params.job_id) });
}
