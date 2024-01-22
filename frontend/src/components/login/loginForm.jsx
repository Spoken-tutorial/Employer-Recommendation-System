import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

function LoginForm() {
  const [emailError, setEmailErro] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  //to be implemented in future
  function check() {
    setEmailErro(true);
    setEmailHelperText("Invalid Email");
    setPasswordError(true);
    setPasswordHelperText("Incorrect Password");
  }
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", mt: "3rem" }}
        >
          Sign in to your account
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            alignContent: "center",
            mt: "1rem",
          }}
        >
          <Box>
            <Alert severity="info">
              <AlertTitle sx={{ fontWeight: "bold" }}>
                Note for Spoken Tutorial registered students
              </AlertTitle>
              Please use email & password registered with Spoken Tutorial
            </Alert>
            <Box
              sx={{
                mt: "1.8rem",
                mb: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                error={emailError}
                id="email"
                label="Email address"
                variant="outlined"
                required
                size="small"
                fullWidth
                helperText={emailHelperText}
                sx={{
                  width: { xs: "18rem", sm: "100%" },

                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#002648",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#002648",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                mt: "1.5rem",
                mb: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                error={passwordError}
                id="password"
                label="Password"
                required
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                helperText={passwordHelperText}
                sx={{
                  width: { xs: "18rem", sm: "100%" },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#002648",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#002648",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                mb: "1rem",
                mt: "1.5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                size="small"
                fullWidth
                variant="contained"
                sx={{
                  width: { xs: "18rem", sm: "100%" },
                  backgroundColor: "#054C77",
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "#002648",
                  },
                }}
                onClick={check}
              >
                Login
              </Button>
            </Box>
            <Box
              sx={{
                mb: "1.5rem",
                mt: "1.5rem",
              }}
            >
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: { xs: "0.8rem", sm: "0" } }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  reloadDocument
                  to="https://spoken-tutorial.org/accounts/forgot-password/"
                  target="_blank"
                >
                  Forgot Password?
                </Link>
                ( Reset your password with Spoken Tutorial )
              </Typography>

              <Typography
                variant="caption"
                display="block"
                sx={{ mb: "1rem", mt: "0.5rem", ml: { xs: "0.8rem", sm: "0" } }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  reloadDocument
                  to="https://process.spoken-tutorial.org/index.php/Software-Training#Contacts_For_Training"
                  target="_blank"
                >
                  Need Help?
                </Link>{" "}
                ( Contact your Training Manager )
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;
