/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Card, CardMedia, Box } from "@mui/material";
import GallerySectionLayout from "./gallerySectionLayout";

function FeaturedGalleryCards(props) {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, sm: 3, md: 4 }}
        rowSpacing={{ xs: 3, sm: 4, md: 4 }}
        sx={{ 
          marginTop: "2rem",
          marginBottom: "1rem" 
        }}
      >
        {props.data.map((obj, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card 
              sx={{ 
                width: "100%", 
                maxWidth: { xs: "280px", sm: "320px", md: "300px", lg: "320px" },
                minHeight: "220px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={obj.image || "https://via.placeholder.com/300x200"}
                alt={obj.alt || obj.title || "Gallery image"}
                sx={{
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  }
                }}
              />
            </Card>
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