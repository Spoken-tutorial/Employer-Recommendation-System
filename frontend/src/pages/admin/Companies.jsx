import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Box,
  Typography,
  Chip,
  Select,
  MenuItem,
  Avatar,
  InputAdornment,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";

// Dummy data
const initialCompanies = [
  {
    id: 1,
    name: "TechCorp",
    employerEmail: "alice@techcorp.com",
    employerName: "Alice Smith",
    addedOn: "2024-07-01",
    status: "pending_approval",
  },
  {
    id: 2,
    name: "DataWorks",
    employerEmail: "bob@dataworks.com",
    employerName: "Bob Johnson",
    addedOn: "2024-06-20",
    status: "approved",
  },
  {
    id: 3,
    name: "Designify",
    employerEmail: "carol@designify.com",
    employerName: "Carol Lee",
    addedOn: "2024-06-15",
    status: "rejected",
  },
];

const statusOptions = [
  "pending_approval",
  "approved",
  "rejected",
  "inactive",
];

export default function Companies() {
  const [companies, setCompanies] = useState(initialCompanies);
  const navigate = useNavigate();

  const handleStatusChange = (id, value) => {
    setCompanies((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, status: value } : row
      )
    );
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending_approval":
        return "info";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "inactive":
        return "warning";
      default:
        return "default";
    }
  };

  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <Box display="flex" alignItems="center" gap={1}>
          <BusinessIcon color="primary" fontSize="small" />
          <Typography>{row.name}</Typography>
        </Box>
      ),
    },
    {
      name: "Employer Email",
      selector: (row) => row.employerEmail,
      sortable: true,
      cell: (row) => (
        <Box display="flex" alignItems="center" gap={1}>
          <EmailOutlinedIcon color="action" fontSize="small" />
          <Typography>{row.employerEmail}</Typography>
        </Box>
      ),
    },
    {
      name: "Employer Name",
      selector: (row) => row.employerName,
      sortable: true,
      cell: (row) => (
        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon color="action" fontSize="small" />
          <Typography>{row.employerName}</Typography>
        </Box>
      ),
    },
    {
      name: "Added On",
      selector: (row) => row.addedOn,
      sortable: true,
      cell: (row) => (
        <Box display="flex" alignItems="center" gap={1}>
          <CalendarTodayIcon color="action" fontSize="small" />
          <Typography>{row.addedOn}</Typography>
        </Box>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Select
          value={row.status}
          size="small"
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          variant="standard"
          sx={{ minWidth: 120 }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Chip
                label={option.replace("_", " ").toUpperCase()}
                color={statusColor(option)}
                size="small"
                sx={{ fontWeight: 500 }}
              />
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "primary.main", mb: 3 }}
      >
        Companies
      </Typography>
      <DataTable
        columns={columns}
        data={companies}
        highlightOnHover
        pointerOnHover
        striped
        responsive
        pagination
        onRowClicked={(row) => navigate(`/companies/${row.id}`)}
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
    </Box>
  );
}