import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EventLayout from "./eventCardLayout";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";
import EventSection from "./eventSectionLayout";
import { scrollToTop } from "../../utils/scrollToTop";
import { defer, useLoaderData, Await } from "react-router-dom";
import PagePagination from "../common/pagination";
import { getViewAllEvents } from "../../utils/api/homepage/viewAllOptions";
import Spinner from "../common/Spinner";

function ViewAllEventsCards() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const { viewAllEvents } = useLoaderData();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HashLink
          to="/#events"
          style={{ textDecoration: "none" }}
          scroll={(el) => scrollWithOffset(el)}
        >
          <Button size="small" variant="text">
            Go Back
          </Button>
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
        <Suspense
          fallback={
            <Box sx={{ height: "10rem" }}>
              <Spinner></Spinner>
            </Box>
          }
        >
          <Await resolve={viewAllEvents}>
            {(data) =>
              data.results.map((obj, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <EventLayout data={obj} category={"past"}></EventLayout>
                </Grid>
              ))
            }
          </Await>
        </Suspense>
      </Grid>
      <Suspense fallback={<></>}>
        <Await resolve={viewAllEvents}>
          {(data) => (
            <PagePagination
              baseUrl={"/events/view-all/"}
              count={data.total_page_numbers}
            ></PagePagination>
          )}
        </Await>
      </Suspense>
    </Box>
  );
}
function ViewAllEvents() {
  return <EventSection Component={<ViewAllEventsCards />}></EventSection>;
}
export default ViewAllEvents;

export function loader({ params }) {
  const pageNum = params.pageNum;
  return defer({ viewAllEvents: getViewAllEvents(pageNum) });
}
