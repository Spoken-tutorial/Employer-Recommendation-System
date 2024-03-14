import React, { useEffect, Suspense } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CompanyLayout from "./companyCardLayout";
import CompaniesSection from "./companies";
import PagePagination from "../common/pagination";
import { scrollToTop } from "../../utils/scrollToTop";
import { defer, useLoaderData, Await } from "react-router-dom";
import { getViewAllCompanies } from "../../utils/api/homepage/viewAllOptions";
import Spinner from "../common/Spinner";

function ViewAllCompaniesCards() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const { viewAllComapnies } = useLoaderData();

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
        <Suspense
          fallback={
            <Box sx={{ height: "10rem" }}>
              <Spinner></Spinner>
            </Box>
          }
        >
          <Await resolve={viewAllComapnies}>
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
                  <CompanyLayout data={obj}></CompanyLayout>
                </Grid>
              ))
            }
          </Await>
        </Suspense>
      </Grid>
      <Suspense fallback={<></>}>
        <Await resolve={viewAllComapnies}>
          {(data) => (
            <PagePagination
              baseUrl={"/companies/view-all/"}
              count={data.total_page_numbers}
            ></PagePagination>
          )}
        </Await>
      </Suspense>
    </>
  );
}
function ViewAllCompanies() {
  return (
    <CompaniesSection Component={<ViewAllCompaniesCards />}></CompaniesSection>
  );
}

export default ViewAllCompanies;

export function loader({ params }) {
  const pageNum = params.pageNum;
  return defer({ viewAllComapnies: getViewAllCompanies(pageNum) });
}
