import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CompanyLayout from "./companyCardLayout";
import { viewAllCompanyList } from "../../constants/viewAllCompanies";
import { Link } from "react-router-dom";
function ViewallCompanies() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="../" style={{ textDecoration: "none" }}>
          <Button size="small" variant="text">
            Go Back
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
        {viewAllCompanyList.map((obj, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
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

export default ViewallCompanies;
