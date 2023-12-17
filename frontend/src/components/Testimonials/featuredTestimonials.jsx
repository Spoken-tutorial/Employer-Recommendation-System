import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TestimonialsSection from "./testimonials";
import { testimonialList1 } from "../../constants/testimonials";
import TitleAndVideo from "./title&video";

function FeaturedTestimonialsVideos() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="testimonials/view-all" style={{ textDecoration: "none" }}>
          <Button size="small" variant="text">
            View all
          </Button>
        </Link>
      </Box>
      <TitleAndVideo
        data={testimonialList1}
        defaultExpand={true}
      ></TitleAndVideo>
    </>
  );
}
function FeaturedTestimonials() {
  return (
    <TestimonialsSection
      Component={<FeaturedTestimonialsVideos />}
    ></TestimonialsSection>
  );
}

export default FeaturedTestimonials;
