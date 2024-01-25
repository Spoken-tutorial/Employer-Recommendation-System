import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";
import TestimonialsSection from "./testimonials";
import TitleAndVideo from "./title&video";
import { scrollToTop } from "../../utils/scrollToTop";
import { getViewAllTestimonials } from "../../utils/api/homepage/viewAllOptions";
import { useLoaderData } from "react-router-dom";
import PagePagination from "../common/pagination";

function ViewAllTestimonialsVideos() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const testimonialsData = useLoaderData();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "2rem" }}>
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
        data={testimonialsData.results}
        defaultExpand={true}
      ></TitleAndVideo>
      <PagePagination
        baseUrl={"/testimonials/view-all/"}
        count={Math.ceil(testimonialsData.count / 2)}
      ></PagePagination>
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

export function loader({ params }) {
  const pageNum = params.pageNum;
  return getViewAllTestimonials(pageNum);
}
