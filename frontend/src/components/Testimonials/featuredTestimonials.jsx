/* eslint-disable react/prop-types */
import React from "react";
import { Box } from "@mui/material";
import TestimonialsSection from "./testimonials";
import TitleAndVideo from "./title&video";


function FeaturedTestimonialsVideos(props) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "2rem" }}>

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
