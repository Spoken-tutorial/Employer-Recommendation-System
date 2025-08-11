import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Snackbar,
  Alert,
  CircularProgress,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axiosInstance from "../../api/axiosInstance";
import { BusinessCenter, CorporateFare, LocationOn, 
  CalendarToday, Numbers, Description, Assignment, ListAlt} from "@mui/icons-material";

// Dummy jobs list
const jobsList = [
  {
    id: 1,
    designation: "Materials Scientist",
    company: "Reliance Industries",
    salary: "₹12L - ₹18L",
    last_app_date: "2025-07-15",
  },
  {
    id: 2,
    designation: "Polymer Researcher",
    company: "BASF India",
    salary: "₹10L - ₹15L",
    last_app_date: "2025-07-10",
  },
  {
    id: 3,
    designation: "Nanomaterials Engineer",
    company: "Tata Chemicals",
    salary: "₹14L - ₹20L",
    last_app_date: "2025-07-20",
  },
];

// Dummy API fetch for job details
// const fetchJobDetails = async (jobId) => {
//   await new Promise((res) => setTimeout(res, 500));
//   return {
//     id: jobId,
//     designation: jobsList.find(j => j.id === jobId)?.designation || "N/A",
//     company: jobsList.find(j => j.id === jobId)?.company || "N/A",
//     salary: jobsList.find(j => j.id === jobId)?.salary || "N/A",
//     last_app_date: jobsList.find(j => j.id === jobId)?.last_app_date_human || "N/A",
//     domain: "Materials Science",
//     description: "<p>Work on advanced materials research and development.</p>",
//     requirements: "<ul><li>M.Tech/PhD in Materials Science</li><li>2+ years experience</li></ul>",
//     key_job_responsibilities: "<ul><li>Lead research projects</li><li>Publish papers</li></ul>",
//     eligibility: {
//       course: ["M.Tech", "PhD"],
//       grade: ["A", "A+"],
//       institution_type: ["Private", "Government"],
//       state: ["Maharashtra", "Gujarat"],
//       city: ["Mumbai", "Vadodara"],
//       department: ["Materials Science"],
//       discipline: ["Engineering"],
//     },
//   };
// };

// Dummy student profile (simulate resume uploaded or not)
const studentProfile = {
  resume: "resume.pdf", // set to null to test "no resume" case
};

