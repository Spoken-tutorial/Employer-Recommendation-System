/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import {
  Link,
  useNavigate,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";
import { Form } from "react-router-dom";
import { loginUser } from "../../utils/api/login/login";
import { newLoginLocalStorage } from "../../utils/auth/localStorage";

function LoginForm() {
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (actionData != undefined) {
      if (actionData.status == 200) {
        setPasswordError(false);
        setEmailError(false);
        setPasswordHelperText("");
        //needs to be changed based on role
        navigate("/loginDashboard");
      } else {
        setPasswordError(true);
        setEmailError(true);
        setPasswordHelperText(actionData.error);
      }
    }
  }, [actionData]);

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
            <Form method="post" action="/login">
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
                  name="email"
                  label="Email Address"
                  type="text"
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
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
                  name="password"
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
                  type="submit"
                  variant="contained"
                  disabled={navigation.state === "submitting" ? true : false}
                  sx={{
                    width: { xs: "18rem", sm: "100%" },
                    backgroundColor: "#054C77",
                    "&:hover": {
                      color: "#ffffff",
                      backgroundColor: "#002648",
                    },
                  }}
                >
                  {navigation.state == "submitting"
                    ? "Please Wait..."
                    : "Login"}
                </Button>
              </Box>
            </Form>
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

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("email");
  const password = formData.get("password");

  const response = await loginUser(username, password);

  if (response.status == 200) {
    //token fetched
    const localStorageSet = newLoginLocalStorage(
      response.refresh,
      response.access
    );
    if (localStorageSet) {
      return response;
    } else {
      //local storage error
      return { error: "Error in logging you in", status: 500 };
    }
  } else if (response.token == 401) {
    //wrong credentials unauthorized
    return response;
  } else {
    //other error
    return response;
  }
}
