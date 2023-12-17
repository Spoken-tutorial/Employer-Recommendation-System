import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";
import TestimonialsSection from "./testimonials";
import TitleAndVideo from "./title&video";
import {
  testimonialList1,
  testimonialList2,
} from "../../constants/testimonials";
import { scrollToTop } from "../../utils/scrollToTop";

function ViewAllTestimonialsVideos() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HashLink
          to="/#testimonials"
          style={{ textDecoration: "none" }}
          scroll={(el) => scrollWithOffset(el)}
        >
          <Button size="small" variant="text">
            Go Back
          </Button>
        </HashLink>
      </Box>
      <TitleAndVideo
        data={testimonialList1}
        defaultExpand={true}
      ></TitleAndVideo>
      <TitleAndVideo
        data={testimonialList2}
        defaultExpand={false}
      ></TitleAndVideo>
    </>
  );
}
function ViewAllTestimonials() {
  return (
    <TestimonialsSection
      Component={<ViewAllTestimonialsVideos />}
    ></TestimonialsSection>
  );
}

export default ViewAllTestimonials;
