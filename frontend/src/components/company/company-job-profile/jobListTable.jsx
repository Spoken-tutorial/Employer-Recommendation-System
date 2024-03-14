/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//import Chip from "@mui/material/Chip";
import "./styles.css";

function JobListTable(props) {
  const columns = [
    //Job ID.
    {
      field: "id",
      headerName: "Job ID.",
      headerAlign: "center",
      renderHeader: () => (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "0.5rem" }}
        >
          Job ID
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
      width: 120,
      align: "center",
      headerStyle: {
        fontWeight: "bold",
      },
    },

    //designation
    {
      field: "designation",
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

    //status put on hold
    // {
    //   field: "jobStatus",
    //   headerName: "Status",
    //   renderHeader: () => (
    //     <Typography
    //       variant="body1"
    //       gutterBottom
    //       sx={{ fontWeight: "bold", mt: "0.5rem" }}
    //     >
    //       Status
    //     </Typography>
    //   ),
    //   width: 200,
    //   renderCell: (params) => {
    //     const status = params.value;
    //     return (
    //       <Chip
    //         label={status}
    //         sx={{ p: "0.3rem", fontSize: "0.7rem", height: "1.2rem" }}
    //         variant="outlined"
    //         size="small"
    //         color={
    //           status == "Approved"
    //             ? "success"
    //             : status == "Rejected"
    //               ? "error"
    //               : status == "Draft"
    //                 ? "warning"
    //                 : status == "Pending"
    //                   ? "secondary"
    //                   : "null"
    //         }
    //       />
    //     );
    //   },
    // },

    //created on
    {
      field: "date_created",
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
      width: 200,
      align: "left",
    },

    //deadline
    {
      field: "last_app_date",
      headerName: "Deadline",
      renderHeader: () => (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "0.5rem" }}
        >
          Deadline
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
      align: "left",
    },

    //applicants
    {
      field: "applicants_count",
      headerName: "Applicants",
      renderHeader: () => (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "0.5rem" }}
        >
          Applicants
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
      width: 150,
      align: "left",
    },

    //action buttons
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
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip
              title="Edit"
              placement="left"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -12],
                      },
                    },
                  ],
                },
              }}
            >
              <Link
                to="editJob"
                state={{ id: params.row }}
                style={{ textDecoration: "none" }}
              >
                <IconButton>
                  <EditIcon sx={{ fontSize: "large", color: "#002648" }} />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip
              title="Delete"
              placement="right"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -16],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton>
                <DeleteOutlineOutlinedIcon
                  sx={{ fontSize: "large", color: "red" }}
                />
              </IconButton>
            </Tooltip>
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
        rows={props.jobList}
        columns={columns}
        autoHeight={true}
        hideFooterSelectedRowCount={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        pageSizeOptions={[5, 10, 50]}
      />
    </Box>
  );
}

export default JobListTable;
