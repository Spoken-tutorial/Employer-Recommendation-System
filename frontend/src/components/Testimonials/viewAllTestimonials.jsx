import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";
import TestimonialsSection from "./testimonials";
import TitleAndVideo from "./title&video";
import { scrollToTop } from "../../utils/scrollToTop";
import { getViewAllTestimonials } from "../../utils/api/homepage/viewAllOptions";
import { Await, defer, useLoaderData } from "react-router-dom";
import PagePagination from "../common/pagination";
import Spinner from "../common/Spinner";

function ViewAllTestimonialsVideos() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const { viewAllTestimonials } = useLoaderData();

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
      <Suspense
        fallback={
          <Box sx={{ height: "10rem" }}>
            <Spinner></Spinner>
          </Box>
        }
      >
        <Await resolve={viewAllTestimonials}>
          {(data) => (
            <TitleAndVideo
              data={data.results}
              defaultExpand={true}
            ></TitleAndVideo>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<></>}>
        <Await resolve={viewAllTestimonials}>
          {(data) => (
            <PagePagination
              baseUrl={"/testimonials/view-all/"}
              count={Math.ceil(data.count / 2)}
            ></PagePagination>
          )}
        </Await>
      </Suspense>
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
  return defer({ viewAllTestimonials: getViewAllTestimonials(pageNum) });
}
