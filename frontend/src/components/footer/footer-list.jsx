import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function FooterList({ fTitle, fList }) {
  return (
    <>
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
          mt: "0.5rem",
          ml: "0.4rem",
          textAlign: {
            xs: "center",
            sm: "center",
            md: "left",
            lg: "left",
            xl: "left",
          },
        }}
      >
        {fTitle}
      </Typography>
      {fList.map((obj) => (
        <>
          <Link
            to={obj.url}
            style={{ textDecoration: "none" }}
            target="_blank"
            reloadDocument
          >
            <Typography
              key={obj.title}
              variant="caption"
              display="block"
              gutterBottom
              sx={{
                color: "#ffffff",
                ml: "0.4rem",
                mb: "0.5rem",
                textAlign: {
                  xs: "center",
                  sm: "center",
                  md: "left",
                  lg: "left",
                  xl: "left",
                },
              }}
            >
              {obj.title}
            </Typography>
          </Link>
        </>
      ))}
    </>
  );
}
FooterList.propTypes = {
  fTitle: PropTypes.string.isRequired,
  fList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FooterList;
