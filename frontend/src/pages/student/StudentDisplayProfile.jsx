import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import {
  AccountCircle,
  School,
  LocationCity,
  Public,
  Info,
  Assignment,
  FolderOpen,
  CalendarToday,
  Grade,
  AccountTree,
  Apartment,
  MapOutlined,
  PinDrop,
  CorporateFare
} from "@mui/icons-material";
import { Link as MuiLink } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";


// Dummy data

export default function StudentDisplayProfile() {
  const theme = useTheme();
  const { student_id } = useParams();
  const [ student, setStudent ] = useState({});
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
      const fetchStudentDetails = async () => {
        console.log("fetching student data");
        const url = `student/external/${student_id}/`;
        try {
          const response = await axiosInstance.get(url);
          console.log(response);
          const courseGrades = Object.entries(student.grades || {}).map(([name, info]) => ({
                name,
                grade: info.grade,
                testDate: info.tdate,
            }));

          setStudent(response.data);
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

  if (error) return <Typography>Error in fetching student details.</Typography>
   const courseGrades = Object.entries(student.grades || {}).map(([name, info]) => ({
                name,
                grade: info.grade,
                testDate: info.tdate,
            }));


  return (
    
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 800, mx: "auto" }}>
      {/* Basic Info */}
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <AccountCircle sx={{ color: theme.palette.primary.main, fontSize: 36, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Student Profile
            </Typography>
            <Box sx={{ ml: 2, px: 1.5, py: 0.5, borderRadius: 2, background: theme.palette.info.main, color: "#fff", fontWeight: 500, fontSize: "0.95rem" }}>
              ID: {student.spoken_details?.unique_id}
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
             <Box>
               {/* <Grid container spacing={2}> */}
        {/* Row 1: Department */}
        {/* <Grid item xs={12}> */}
          <Box display="flex" alignItems="center" mb={1}>
            <School sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="body2" fontWeight={500}>Department:</Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>{student.spoken_details?.department}</Typography>
          </Box>
        {/* </Grid> */}

        {/* Row 2: College */}
        {/* <Grid item xs={12}> */}
          <Box display="flex" alignItems="center" mb={1}>
            <CorporateFare sx={{ color: theme.palette.secondary.main, mr: 1 }} />
            <Typography variant="body2" fontWeight={500}>Institute:</Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>{student.spoken_details?.academic}</Typography>
          </Box>
        {/* </Grid> */}

        {/* Row 3: Institute Type (assumed to be College again) + Batch Year */}
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <Apartment sx={{ color: theme.palette.warning.main, mr: 1 }} />
                <Typography variant="body2" fontWeight={500}>Institute Type:</Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>{student.spoken_details?.institute_type}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <CalendarToday sx={{ color: theme.palette.info.main, mr: 1 }} />
                <Typography variant="body2" fontWeight={500}>Batch Year:</Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>{student.spoken_details?.year}</Typography>
              </Box>
            </Grid>

            {/* Row 4: City + State */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <PinDrop sx={{ color: theme.palette.success.main, mr: 1 }} />
                <Typography variant="body2" sx={{ ml: 1 }}>{student.spoken_details?.city}, {student.spoken_details?.state}</Typography>
              </Box>
            </Grid>
            </Grid>
          {/* </Grid> */}
             </Box>

        </CardContent>
      </Card>

      {/* About */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={1}>
            <Info sx={{ color: theme.palette.info.main, mr: 1 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              About
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ ml: 4 }}>
            {student.about}
          </Typography>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={1}>
            <Info sx={{ color: theme.palette.info.main, mr: 1 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Certifications
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ ml: 4 }}>
            {student.certifications}
          </Typography>
        </CardContent>
      </Card>

      {/* Projects */}
     <Card elevation={2} sx={{ mb: 3 }}>
  <CardContent>
    <Box display="flex" alignItems="center" mb={1}>
      <FolderOpen sx={{ color: theme.palette.warning.main, mr: 1 }} />
      <Typography variant="subtitle1" fontWeight={600}>Projects</Typography>
    </Box>
    <Divider sx={{ mb: 1 }} />
    
    {student.projects && student.projects.map((proj, index) => (
      <Box key={index} mb={2} ml={2}>
        <Box display="flex" alignItems="center" mb={0.5}>
          <LinkIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
          <MuiLink href={proj.url} target="_blank" rel="noopener" underline="hover" fontWeight={500}>
            {proj.url}
          </MuiLink>
        </Box>
        <Typography variant="body2" sx={{ ml: 4, color: theme.palette.text.secondary }}>
          {proj.desc}
        </Typography>
      </Box>
    ))}
  </CardContent>
</Card>


      {/* Courses Table */}
      <Card elevation={2}>
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
    </Box>
  );
}