export default function StudentJobsList() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [showJobDetailMobile, setShowJobDetailMobile] = useState(false);


  useEffect(()=>{
    const fetchJobs = async () => {
      try {
          const url = "student/jobs";
          const response = await axiosInstance.get(url);
          // console.log("response")
          // console.log(response)
          const data = response.data.results;
          console.log("data")
          console.log(data)
          console.log(data[0])
          setJobs(data);
          if(data) {
            console.log("There is data");
            setSelectedJobId(data[0]?.id)
          }else{
            console.log("There is not data");
          };
          
      } catch (error) {
          // console.error("Error fetching jobs", error);
          setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Fetch job details when selectedJobId changes
  useEffect(() => {
    console.log("fetchJobDetail 1 **********");
    console.log(`selectedJobId ******* ${selectedJobId}`);
    const fetchJobDetail = async () => {
      try {
          console.log("fetchJobDetail 2 **********");
          const url = `student/jobs/${selectedJobId}/`;
          console.log("url")
          console.log(url)
          const response = await axiosInstance.get(url);
          console.log("response")
          console.log(response)
          const data = response.data;
          if(data){
              setSelectedJobId(data.id);
          setJobDetails(data);
          }
          
      } catch (error) {
          console.log("fetchJobDetail 3 **********");
          console.error("Error fetching jobs", error);
          setError("Failed to load jobs");
      } finally {
        console.log("fetchJobDetail 4 **********");
        setLoading(false);
      }
    };
    if(selectedJobId){
      fetchJobDetail();
    } else{
      setLoading(false);
    }
    
  }, [selectedJobId]);

  // Handle apply button
  const handleApply = async () => {
    alert('clicked');
    if (!studentProfile.resume) {
      setSnackbar({
        open: true,
        message: "Uploading resume is mandatory for applying for job.",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      console.log(`jobDetails.id ************ ${jobDetails.id}`);
      const response = await axiosInstance.post("student/jobs/apply/", { job_id: jobDetails.id });
      setLoading(false);
       setSnackbar({
        open: true,
        message: "Applied successfully!",
        severity: "success",
      });
      alert(response.data.message); // or use Snackbar
    } catch (error) {
      console.error("Application failed:", error);
      setLoading(false);
      alert(error.response?.data?.error || "Something went wrong.");
       setSnackbar({
        open: true,
        message: "Error in applying for job. Please try later!",
        severity: "error",
      });
      
    }
  };

  // Helper to render comma-separated values
  const renderCommaList = (arr) => arr && arr.length ? arr.join(", ") : "N/A";

  // Responsive: show only job list or job detail on mobile
  if (isSm) {
    if (showJobDetailMobile) {
      return (
        <Box sx={{ p: 0, height: "100vh", bgcolor: theme.palette.background.default }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 1, bgcolor: theme.palette.background.paper, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <IconButton onClick={() => setShowJobDetailMobile(false)}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={600} sx={{ ml: 1 }}>
              Job Details
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {loading || !jobDetails ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
                <CircularProgress />
              </Box>
            ) : (
              <Card elevation={0} sx={{ mb: 2, boxShadow: "none" }}>
                        <CardContent sx={{ pb: 1 }}>
                          
                          <Box display="flex" alignItems="center" mb={1}>
                            <BusinessCenter sx={{ color: theme.palette.info.main, mr: 1 }} />
                            <Typography variant="subtitle1" fontWeight={600}>
                              {jobDetails.designation}
                            </Typography>
                            <Box
                              sx={{
                                ml: 2,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 2,
                                background: theme.palette.info.main,
                                color: "#fff",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                fontSize: "0.9rem",
                              }}
                            >
                              {jobDetails.domain} domain 1
                            </Box>
                          </Box>
                          
                          <Box display="flex" alignItems="center" mb={1}>
                            <CorporateFare sx={{ color: theme.palette.secondary.light, mr: 1 }} />
                            <Typography variant="subtitle2" >
                              {jobDetails.company}
                            </Typography>
                          </Box>
                           <Box display="flex" alignItems="center" mb={1}>
                            <LocationOn sx={{ color: theme.palette.secondary.light, mr: 1 }} />
                            <Typography variant="subtitle2" >
                              {jobDetails.city_of_job}
                              {/* , {job.state_of_job} */}
                            </Typography>
                            
                          </Box>
                          
                          <Divider sx={{ mb: 2 }} />
                          <Grid container spacing={2} mb={2}>
                            <Grid item sm={6}>
                              <Box>
                              <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ mb: 2, float: "right" }}
                                onClick={handleApply}
                                disabled={loading}
                              >
                                Apply Now
                              </Button>
                            </Box>
                            </Grid>
                            <Grid item sm={6}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <CalendarToday sx={{ color: theme.palette.info.main, mr: 1 }} />
                                <Typography variant="body2" fontWeight={500}>
                                  Last Application Date:
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {jobDetails.last_app_date_human}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item sm={6}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <Numbers sx={{ color: theme.palette.info.main, mr: 1 }} />
                                <Typography variant="body2" fontWeight={500}>
                                  Vacancies:
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {jobDetails.num_vacancies}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Box mb={2}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Description sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                              <Typography variant="subtitle2" fontWeight={600}>
                                Job Description
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              component="div"
                              dangerouslySetInnerHTML={{ __html: jobDetails.description }}
                              sx={{ ml: 3 }}
                            />
                          </Box>
                          <Box mb={2}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Assignment sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                              <Typography variant="subtitle2" fontWeight={600}>
                                Job Requirements
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              component="div"
                              dangerouslySetInnerHTML={{ __html: jobDetails.requirements }}
                              sx={{ ml: 3 }}
                            />
                          </Box>
                          <Box mb={2}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <ListAlt sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                              <Typography variant="subtitle2" fontWeight={600}>
                                Key Job Responsibilities
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              component="div"
                              dangerouslySetInnerHTML={{ __html: jobDetails.key_job_responsibilities }}
                              sx={{ ml: 3 }}
                            />
                          </Box>
                          </CardContent>
                          </Card>
            )}
          </Box>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      );
    }
    // Job List View (mobile)
    return (
      <Box sx={{ p: 0, height: "100vh", bgcolor: theme.palette.background.default }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Jobs
          </Typography>
          <List>
            {jobs && jobs.map((job) => (
              <ListItem disablePadding key={job.id}>
                <ListItemButton
                  selected={selectedJobId === job.id}
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setShowJobDetailMobile(true);
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: selectedJobId === job.id ? theme.palette.action.selected : "inherit",
                  }}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <WorkOutlineIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Typography fontWeight={600}>{job.designation}</Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <BusinessIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                          {job.company}
                        </Typography>
                        {/* <Typography variant="body2" color="success.main">
                          <PaidIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                          {job.salary}
                        </Typography> */}
                        <Typography variant="body2" color="text.secondary">
                          <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                          Last Date: {job.last_app_date_human}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    );
  }

  // Desktop/tablet view
  return (
    <Box display="flex" height="80vh" width="100%">
    {/* <Grid container spacing={0} sx={{ height: "100%", minHeight: "80vh" }}> */}
    <Grid container spacing={0} sx={{ height: "80vh", flexWrap: "nowrap" }}>
      {/* Left: Job List */}
      <Grid
        item
        xs={8}
        // md={isLg ? 4 : 5}
        md={4}
        sx={{
          borderRight: { md: `1px solid ${theme.palette.divider}` },
          // height: "100%",
          height: "80vh",
          overflowY: "auto",
          bgcolor: theme.palette.background.paper,
          minWidth: 400
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Jobs
          </Typography>
          <List>
            {jobs && jobs.map((job) => (
              <ListItem disablePadding key={job.id}>
                <ListItemButton
                  selected={selectedJobId === job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: selectedJobId === job.id ? theme.palette.action.selected : "inherit",
                  }}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <WorkOutlineIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Typography fontWeight={600}>{job.designation}</Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <BusinessIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                          {job.company}
                        </Typography>
                        {/* <Typography variant="body2" color="success.main">
                          <PaidIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                          {job.salary}
                        </Typography> */}
                        <Typography variant="body2" color="text.secondary">
                          <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                          Last Date: {job.last_app_date_human}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      {/* Right: Job Details */}
      <Grid
        item
        xs={8}
        // md={isLg ? 8 : 7}
        md={8}
        sx={{
          // height: "100%",
          height: "80vh",
          overflowY: "auto",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Box sx={{ p: 3 }}>
          {loading || !jobDetails ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}  height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <Card elevation={0} sx={{ mb: 2, boxShadow: "none" }}>
                        <CardContent sx={{ pb: 1 }}>
                          
                          <Box display="flex" alignItems="center" mb={1}>
                            <BusinessCenter sx={{ color: theme.palette.info.main, mr: 1 }} />
                            <Typography variant="subtitle1" fontWeight={600}>
                              {jobDetails.designation}
                            </Typography>
                            <Box
                              sx={{
                                ml: 2,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 2,
                                background: theme.palette.info.main,
                                color: "#fff",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                fontSize: "0.9rem",
                              }}
                            >
                              {jobDetails.domain} domain
                            </Box>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <CorporateFare sx={{ color: theme.palette.secondary.light, mr: 1 }} />
                            <Typography variant="subtitle2" >
                              {jobDetails.company}
                            </Typography>
                          </Box>
                           <Box display="flex" alignItems="center" mb={1}>
                            <LocationOn sx={{ color: theme.palette.secondary.light, mr: 1 }} />
                            <Typography variant="subtitle2" >
                              {jobDetails.city_of_job}
                              {/* , {job.state_of_job} */}
                            </Typography>
                          </Box>
                          
                          
                          <Divider sx={{ mb: 2 }} />
                          <Grid container spacing={2} mb={2}>
                            <Grid item  sm={6}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <CalendarToday sx={{ color: theme.palette.info.main, mr: 1 }} />
                                <Typography variant="body2" fontWeight={500}>
                                  Last Application Date:
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {jobDetails.last_app_date_human}
                                </Typography>
                              </Box>
                            </Grid>
                            
                            <Grid item  sm={6}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <Numbers sx={{ color: theme.palette.info.main, mr: 1 }} />
                                <Typography variant="body2" fontWeight={500}>
                                  Vacancies:
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {jobDetails.num_vacancies}
                                </Typography>
                              </Box>
                            </Grid>

                           
                          </Grid>
                          <Grid mb={2}>
                             <Grid item  sm={12}>
                              <Box>
                              <Button
                                variant="contained"
                                color="primary"
                                size="sm"
                                // sx={{ mb: 2, float: "right" }}
                                onClick={handleApply}
                                disabled={loading}
                              >
                                Apply Now
                              </Button>
                            </Box>
                            </Grid>
                          </Grid>
                          <Box mb={2}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Description sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                              <Typography variant="subtitle2" fontWeight={600}>
                                Job Description
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              component="div"
                              dangerouslySetInnerHTML={{ __html: jobDetails.description }}
                              sx={{ ml: 3 }}
                            />
                          </Box>
                          <Box mb={2}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Assignment sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                              <Typography variant="subtitle2" fontWeight={600}>
                                Job Requirements
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              component="div"
                              dangerouslySetInnerHTML={{ __html: jobDetails.requirements }}
                              sx={{ ml: 3 }}
                            />
                          </Box>
                          <Box mb={2}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <ListAlt sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                              <Typography variant="subtitle2" fontWeight={600}>
                                Key Job Responsibilities
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              component="div"
                              dangerouslySetInnerHTML={{ __html: jobDetails.key_job_responsibilities }}
                              sx={{ ml: 3 }}
                            />
                          </Box>
                          </CardContent>
                          </Card>
          )}
        </Box>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
    </Box>
  );
}

// Add this import at the top with other icons
import LocationIcon from "@mui/icons-material/LocationOn";