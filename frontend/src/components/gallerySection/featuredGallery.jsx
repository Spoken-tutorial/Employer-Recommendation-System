/* eslint-disable react/prop-types */
import React from "react";
import Grid from "@mui/material/Grid";
import GallerySectionLayout from "./gallerySectionLayout";
import GalleryCardLayout from "./galleryCardLayout";

function FeaturedGalleryCards(props) {

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        rowSpacing={4}
        sx={{ marginTop: "-1rem" }}
      >
        {props.data.map((obj, index) => (
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
function FeaturedGallery(props) {
  return (
    <GallerySectionLayout
      Component={<FeaturedGalleryCards data={props.data} />}
    ></GallerySectionLayout>
  );
}

export default FeaturedGallery;
