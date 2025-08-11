import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  CircularProgress
  
} from "@mui/material";
import {
  WorkOutline,
  BusinessCenter,
  CalendarToday,
  Numbers,
  Description,
  Assignment,
  ListAlt,
  SchoolOutlined,
  LocationCity,
  Public,
  ExpandMore,
  ArrowForwardIos,
  BuildOutlined,
  CorporateFare,
  MapOutlined,
  LocationOn,
  School,
  WorkspacePremium,
  CalendarViewDay,
  AccountBalance,
  Place,
  
  
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";


const statusOptions = [
  { value: 0, label: "pending" },
  { value: 3, label: "shortlist" },
  { value: 4, label: "rejected" },
];

export default function JobDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { job_id } = useParams(); 
  const [students, setStudents] = useState([]);
  const [job, setJob] = useState({});
  const [ loading, setLoading ] = useState(true);

  // Helper to render comma-separated values
  const renderCommaList = (items) =>
    items && items.length > 0 ? items.join(", ") : "N/A";

  const handleStatusChange = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((stu) =>
        stu.id === id ? { ...stu, status: newStatus } : stu
      )
    );

    // <int:user_id>/applicant/status/<int:job_id>/<int:spk_usr_id>/</int:spk_usr_id>
    const changeApplicantStatus = async () => {
      try {
        // alert('call')
          // const url = `employer/16578/applicant/status/121/2899300/`;
          const url = `employer/applicant/status/`;
          const data = {
            job_id: job_id,
            spk_usr_id: id,
            status: newStatus
          }
          const response = await axiosInstance.post(url, data);
          console.log("response")
          console.log(response)
      } catch (error) {
          console.error("Error fetching jobs", error);
          setError("Failed to load jobs");
          
      } finally {
        
      }
    };
    changeApplicantStatus();
    
  };

  useEffect(()=>{
    const fetchJobs = async () => {
      try {
        // alert('call')
          const url = `employer/jobs/${job_id}`;
          const response = await axiosInstance.get(url);
          console.log("response")
          console.log(response)
          const data = response.data;
          setJob(data);
          setStudents(data.applicants);
      } catch (error) {
          console.error("Error fetching jobs", error);
          setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          gap: 2,
        }}
      >
        <CircularProgress size={48} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Fetching jobs...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 900, mx: "auto" }}>
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box display="flex" alignItems="center">
            <WorkOutline sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Job Details
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Card elevation={0} sx={{ mb: 2, boxShadow: "none" }}>
            <CardContent sx={{ pb: 1 }}>
              
              <Box display="flex" alignItems="center" mb={1}>
                <BusinessCenter sx={{ color: theme.palette.info.main, mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  {job.designation}
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
                  {job.domain}
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <CorporateFare sx={{ color: theme.palette.secondary.light, mr: 1 }} />
                <Typography variant="subtitle2" >
                  {job.company}
                </Typography>
              </Box>
               <Box display="flex" alignItems="center" mb={1}>
                <LocationOn sx={{ color: theme.palette.secondary.light, mr: 1 }} />
                <Typography variant="subtitle2" >
                  {job.city_of_job}
                  {/* , {job.state_of_job} */}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <CalendarToday sx={{ color: theme.palette.info.main, mr: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Last Application Date:
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {job.last_app_date_human}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Numbers sx={{ color: theme.palette.info.main, mr: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Vacancies:
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {job.num_vacancies}
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
                  dangerouslySetInnerHTML={{ __html: job.description }}
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
                  dangerouslySetInnerHTML={{ __html: job.requirements }}
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
                  dangerouslySetInnerHTML={{ __html: job.key_job_responsibilities }}
                  sx={{ ml: 3 }}
                />
              </Box>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box display="flex" alignItems="center">
            <SchoolOutlined sx={{ color: theme.palette.success.main, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Eligibility Criteria
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Card elevation={0} sx={{ boxShadow: "none" }}>
            <CardContent sx={{ pb: 1 }}>
              <Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Assignment sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 140 }}>
                    Course Groups:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {renderCommaList(job?.course_groups)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Assignment sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 140 }}>
                    Courses:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {renderCommaList(job?.courses)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <School sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 140 }}>
                    Degree:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {renderCommaList(job?.degrees)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <WorkspacePremium sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 140 }}>
                    Discipline:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {renderCommaList(job?.disciplines)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <CalendarToday sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 140 }}>
                    Graduation Year:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {renderCommaList(job?.graduation_years)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <AccountBalance sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 140 }}>
                    Institution Type:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {renderCommaList(job?.eligibility?.institution_type)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Place sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 140 }}>
                    City:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {renderCommaList(job?.cities)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Place sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 140 }}>
                    State:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {renderCommaList(job?.states)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box display="flex" alignItems="center">
            <ListAlt sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Applicants
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Unique ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Institute</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Batch (Admission Year)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Profile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((stu) => (
                  <TableRow
                    key={stu.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/employer/student/profile/${stu.id}`)}
                  >
                    <TableCell>{stu.id}</TableCell>
                    <TableCell>{stu.academic}</TableCell>
                    <TableCell>{stu.department}</TableCell>
                    <TableCell>{stu.year}</TableCell>
                    <TableCell
                      onClick={e => e.stopPropagation()}
                    >
                      
                      <Select
                        size="small"
                        value={stu.status}
                        onChange={e => handleStatusChange(stu.id, parseInt(e.target.value))}
                        sx={{
                          minWidth: 100,
                          fontWeight: 500,
                          bgcolor:
                            stu.status === 0
                              ? theme.palette.warning.light
                              : stu.status === 3
                              ? theme.palette.success.light
                              : theme.palette.error.light,
                          color:
                            stu.status === 0
                              ? theme.palette.warning.contrastText
                              : stu.status === 3
                              ? theme.palette.success.contrastText
                              : theme.palette.error.contrastText,
                        }}
                      >
                        {statusOptions.map(opt => (
                          <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MenuItem>
                        ))}
                      </Select>

                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={e => {
                          e.stopPropagation();
                          navigate(`/student/profile/${stu.id}`);
                        }}
                        color="primary"
                      >
                        <ArrowForwardIos fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}