/* eslint-disable react/prop-types */
import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import TestimonialsSection from "./testimonials";

function FeaturedTestimonialsVideos(props) {
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
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                }
              }}
            >
              {/* Video Section - matching react-django implementation */}
              <Box sx={{ position: "relative" }}>
                <video 
                  width="100%" 
                  height="200"
                  controls 
                  onContextMenu={() => false}
                  style={{ 
                    borderTopLeftRadius: "8px", 
                    borderTopRightRadius: "8px",
                    backgroundColor: "#f5f5f5",
                    objectFit: "cover"
                  }}
                >
                  <source src={obj.location || ""} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Overlay message when no video */}
                {!obj.location && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      color: "#666",
                      fontSize: "0.9rem"
                    }}
                  >
                    No video available
                  </Box>
                )}
              </Box>
              
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" component="h3" sx={{ mb: 1, fontSize: "1rem" }}>
                  {obj.name || "Testimonial Author"}
                </Typography>
                {obj.about && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {obj.about}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "text.secondary" }}>
                  {obj.desc || "This is a testimonial description..."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function FeaturedTestimonials(props) {
  return (
    <TestimonialsSection
      Component={<FeaturedTestimonialsVideos data={props.data} />}
    ></TestimonialsSection>
  );
}

export default FeaturedTestimonials;