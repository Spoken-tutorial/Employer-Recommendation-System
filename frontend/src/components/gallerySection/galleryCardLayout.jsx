/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import ImageViewModal from "./imageViewModal";
function GalleryCardLayout({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          width: { xs: "17rem", sm: "18rem", md: "20rem", lg: "19rem" },
          height: { xs: "8rem", sm: "9.5rem" },
          borderStyle: "solid",
          borderWidth: "0.02rem",
          borderRadius: "0.3rem",
          borderColor: "#ffffff",
          boxShadow: "4px 5px 8px rgba(0, 0, 0, 0.3)",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <Grid container>
          <Grid item xs={4} sx={{ borderRadius: "0.5rem" }}>
            <Avatar
              alt="JRS Gallery"
              variant="square"
              src={data.url}
              sx={{
                width: { xs: "17rem", sm: "18rem", md: "20rem", lg: "19rem" },
                height: { xs: "8rem", sm: "9.5rem" },
                borderRadius: "0.4rem",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={{
          backdropFilter: "blur(3px) brightness(0.5)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          justifyContent: "center",
        }}
        open={open}
        onClick={handleClose}
      >
        <ImageViewModal url={data.url}></ImageViewModal>
      </Backdrop>
    </>
  );
}
export default GalleryCardLayout;
