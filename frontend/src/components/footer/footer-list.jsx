import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function FooterList({ fTitle, fList }) {
  return (
    <>
      <Typography
        variant="subtitle2"
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
          mb: 2,
          textAlign: { xs: "center", md: "left" },
          fontSize: "1rem"
        }}
      >
        {fTitle}
      </Typography>
      {fList.map((obj, index) => (
        <Link
          key={index}
          to={obj.url}
          style={{ textDecoration: "none" }}
          target="_blank"
          reloadDocument
        >
          <Typography
            variant="caption"
            display="block"
            sx={{
              color: "#ffffff",
              mb: 1,
              textAlign: { xs: "center", md: "left" },
              fontSize: "0.875rem",
              "&:hover": {
                color: "#FFA500CC",
                textDecoration: "underline"
              },
            }}
          >
            {obj.title}
          </Typography>
        </Link>
      ))}
    </>
  );
}
FooterList.propTypes = {
  fTitle: PropTypes.string.isRequired,
  fList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FooterList;