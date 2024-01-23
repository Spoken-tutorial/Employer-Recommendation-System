/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import OpenInFullTwoToneIcon from "@mui/icons-material/OpenInFullTwoTone";
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
export default function EventModal({ data, category }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <OpenInFullTwoToneIcon
          sx={{
            width: "1rem",
            color: "#002648",
            "&:hover": {
              transform: "scale(1.3)",
            },
          }}
        ></OpenInFullTwoToneIcon>
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
            sx={{ fontWeight: "bold" }}
          >
            {data.name}
          </Typography>
          <Divider
            sx={{ backgroundColor: "#000000", height: "0.05rem", mt: "0.8rem" }}
          ></Divider>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            sx={{ mb: "0.4rem" }}
          >
            <Grid item sx={{ display: "flex", mt: "0.5rem" }}>
              <Typography sx={{ fontWeight: "bold" }}>Start Date: </Typography>
              <Typography sx={{ ml: "0.5rem" }}>
                {data.formatted_start_date}
              </Typography>
            </Grid>
            <Grid item sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold" }}>End Date:</Typography>
              <Typography sx={{ ml: "0.5rem" }}>
                {data.formatted_end_date}
              </Typography>
            </Grid>
            {/* <Grid item sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold" }}>Location:</Typography>
              <Typography sx={{ ml: "0.5rem" }}>
                {data.formatted_end_date}
              </Typography>
            </Grid> */}
            <Grid item sx={{ display: "flex", mb: "0.5rem" }}>
              <Typography sx={{ fontWeight: "bold" }}>Status:</Typography>
              <Typography sx={{ ml: "0.5rem" }}>
                {category == "upcoming" ? "Upcoming" : "Over"}
              </Typography>
            </Grid>
          </Grid>
          <Divider
            sx={{
              backgroundColor: "#000000",
              height: "0.05rem",
              mt: "-0.5rem",
            }}
          ></Divider>

          <Typography sx={{ fontWeight: "bold", mt: "2rem" }}>
            Description
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            id="modal-modal-description"
            sx={{ mt: 1 }}
          >
            {data.description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
