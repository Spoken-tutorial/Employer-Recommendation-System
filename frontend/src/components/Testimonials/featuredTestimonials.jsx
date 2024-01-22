/* eslint-disable react/prop-types */
import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TestimonialsSection from "./testimonials";
import TitleAndVideo from "./title&video";

function FeaturedTestimonialsVideos(props) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="testimonials/view-all" style={{ textDecoration: "none" }}>
          <Button size="small" variant="text">
            View all
          </Button>
        </Link>
      </Box>
      <TitleAndVideo data={props.data} defaultExpand={true}></TitleAndVideo>
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
