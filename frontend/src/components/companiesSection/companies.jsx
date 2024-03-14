/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CompaniesSection(props) {
  const base_url = "/";
  const isBaseUrl = () => window.location.pathname === base_url;
  return (
    <>
      <Box
        sx={{
          marginTop: "2rem",
          p: "1rem",
          marginBottom: "3.5rem",
        }}
        id="companies"
      >
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bolder',
            color: '#054C77',
            fontSize: { xs: '1.5rem' },
          }}
        >
          Companies
        </Typography>
        {
          isBaseUrl() ? (
            <Link to="companies/view-all/" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" endIcon={<ArrowForwardIcon />}>
                Explore All
              </Button>
            </Link>
          ):(
            <HashLink
              to="/#companies"
              style={{ textDecoration: "none" }}
              scroll={(el) => scrollWithOffset(el)}
            >
              <Button variant="outlined"  startIcon={<ArrowBackIcon /> }>
                Go Back
              </Button>
            </HashLink>
          )
        }
      </Box>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
          }}
        ></Divider>
        {props.Component}
      </Box>
    </>
  );
}

export default CompaniesSection;
