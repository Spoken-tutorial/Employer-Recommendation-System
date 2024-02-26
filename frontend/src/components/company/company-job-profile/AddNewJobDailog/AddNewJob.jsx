import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import JobDetails from "./JobDetails";
import Avatar from "@mui/material/Avatar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddNewJob() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        size="small"
        variant="text"
        sx={{
          mt: { xs: "0.8rem", sm: "1rem", md: "0.2rem" },
          height: "1.5rem",
        }}
      >
        New Job +
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#002648" }}>
          <Box sx={{ display: "flex", height: "4rem" }}>
            <Avatar
              sx={{
                backgroundColor: "#ffffff",
                mt: "0.7rem",
                ml: "1rem",
              }}
              alt="IIT Bombay"
              src="https://jrs.spoken-tutorial.org/static/images/st-logo.png"
            />
            <Typography
              sx={{
                ml: 1.5,
                flex: 1,
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                  md: "1.1rem",
                  lg: "1.3rem",
                },
                letterSpacing: "0.05rem",
                fontWeight: "bold",
                mt: "1.2rem",
              }}
              variant="h6"
              component="div"
            >
              Spoken Tutorial JRS
            </Typography>

            <Button
              autoFocus
              color="inherit"
              onClick={handleClose}
              sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}
            >
              Cancel
            </Button>
            <Button
              autoFocus
              color="inherit"
              onClick={handleClose}
              sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}
            >
              Add
            </Button>
          </Box>
        </AppBar>
        {/* content of dailog */}
        <JobDetails></JobDetails>
      </Dialog>
    </React.Fragment>
  );
}
