import React, { useState } from "react";
import Select from "react-select";
import DataTable from "react-data-table-component";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GradeIcon from "@mui/icons-material/Grade";
import PersonIcon from "@mui/icons-material/Person";

// Dummy options
const jobOptions = [
  { value: 1, label: "Software Engineer" },
  { value: 2, label: "Data Analyst" },
];

const stateOptions = [
  { value: "MH", label: "Maharashtra" },
  { value: "DL", label: "Delhi" },
];
const cityOptions = [
  { value: "Mumbai", label: "Mumbai" },
  { value: "Pune", label: "Pune" },
  { value: "Delhi", label: "Delhi" },
];
const instituteTypeOptions = [
  { value: "IIT", label: "IIT" },
  { value: "NIT", label: "NIT" },
  { value: "Private", label: "Private" },
];
const gradYearOptions = [
  { value: 2024, label: "2024" },
  { value: 2025, label: "2025" },
];
const disciplineOptions = [
  { value: "CSE", label: "Computer Science" },
  { value: "ECE", label: "Electronics" },
];
const degreeOptions = [
  { value: "BTech", label: "B.Tech" },
  { value: "MTech", label: "M.Tech" },
];
const courseOptions = [
  { value: "AI", label: "Artificial Intelligence" },
  { value: "ML", label: "Machine Learning" },
];
const gradeOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
];

// Dummy previous searches
const previousSearches = [
  {
    id: 1,
    title: "Top students only",
    filters: {
      state: ["Maharashtra"],
      city: ["Mumbai"],
      instituteType: ["IIT"],
      gradYear: ["2024"],
      discipline: ["Computer Science"],
      degree: ["B.Tech"],
      courses: ["AI"],
      grade: ["A"],
      remarks: "Top students only",
    },
    searchedOn: "2025-07-05",
    emails: ["student1@gmail.com", "student2@gmail.com"],
    jobId: 1,
    addedBy: "Admin1",
  },
  {
    id: 2,
    title: "For ML project",
    filters: {
      state: ["Delhi"],
      city: ["Delhi"],
      instituteType: ["NIT"],
      gradYear: ["2025"],
      discipline: ["Electronics"],
      degree: ["M.Tech"],
      courses: ["ML"],
      grade: ["B"],
      remarks: "For ML project",
    },
    searchedOn: "2025-07-01",
    emails: ["student3@gmail.com"],
    jobId: null,
    addedBy: "Admin2",
  },
];

