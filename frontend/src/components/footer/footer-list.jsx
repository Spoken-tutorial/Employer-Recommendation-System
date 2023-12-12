import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

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
      {fList.map((text, index) => (
        <Typography
          key={index}
          variant="caption"
          display="block"
          gutterBottom
          sx={{
            color: "#ffffff",
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
          {text}
        </Typography>
      ))}
    </>
  );
}
FooterList.propTypes = {
  fTitle: PropTypes.string.isRequired,
  fList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FooterList;
