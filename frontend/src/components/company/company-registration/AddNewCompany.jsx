import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import CompanyDetails from "./CompanyDetail";
import Avatar from "@mui/material/Avatar";
import { Link, defer, useLoaderData, Await } from "react-router-dom";
import { getJobFormInitialData } from "../../../utils/api/company/jobs";
import { Suspense } from "react";
import Spinner from "../../common/Spinner";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddNewCompany() {
  const { initialFormData } = useLoaderData();

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
            <Link to="/" style={{ textDecoration: "none" }}>
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
            </Link>

            {/* add button */}
            <Link to="/" style={{ textDecoration: "none" }}>
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
                Register
              </Typography>
            </Link>
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
                <CompanyDetails
                  skills={data.skills}
                  domains={data.domains}
                  states={data.states}
                  jobTypes={data.job_types}
                  disciplines={data.disciplines}
                  degrees={data.degrees}
                  graduationYears={data.graduation_years}
                  foss={data.foss}
                ></CompanyDetails>
              </>
            )}
          </Await>
        </Suspense>
      </Dialog>
    </React.Fragment>
  );
}
export function loader() {
  return defer({ initialFormData: getJobFormInitialData() });
}
