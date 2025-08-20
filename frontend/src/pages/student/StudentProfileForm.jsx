import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Assignment, Grade, CalendarToday } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Phone, Email, School, LocationCity, Public, Person, Male, Female, GitHub, LinkedIn, Delete, Add, Description } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

// Dummy courses data
 const courses = [
    {
      name: "Data Structures",
      grade: "A",
      testDate: "2025-03-15",
    },
    {
      name: "Operating Systems",
      grade: "A+",
      testDate: "2025-02-10",
    },
    {
      name: "Machine Learning",
      grade: "B+",
      testDate: "2025-01-20",
    },
  ];


// Dummy student data
const student = {
  firstName: "Ankita",
  lastName: "Sharma",
  email: "ankita.sharma@email.com",
  contact: "9876543210",
  department: "Computer Science",
  institution: "IIT Bombay",
  city: "Mumbai",
  state: "Maharashtra",
  gender: "female",
};

export default function StudentProfileForm() {
  const theme = useTheme();
  const [deleteIdx, setDeleteIdx] = useState(null);
  const { spk_usr_id } = useParams();
  const [ student, setStudent ] = useState({});
  const [ loading, setLoading ] = useState(true);

  // Form state
  const [form, setForm] = useState({
    user: {},
    phone: "",
    alternate_email: "",
    about: "",
    projects: [{ url: "", description: "" }],
    github: "",
    linkedin: "",
    resume: null,
    grades: {},
    certifications: ""
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle project changes
  const handleProjectChange = (idx, field, value) => {
    setForm((prev) => {
      const projects = [...prev.projects];
      projects[idx][field] = value;
      return { ...prev, projects };
    });
  };

  // Add new project
  const handleAddProject = () => {
    if (form.projects.length < 5) {
      setForm((prev) => ({
        ...prev,
        projects: [...prev.projects, { url: "", description: "" }],
      }));
    }
  };

  
   // Delete project with confirmation
  const handleDeleteProject = (idx) => {
    setDeleteIdx(idx);
  };
  const handleConfirmDelete = () => {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== deleteIdx),
    }));
    setDeleteIdx(null);
  };

  const handleProfileUpdate = async (e) => {
    console.log("^^^^^^^^^^^^^^^^^^ handleProfileUpdate ^^^^^^^^^^^^^^^^^^")
    e.preventDefault();

    try {
      const payload = form;
      console.log(`payload : ${payload}`)
      const res = await axiosInstance.patch(`student/update/${spk_usr_id}`, payload);
      const data = res.data;
      console.log("data");
      console.log(data);

    
    } catch (error) {
      console.log("error");
      console.log(error);
      // setError(error.mes;)
    } finally {
      setLoading(false);
    }
    

  }
  const handleCancelDelete = () => setDeleteIdx(null);

  useEffect(() => {
      const fetchStudentDetails = async () => {
        console.log("fetching student data");
        const url = `student/profile/${spk_usr_id}/`;
        try {
          const response = await axiosInstance.get(url);
          console.log(response);
          const courseGrades = Object.entries(student.grades || {}).map(([name, info]) => ({
                name,
                grade: info.grade,
                testDate: info.tdate,
            }));

          setStudent(response.data?.spoken_details);
          setForm(response.data);
          
        } catch (error) {
          console.log("error");
          console.log(error);
          
        } finally{
          console.log("finally");
          setLoading(false);
        }
      };

      fetchStudentDetails();
  }, []);

  const courseGrades = Object.entries(form.grades || {}).map(([name, info]) => ({
                name,
                grade: info.grade,
                testDate: info.tdate,
            }));
  

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 800, mx: "auto" }}>
      {/* Student Info Card */}
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, mr: 2 }}>
              <Person sx={{ fontSize: 36 }} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {form.user.first_name} {form.user.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.email}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <Phone sx={{ color: theme.palette.info.main, mr: 1 }} />
                <Typography variant="body2" fontWeight={500}>Contact:</Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>{form.phone}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <School sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                <Typography variant="body2" fontWeight={500}>Department:</Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>{student.department}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <School sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                <Typography variant="body2" fontWeight={500}>Institution:</Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>{student.academic}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationCity sx={{ color: theme.palette.success.main, mr: 1 }} />
                <Typography variant="body2" fontWeight={500}>City:</Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>{student.city}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Public sx={{ color: theme.palette.success.main, mr: 1 }} />
                <Typography variant="body2" fontWeight={500}>State:</Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>{student.state}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                {student.gender === "female" ? (
                  <Female sx={{ color: theme.palette.error.main, mr: 1 }} />
                ) : (
                  <Male sx={{ color: theme.palette.info.main, mr: 1 }} />
                )}
                <Typography variant="body2" fontWeight={500}>Gender:</Typography>
                <Typography variant="body2" sx={{ ml: 1, textTransform: "capitalize" }}>
                  {student.gender}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Courses Table */}
            <Card elevation={2} sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Assignment sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Courses & Grades
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>
                          <Assignment sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
                          Course
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          <Grade sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
                          Grade
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          <CalendarToday sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
                          Test Date
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courseGrades.map((course) => (
                        <TableRow key={course.name}>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.grade}</TableCell>
                          <TableCell>{course.testDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

      {/* Editable Form */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Edit Profile
          </Typography>
          <Grid container spacing={2}>
                <Grid item xs={6} >
                       <Box px={1}>
                        <TextField
                          label="Alternate Phone Number"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          margin="dense"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone sx={{ color: theme.palette.info.main }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                       </Box>
                </Grid>
                <Grid item xs={6} >
                        <Box px={1}>
                          <TextField
                        label="Alternate Phone Number"
                        name="alternate_email"
                        value={form.alternate_email}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        margin="dense"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone sx={{ color: theme.palette.info.main }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                        </Box>
                </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                label="Alternate Phone Number"
                name="alternatePhone"
                value={form.alternatePhone}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: theme.palette.info.main }} />
                    </InputAdornment>
                  ),
                }}
              /> */}
              <TextField
                label="GitHub"
                name="github"
                value={form.github}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GitHub sx={{ color: theme.palette.text.primary }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="LinkedIn"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedIn sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Certifications"
                name="certifications"
                value={form.certifications}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
                multiline
                minRows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description sx={{ color: theme.palette.info.main }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="About"
                name="about"
                value={form.about}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
                multiline
                minRows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description sx={{ color: theme.palette.secondary.main }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2, textAlign: "left" }}
              >
                Upload Resume
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              {form.resume && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected: {form.resume.name}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Projects Section */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Projects
          </Typography>
          {form.projects.map((proj, idx) => (
            <Box key={idx} mb={2} sx={{ border: 1, borderColor: theme.palette.divider, borderRadius: 2, p: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="body2" fontWeight={600}>
                  Project {idx + 1}
                </Typography>
                {form.projects.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteProject(idx)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>
              <TextField
                label={`Project URL`}
                value={proj.url}
                onChange={e => handleProjectChange(idx, "url", e.target.value)}
                fullWidth
                size="small"
                sx={{ mb: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GitHub sx={{ color: theme.palette.text.primary }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Description"
                value={proj.desc}
                onChange={e => handleProjectChange(idx, "description", e.target.value)}
                fullWidth
                size="small"
                multiline
                minRows={2}
              />
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddProject}
            disabled={form.projects.length >= 5}
            sx={{ mb: 2 }}
          >
            Add Project
          </Button>
        </CardContent>
      </Card>
        <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, fontWeight: 600 }}
            onClick={handleProfileUpdate}
          >
            Update Profile
          </Button>
    </Box>
  );
}