import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CompanyLayout from "./companyCardLayout";
import { featuredCompanyList } from "../../constants/featuredCompanies";
import { Link } from "react-router-dom";
import CompaniesSection from "./companies";

function FeaturedCompaniesCards() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="companies/view-all" style={{ textDecoration: "none" }}>
          <Button size="small" variant="text">
            View all
          </Button>
        </Link>
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
        {featuredCompanyList.map((obj, index) => (
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
        ))}
      </Grid>
    </>
  );
}
function FeaturedCompanies() {
  return (
    <CompaniesSection Component={<FeaturedCompaniesCards />}></CompaniesSection>
  );
}

export default FeaturedCompanies;