export default function Students() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    state: [],
    city: [],
    instituteType: [],
    gradYear: [],
    discipline: [],
    degree: [],
    courses: [],
    grade: [],
    remarks: "",
  });

  const handleFilterChange = (selected, key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: selected || [],
    }));
  };

  const handleJobChange = (selected) => {
    setSelectedJob(selected);
    // Prefill filters if job is selected (dummy logic)
    if (selected) {
      setFilters((prev) => ({
        ...prev,
        state: [stateOptions[0]],
        city: [cityOptions[0]],
        instituteType: [instituteTypeOptions[0]],
        gradYear: [gradYearOptions[0]],
        discipline: [disciplineOptions[0]],
        degree: [degreeOptions[0]],
        courses: [courseOptions[0]],
        grade: [gradeOptions[0]],
        remarks: "",
      }));
    } else {
      setFilters({
        state: [],
        city: [],
        instituteType: [],
        gradYear: [],
        discipline: [],
        degree: [],
        courses: [],
        grade: [],
        remarks: "",
      });
    }
  };

  // Download emails as CSV
  const downloadCSV = (emails) => {
    const csvContent = "data:text/csv;charset=utf-8," + emails.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to render filter details in details column
  const renderDetails = (filters) => (
    <Box>
      {filters.state && filters.state.length > 0 && (
        <Typography variant="body2"><PublicIcon color="primary" fontSize="inherit" sx={{ verticalAlign: "middle" }} /> State: {filters.state.join(", ")}</Typography>
      )}
      {filters.city && filters.city.length > 0 && (
        <Typography variant="body2"><LocationCityIcon color="secondary" fontSize="inherit" sx={{ verticalAlign: "middle" }} /> City: {filters.city.join(", ")}</Typography>
      )}
      {filters.instituteType && filters.instituteType.length > 0 && (
        <Typography variant="body2"><SchoolIcon color="info" fontSize="inherit" sx={{ verticalAlign: "middle" }} /> Institute Type: {filters.instituteType.join(", ")}</Typography>
      )}
      {filters.gradYear && filters.gradYear.length > 0 && (
        <Typography variant="body2"><CalendarTodayIcon color="success" fontSize="inherit" sx={{ verticalAlign: "middle" }} /> Grad Year: {filters.gradYear.join(", ")}</Typography>
      )}
      {filters.discipline && filters.discipline.length > 0 && (
        <Typography variant="body2"><MenuBookIcon color="primary" fontSize="inherit" sx={{ verticalAlign: "middle" }} /> Discipline: {filters.discipline.join(", ")}</Typography>
      )}
      {filters.degree && filters.degree.length > 0 && (
        <Typography variant="body2"><MenuBookIcon color="secondary" fontSize="inherit" sx={{ verticalAlign: "middle" }} /> Degree: {filters.degree.join(", ")}</Typography>
      )}
      {filters.courses && filters.courses.length > 0 && (
        <Typography variant="body2"><MenuBookIcon color="info" fontSize="inherit" sx={{ verticalAlign: "middle" }} /> Courses: {filters.courses.join(", ")}</Typography>
      )}
      {filters.grade && filters.grade.length > 0 && (
        <Typography variant="body2"><GradeIcon color="warning" fontSize="inherit" sx={{ verticalAlign: "middle" }} /> Grade: {filters.grade.join(", ")}</Typography>
      )}
      {filters.remarks && (
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>Remarks: {filters.remarks}</Typography>
      )}
    </Box>
  );

  // DataTable columns for previous searches
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon color="primary" fontSize="small" /> Added By
        </Box>
      ),
      selector: (row) => row.addedBy,
      sortable: true,
    },
    {
      name: (
        <Box display="flex" alignItems="center" gap={1}>
          <CalendarTodayIcon color="success" fontSize="small" /> Created On
        </Box>
      ),
      selector: (row) => row.searchedOn,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => renderDetails(row.filters),
      grow: 2,
      wrap: true,
    },
    {
      name: "Emails (CSV)",
      cell: (row) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => downloadCSV(row.emails)}
        >
          Download
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Filter Students
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
              <MenuBookIcon color="primary" fontSize="small" /> Job
            </Typography>
            <Select
              options={jobOptions}
              value={selectedJob}
              onChange={handleJobChange}
              placeholder="Select Job (optional)"
              isClearable
              isSearchable
            />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr 1fr" }, gap: 2 }}>
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <PublicIcon color="primary" fontSize="small" /> State
              </Typography>
              <Select
                options={stateOptions}
                value={filters.state}
                onChange={(v) => handleFilterChange(v, "state")}
                placeholder="State"
                isMulti
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <LocationCityIcon color="secondary" fontSize="small" /> City
              </Typography>
              <Select
                options={cityOptions}
                value={filters.city}
                onChange={(v) => handleFilterChange(v, "city")}
                placeholder="City"
                isMulti
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <SchoolIcon color="info" fontSize="small" /> Institute Type
              </Typography>
              <Select
                options={instituteTypeOptions}
                value={filters.instituteType}
                onChange={(v) => handleFilterChange(v, "instituteType")}
                placeholder="Institute Type"
                isMulti
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon color="success" fontSize="small" /> Graduation Year
              </Typography>
              <Select
                options={gradYearOptions}
                value={filters.gradYear}
                onChange={(v) => handleFilterChange(v, "gradYear")}
                placeholder="Graduation Year"
                isMulti
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <MenuBookIcon color="primary" fontSize="small" /> Discipline
              </Typography>
              <Select
                options={disciplineOptions}
                value={filters.discipline}
                onChange={(v) => handleFilterChange(v, "discipline")}
                placeholder="Discipline"
                isMulti
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <MenuBookIcon color="secondary" fontSize="small" /> Degree
              </Typography>
              <Select
                options={degreeOptions}
                value={filters.degree}
                onChange={(v) => handleFilterChange(v, "degree")}
                placeholder="Degree"
                isMulti
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <MenuBookIcon color="info" fontSize="small" /> Courses
              </Typography>
              <Select
                options={courseOptions}
                value={filters.courses}
                onChange={(v) => handleFilterChange(v, "courses")}
                placeholder="Courses"
                isMulti
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <GradeIcon color="warning" fontSize="small" /> Grade
              </Typography>
              <Select
                options={gradeOptions}
                value={filters.grade}
                onChange={(v) => handleFilterChange(v, "grade")}
                placeholder="Grade"
                isMulti
              />
            </Box>
          </Box>
          <Box>
            <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
              <MenuBookIcon color="primary" fontSize="small" /> Remarks
            </Typography>
            <TextField
              label="Remarks"
              value={filters.remarks}
              onChange={e => setFilters(f => ({ ...f, remarks: e.target.value }))}
              multiline
              minRows={1}
              maxRows={3}
              sx={{ width: { xs: "100%", md: "50%" } }}
            />
          </Box>
          <Button variant="contained" color="primary" sx={{ width: 180, mt: 2 }}>
            Apply Filters
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Previous Searches
        </Typography>
        <DataTable
          columns={columns}
          data={previousSearches}
          highlightOnHover
          pointerOnHover
          striped
          responsive
          pagination
          customStyles={{
            headCells: {
              style: {
                fontWeight: 700,
                fontSize: "1rem",
                background: "#e3f2fd",
                color: "#1976d2",
              },
            },
            rows: {
              style: {
                fontSize: "1rem",
                minHeight: "48px",
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}