import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CompanyLayout from "./companyLayout";
import { companyList } from "../../constants/companies";
function CompaniesSection() {
  return (
    <>
      <Box
        sx={{
          marginTop: "2rem",
          p: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
          }}
        >
          Companies
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
          }}
        ></Divider>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="small" variant="text">
            View all
          </Button>
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
          {companyList.map((obj, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={3}
              xl={3}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CompanyLayout data={obj}></CompanyLayout>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default CompaniesSection;
