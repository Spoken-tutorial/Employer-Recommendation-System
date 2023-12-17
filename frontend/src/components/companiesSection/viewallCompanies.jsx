import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CompanyLayout from "./companyCardLayout";
import { viewAllCompanyList } from "../../constants/viewAllCompanies";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";
import CompaniesSection from "./companies";
import { scrollToTop } from "../../utils/scrollToTop";

function ViewAllCompaniesCards() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HashLink
          to="/#companies"
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
        {viewAllCompanyList.map((obj, index) => (
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
function ViewAllCompanies() {
  return (
    <CompaniesSection Component={<ViewAllCompaniesCards />}></CompaniesSection>
  );
}

export default ViewAllCompanies;
