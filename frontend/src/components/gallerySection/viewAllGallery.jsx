import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import GalleryCardLayout from "./galleryCardLayout";
import { viewAllGalleryList } from "../../constants/viewAllGallery";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";
import GallerySectionLayout from "./gallerySectionLayout";
import { scrollToTop } from "../../utils/scrollToTop";

function ViewAllGalleryCards() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HashLink
          to="/#gallery"
          style={{ textDecoration: "none" }}
          scroll={(el) => scrollWithOffset(el)}
        >
        </HashLink>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        rowSpacing={4}
        sx={{ marginTop: "-1rem" }}
      >
        {viewAllGalleryList.map((obj, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <GalleryCardLayout data={obj}></GalleryCardLayout>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
function ViewAllGallery() {
  return (
    <GallerySectionLayout
      Component={<ViewAllGalleryCards />}
    ></GallerySectionLayout>
  );
}

export default ViewAllGallery;
