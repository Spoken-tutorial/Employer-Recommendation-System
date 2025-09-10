import { Grid, Card, CardContent, Button, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

export default function ManagerHome() {
    const navigate = useNavigate();

    const navigateToAddJob = () => {
        navigate('/manager/jobs/add');
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Card>
                    <Box sx={{ background: '#4285f4', color: 'white', borderTopLeftRadius: 8, borderTopRightRadius: 8, p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Company</Typography>
                    </Box>
                    <CardContent>
                        <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 2, background: '#4285f4', fontWeight: 600 }} onClick={() => navigate("company/add")}>Add Company</Button>
                        <Button variant="outlined" startIcon={<VisibilityIcon />} sx={{ fontWeight: 600 }} onClick={() => navigate("companies")}>View Companies</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <Box sx={{ background: '#4285f4', color: 'white', borderTopLeftRadius: 8, borderTopRightRadius: 8, p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Job</Typography>
                    </Box>
                    <CardContent>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={navigateToAddJob}
                        >
                            Add Job
                        </Button>
                        <Button variant="outlined" startIcon={<VisibilityIcon />} sx={{ fontWeight: 600 }} onClick={() => navigate("jobs")}>View Jobs</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
