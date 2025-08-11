import {
  BuildOutlined,
  PersonOutline,
  WorkOutline,
  CalendarToday,
  Numbers,
  BusinessCenter,
  EmailOutlined,
  PhoneOutlined,
  SchoolOutlined,
  LocationCity,
  Public,
  AssignmentInd,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  TextField,
  InputAdornment,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Divider,
  useTheme,
  Paper,
} from "@mui/material";
import { useState } from "react";
import Select from "react-select";

export default function JobFiltersForm({form, errors}){
    const theme = useTheme();

     // Custom styles for react-select to match theme
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: theme.palette.primary.main,
      minHeight: 40,
      boxShadow: "none",
      "&:hover": { borderColor: theme.palette.primary.dark },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? theme.palette.primary.main
        : state.isFocused
        ? theme.palette.action.hover
        : undefined,
      color: state.isSelected
        ? theme.palette.primary.contrastText
        : theme.palette.text.primary,
    }),
  };

    // Example options (replace with your actual data)
  const courseOptions = [
    { value: "B.Tech", label: "B.Tech" },
    { value: "M.Tech", label: "M.Tech" },
    { value: "MBA", label: "MBA" },
  ];
  const degreeOptions = [
    { value: "Bachelor", label: "Bachelor" },
    { value: "Master", label: "Master" },
  ];
  const disciplineOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Electronics", label: "Electronics" },
  ];
  const graduationYearOptions = [
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
  ];
  const institutionTypeOptions = [
    { value: "Private", label: "Private" },
    { value: "Government", label: "Government" },
  ];
  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Karnataka", label: "Karnataka" },
  ];
  const cityOptions = [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bangalore", label: "Bangalore" },
  ];

    const handleEligibilityChange = (field) => (selected) => {
    setForm((prev) => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [field]: selected || [],
      },
    }));
  };
    return (
        <section>
        <Box display="flex" alignItems="center" mb={2}>
                <SchoolOutlined sx={{ color: theme.palette.success.main, mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Student Eligibility Criteria for the job
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Courses
                </Typography>
                <Select
                  isMulti
                  name="courses"
                  options={courseOptions}
                  value={form.eligibility?.courses}
                  onChange={handleEligibilityChange("courses")}
                  classNamePrefix="select"
                  placeholder="Select courses"
                  styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Degree
                </Typography>
                <Select
                  isMulti
                  name="degree"
                  options={degreeOptions}
                  value={form.eligibility?.degree}
                  onChange={handleEligibilityChange("degree")}
                  classNamePrefix="select"
                  placeholder="Select degree"
                  styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Discipline
                </Typography>
                <Select
                  isMulti
                  name="discipline"
                  options={disciplineOptions}
                  value={form.eligibility?.discipline}
                  onChange={handleEligibilityChange("discipline")}
                  classNamePrefix="select"
                  placeholder="Select discipline"
                  styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Graduation Year
                </Typography>
                <Select
                  isMulti
                  name="graduation_year"
                  options={graduationYearOptions}
                  value={form.eligibility?.graduation_year}
                  onChange={handleEligibilityChange("graduation_year")}
                  classNamePrefix="select"
                  placeholder="Select graduation year"
                  styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Institution Type
                </Typography>
                <Select
                  isMulti
                  name="institution_type"
                  options={institutionTypeOptions}
                  value={form.eligibility?.institution_type}
                  onChange={handleEligibilityChange("institution_type")}
                  classNamePrefix="select"
                  placeholder="Select institution type"
                  styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  State
                </Typography>
                <Select
                  isMulti
                  name="state"
                  options={stateOptions}
                  value={form.eligibility?.state}
                  onChange={handleEligibilityChange("state")}
                  classNamePrefix="select"
                  placeholder="Select state"
                  styles={selectStyles}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  City
                </Typography>
                <Select
                  isMulti
                  name="city"
                  options={cityOptions}
                  value={form.eligibility?.city}
                  onChange={handleEligibilityChange("city")}
                  classNamePrefix="select"
                  placeholder="Select city"
                  styles={selectStyles}
                />
              </Box>
        </section>
    )
}