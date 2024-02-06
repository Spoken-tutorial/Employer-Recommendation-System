import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { isTokenExpired } from "../../utils/auth/tokenExpiryCheck";

function LoginSigup({ type }) {
  const refresh = localStorage.getItem("refresh");
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    if (refresh == undefined || null) {
      setIsLoggedIn(false);
    } else {
      //check expiry of refresh token
      if (isTokenExpired(refresh)) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [refresh]);

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
                  {isLoggedIn ? "Dashboard" : "Login"}
                </Typography>
              </Button>
            )}
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
}
LoginSigup.propTypes = {
  type: PropTypes.string.isRequired,
};

export default LoginSigup;
