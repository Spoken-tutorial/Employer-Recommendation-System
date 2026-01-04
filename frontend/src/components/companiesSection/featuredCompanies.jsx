/* eslint-disable react/prop-types */
import React from "react";
import Grid from "@mui/material/Grid";
import CompanyLayout from "./companyCardLayout";
import CompaniesSection from "./companies";

function FeaturedCompaniesCards(props) {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        rowSpacing={4}
        sx={{ marginTop: "1rem" }}
      >
        {props.data.map((obj, index) => (
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

function FeaturedCompanies(props) {
  return (
    <CompaniesSection
      Component={<FeaturedCompaniesCards data={props.data} />}
    ></CompaniesSection>
  );
}

export default FeaturedCompanies;