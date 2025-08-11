import React, { useState, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select as MuiSelect,
  useTheme,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TitleIcon from "@mui/icons-material/Title";
import EmailIcon from "@mui/icons-material/Email";
import DataTable from "react-data-table-component";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Dummy job options
const jobOptions = [
  { value: 1, label: "Software Engineer" },
  { value: 2, label: "Data Analyst" },
];

// Dummy previous mails data
const previousMails = [
  {
    id: 1,
    title: "Job Opening: Software Engineer",
    createdOn: "2025-07-01",
    totalSend: 120,
    totalFailed: 3,
    senders: ["a@gmail.com", "b@gmail.com"],
  },
  {
    id: 2,
    title: "General Info: Internship Drive",
    createdOn: "2025-06-25",
    totalSend: 80,
    totalFailed: 0,
    senders: ["c@gmail.com", "d@gmail.com"],
  },
];

export default function Mail() {
  const theme = useTheme();
  const [mailType, setMailType] = useState("job");
  const [selectedJob, setSelectedJob] = useState("");
  const [mailContent, setMailContent] = useState("");
  const [title, setTitle] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const fileInputRef = useRef();

  // Download sender list as CSV
  const downloadCSV = (senders) => {
    const csvContent = "data:text/csv;charset=utf-8," + senders.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "senders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // DataTable columns
  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true, grow: 2 },
    { name: "Created On", selector: (row) => row.createdOn, sortable: true },
    { name: "Total Sent", selector: (row) => row.totalSend, sortable: true },
    { name: "Total Failed", selector: (row) => row.totalFailed, sortable: true },
    {
      name: "Download Sender's List",
      cell: (row) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => downloadCSV(row.senders)}
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
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          <EmailIcon sx={{ color: theme.palette.primary.main, mr: 1, verticalAlign: "middle" }} />
          Create Mail Job
        </Typography>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Mail Type</FormLabel>
          <RadioGroup
            row
            value={mailType}
            onChange={(e) => setMailType(e.target.value)}
          >
            <FormControlLabel
              value="job"
              control={<Radio />}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <WorkOutlineIcon sx={{ color: theme.palette.info.main }} fontSize="small" />
                  Send Job Mail
                </Box>
              }
            />
            <FormControlLabel
              value="general"
              control={<Radio />}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon sx={{ color: theme.palette.secondary.main }} fontSize="small" />
                  Send General Information Mail
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
        <Stack spacing={2}>
          <Box>
            <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
              <TitleIcon sx={{ color: theme.palette.primary.main }} fontSize="small" /> Title (for your reference)
            </Typography>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              placeholder="Enter mail title"
            />
          </Box>
          {mailType === "job" && (
            <Box>
              <Typography sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <WorkOutlineIcon sx={{ color: theme.palette.info.main }} fontSize="small" /> Select Job
              </Typography>
              <MuiSelect
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="">
                  <em>Select Job</em>
                </MenuItem>
                {jobOptions.map((job) => (
                  <MenuItem key={job.value} value={job.value}>
                    {job.label}
                  </MenuItem>
                ))}
              </MuiSelect>
            </Box>
          )}
          <Box>
            <Typography sx={{ mb: 1, fontWeight: 500, display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: theme.palette.success.main }} fontSize="small" /> Mail Content
            </Typography>
            <ReactQuill
              theme="snow"
              value={mailContent}
              onChange={setMailContent}
              placeholder="Enter mail content..."
              style={{ background: "#fff" }}
            />
          </Box>
          {mailType === "general" && (
            <Box>
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon sx={{ color: theme.palette.info.main }} />}
                component="label"
              >
                Upload CSV (Receiver's Emails)
                <input
                  type="file"
                  accept=".csv"
                  hidden
                  ref={fileInputRef}
                  onChange={(e) => setCsvFile(e.target.files[0])}
                />
              </Button>
              {csvFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {csvFile.name}
                </Typography>
              )}
            </Box>
          )}
          <Button variant="contained" color="primary" sx={{ width: 200 }}>
            Create Mail Job
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Previous Mails
        </Typography>
        <DataTable
          columns={columns}
          data={previousMails}
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