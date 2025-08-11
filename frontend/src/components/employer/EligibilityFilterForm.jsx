import React, { useEffect, useState } from 'react';
import axiosInstance from "../../api/axiosInstance";
import Select from 'react-select';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import RefreshIcon from '@mui/icons-material/Refresh';

const EligibilityFilterForm = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [eligibilityValues, setEligibilityValues] = useState({});
  const [formValues, setFormValues] = useState({});

  const eligibilityFields = {
    degrees: 'Degree',
    disciplines: 'Department',
    institute_types: 'Institute Type',
    states: 'State',
    cities: 'City',
    courses: 'Course',
    graduation_years: 'Graduation Year'
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = 'employer/jobs/eligibility';
        const response = await axiosInstance.get(url);
        const data = response.data.results;
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const convertToOptions = (arr) => arr.map((v) => ({ label: v, value: v }));

  useEffect(() => {
    if (selectedJob) {
      const formatted = {};
      Object.keys(eligibilityFields).forEach((key) => {
        formatted[key] = convertToOptions(selectedJob[key] || []);
      });
      setEligibilityValues(formatted);
      setFormValues(formatted);
    }
  }, [selectedJob]);

  const handleChange = (field, selectedOptions) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: selectedOptions || []
    }));
  };

  if (loading) return <CircularProgress sx={{ m: 2 }} />;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        <WorkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Select Job & Filter Students
      </Typography>

      <Select
        placeholder="Select Job"
        options={jobs.map((job) => ({
          label: job.designation,
          value: job
        }))}
        value={selectedJob ? { label: selectedJob.designation, value: selectedJob } : null}
        onChange={(opt) => setSelectedJob(opt.value)}
      />

      {selectedJob && (
        <>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {Object.entries(eligibilityFields).map(([key, label]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="caption" color="textSecondary">
                    {label}
                  </Typography>
                  <Select
                    isMulti
                    options={eligibilityValues[key] || []}
                    value={formValues[key] || []}
                    onChange={(options) => handleChange(key, options)}
                  />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 1, textAlign: 'right' }}>
              <IconButton
                onClick={() => setFormValues(eligibilityValues)}
                color="primary"
                title="Reset filters"
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Dummy Stats */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">📊 Matching Stats</Typography>
            <Typography variant="body2">Total students matching: 42</Typography>
            <Typography variant="body2">Graduating in 2025: 18</Typography>
          </Paper>

          {/* Dummy Students */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">🧑‍🎓 Matching Students</Typography>
            <ul>
              <li>Priya Sharma — BTech, CSE, Gaya</li>
              <li>Rohan Iyer — BSc, CS, Mumbai</li>
            </ul>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default EligibilityFilterForm;
