import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Chip,
  Tooltip,
  IconButton,
  CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

// Dummy job data
// Status color mapping using theme
const statusColor = (status, theme) => {
  switch (status) {
    case "draft":
      return theme.palette.neutral.main;
    case "pending_approval":
      return theme.palette.info.main;
    case "active":
      return theme.palette.success.main;
    case "rejected":
      return theme.palette.error.main;
    case "expired":
      return theme.palette.warning.main;
    default:
      return theme.palette.text.primary;
  }
};

const statusMap = {
  0: "draft",
  1: "pending_approval",
  2: "active",
  3: "rejected",
  4: "expired"
}

export default function Jobs() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchJobs = async () => {
      try {
          const employerId = 16578;
          // const url = "http://127.0.0.1:8000/api/employer/16578/jobs/";
          const url = "employer/jobs";
          const response = await axiosInstance.get(url);
          console.log("response")
          console.log(response)
          // const response = await axiosInstance.get(`/employer/${employerId}/jobs/`);
          const data = response.data.results;
          const formattedJobs = data.map((job) => ({
            ...job,
            status: statusMap[job.job_status]
          }))
          setJobs(formattedJobs);

      } catch (error) {
          console.error("Error fetching jobs", error);
          setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);


  // Row click handler
  const handleRowClicked = (row) => {
    if (row.status === "draft") {
      navigate(`/employer/jobs/edit/${row.id}`);
    } else {
      navigate(`/employer/jobs/${row.id}`);
    }
  };


  const columns = [
    {
      name: "Job ID",
      selector: (row) => row.id,
      sortable: true,
      width: "90px",
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      grow: 2,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <Chip
          size="small"
          label={row.status.replace("_", " ").toLowerCase()}
          sx={{
            backgroundColor: statusColor(row.status, theme),
            color: "#fff",
            fontWeight: 500,
            letterSpacing: 1,
            fontSize: "0.75rem",
            height: 24,
            px: 1.2,
          }}
        />
      ),
      sortable: true,
      width: "170px",
    },
    {
      name: "Edit",
      cell: (row) =>
        row.status === "draft" ? (
          <Tooltip title="Edit Job">
            <IconButton
              color="primary"
              onClick={() => navigate(`/employer/jobs/edit/${row.id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Typography variant="body2" color="text.secondary">
            N/A
          </Typography>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "90px",
    },
    {
      name: "Applicants",
      cell: (row) =>
        ["active", "expired"].includes(row.status) ? (
          <Button
            variant="text"
            color="primary"
            sx={{ minWidth: 0, p: 0, fontWeight: 600 }}
            onClick={() => navigate(`/employer/jobs/${row.id}`)}
          >
            {row.num_applicants}
          </Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            N/A
          </Typography>
        ),
      sortable: false,
      width: "120px",
    },
    {
      name: "Last Application Date",
      selector: (row) => row.last_app_date_human,
      sortable: true,
      width: "180px",
    },
  ];

  if(error){ return <Typography>Error in fetching jobs.</Typography>}
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
     <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          Jobs
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/employer/jobs/add")}
          sx={{ fontWeight: 600, letterSpacing: 1 }}
        >
          Add Job
        </Button>
      </Box>
      <DataTable
        columns={columns}
        data={jobs}
        highlightOnHover
        pointerOnHover
        striped
        responsive
        pagination
        onRowClicked={handleRowClicked}
        customStyles={{
          headCells: {
            style: {
              fontWeight: 700,
              fontSize: "1rem",
              background: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            },
          },
          rows: {
            style: {
              fontSize: "1rem",
              minHeight: "56px",
            },
          },
        }}
      />
    </Box>
  );
}