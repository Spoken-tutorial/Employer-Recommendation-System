/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, Form } from "react-router-dom";
import { isTokenExpired } from "../../utils/auth/tokenExpiryCheck";

function LoginSigup({ type, homepage }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: type === "lg" ? "none" : "flex",
          sm: type === "lg" ? "none" : "flex",
          md: type === "lg" ? "flex" : "none",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent={type === "lg" ? "flex-end" : "flex-start"}
      >
        {homepage ? (
          <Grid item>
            <NavLink to="login" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Button sx={{ p: 0 }}>
                  <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    sx={{
                      color: isActive ? "#FFA500CC" : "#ffffff",
                      mt: "0.3rem",
                    }}
                  >
                    {localStorage.getItem("refresh") != undefined &&
                    isTokenExpired(localStorage.getItem("referesh"))
                      ? "Dashboard"
                      : "Login"}
                  </Typography>
                </Button>
              )}
            </NavLink>
          </Grid>
        ) : (
          <Grid item>
            <Form method="post" action="/auth/STUDENT">
              <Button sx={{ p: 0 }} type="submit">
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  sx={{
                    color: "#ffffff",
                    mt: "0.3rem",
                  }}
                >
                  Logout
                </Typography>
              </Button>
            </Form>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
LoginSigup.propTypes = {
  type: PropTypes.string.isRequired,
};

export default LoginSigup;
