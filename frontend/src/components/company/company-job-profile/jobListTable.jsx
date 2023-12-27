import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Chip from "@mui/material/Chip";
import { companyJobList } from "../../../constants/companyJobList";
import "./styles.css";

function JobListTable() {
  const columns = [
    {
      field: "id",
      headerName: "SL No.",
      headerAlign: "center",
      renderHeader: () => (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "0.5rem" }}
        >
          SL No.
        </Typography>
      ),
      renderCell: (params) => {
        const data = params.value;
        return (
          <Typography variant="caption" display="block" gutterBottom>
            {data}
          </Typography>
        );
      },
      width: 200,
      align: "center",
      headerStyle: {
        fontWeight: "bold",
      },
    },
    {
      field: "jobDesignation",
      headerName: "Designation",
      renderHeader: () => (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "0.5rem" }}
        >
          Designation
        </Typography>
      ),
      renderCell: (params) => {
        const data = params.value;
        return (
          <Typography variant="caption" display="block" gutterBottom>
            {data}
          </Typography>
        );
      },
      width: 250,
    },
    {
      field: "jobStatus",
      headerName: "Status",
      renderHeader: () => (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "0.5rem" }}
        >
          Status
        </Typography>
      ),
      width: 200,
      renderCell: (params) => {
        const status = params.value;
        return (
          <Chip
            label={status}
            sx={{ p: "0.3rem", fontSize: "0.7rem", height: "1.2rem" }}
            variant="outlined"
            size="small"
            color={
              status == "Approved"
                ? "success"
                : status == "Rejected"
                  ? "error"
                  : status == "Draft"
                    ? "warning"
                    : status == "Pending"
                      ? "secondary"
                      : "null"
            }
          />
        );
      },
    },
    {
      field: "jobCreationDate",
      headerName: "Created On",
      renderHeader: () => (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "0.5rem" }}
        >
          Created On
        </Typography>
      ),
      renderCell: (params) => {
        const data = params.value;
        return (
          <Typography variant="caption" display="block" gutterBottom>
            {data}
          </Typography>
        );
      },
      width: 250,
      align: "left",
    },
    {
      field: "jobAction",
      headerName: "Action",
      renderHeader: () => (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "0.5rem" }}
        >
          Action
        </Typography>
      ),
      type: "action",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: () => {
        return (
          <Box>
            <IconButton>
              <EditOutlinedIcon sx={{ fontSize: "large" }} />
            </IconButton>
            <IconButton>
              <DeleteOutlineOutlinedIcon sx={{ fontSize: "large" }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        mt: "1rem",
        width: "100%",
      }}
    >
      <DataGrid
        rows={companyJobList}
        columns={columns}
        autoHeight={true}
        hideFooterSelectedRowCount={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}

export default JobListTable;
