/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90vh",
  width: { xs: "20rem", sm: "35rem", md: "35rem", lg: "38rem", xl: "50rem" },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  overflow: "auto",
  p: 4,
};

// eslint-disable-next-line react/prop-types
export default function AddProjectModal({ projects, setProjects }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [projectUrl, setProjectUrl] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleAddNewProject = () => {
    setProjects([
      ...projects,
      { url: projectUrl, description: projectDescription },
    ]);
    setProjectUrl("");
    setProjectDescription("");
    handleClose();
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        disabled={projects.length == 5 ? true : false}
        variant="outlined"
        size="small"
        sx={{
          mt: "0.7rem",
          borderColor: "#002648",
          color: "#002648",
          "&:hover": {
            borderColor: "#002648",
          },
        }}
      >
        Add Project
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold", color: "#002648" }}
          >
            Project #{projects.length + 1}
          </Typography>
          <Divider
            sx={{
              backgroundColor: "#000000",
              mt: "0.3rem",
            }}
          ></Divider>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            sx={{ mb: "0.4rem" }}
          >
            <Grid item sx={{ display: "flex", mt: "1.5rem", width: "100%" }}>
              <TextField
                fullWidth
                id="projectUrl"
                label="Project URL"
                variant="outlined"
                size="small"
                value={projectUrl}
                onChange={(event) => setProjectUrl(event.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#002648",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#002648",
                  },
                }}
              />
            </Grid>
            <Grid item sx={{ display: "flex", mt: "1rem", width: "100%" }}>
              <TextField
                fullWidth
                id="projectDescription"
                label="Project Description"
                variant="outlined"
                multiline
                value={projectDescription}
                onChange={(event) => setProjectDescription(event.target.value)}
                rows={8}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#002648",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#002648",
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddNewProject}
              sx={{
                borderColor: "#002648",
                color: "#002648",
                "&:hover": {
                  borderColor: "#002648",
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
