import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { setNewPassword } from "../../../utils/api/ResetPassword/resetPassword";

import {
  useNavigation,
  Form,
  useParams,
  useActionData,
  Link,
  useLocation,
} from "react-router-dom";

//to remember the password token once user opens the link throguh email
let token;

function NewPasswordInput() {
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  //extracting token from url on first page load
  let { password_token } = useParams();

  //to extract remembered token from state of Form submit
  let { state } = useLocation();

  //logic to remember the password token on each page load
  if (state) {
    token = state.token;
  } else if (password_token) {
    token = password_token;
  }

  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      if (actionData.status == 200) {
        //password reset successfully
        setPasswordError(false);
        setConfirmPasswordError(false);
        setPasswordResetSuccess(true);
        //re route to login can be done here directly but success message?
      } else {
        //unknown error
        //error in password input
        //updating remembered password token here for further page load
        token = state.token;
        setPasswordError(true);
        setConfirmPasswordError(true);
        setErrorText(actionData.message);
      }
    }
  }, [actionData]);

  const navigation = useNavigation();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: "-4rem",
      }}
    >
      {/* display success message if reset is success */}
      {passwordResetSuccess ? (
        <>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", mt: "1rem" }}
          >
            Password Reset Successfully
          </Typography>
          <Link style={{ textDecoration: "none" }} to="/login">
            Click here to redirect to login page
          </Link>
        </>
      ) : (
        // reset form
        <>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", mt: "1rem" }}
          >
            Reset Your Password
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
            <Form
              method="post"
              action="/reset-password/:password_token"
              state={{ token: token }}
            >
              {/* password */}
              <Box
                sx={{
                  mt: "1.8rem",
                  mb: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  error={passwordError}
                  id="password"
                  name="password"
                  label="New Password"
                  type="password"
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

              {/* confirm password */}
              <Box
                sx={{
                  mt: "1.8rem",
                  mb: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  error={confirmPasswordError}
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
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

              {/* dynamic error helper text */}
              {passwordError || confirmPasswordError ? (
                <Typography
                  sx={{ color: "red", fontSize: "0.8rem", opacity: "80%" }}
                >
                  {errorText}
                </Typography>
              ) : null}

              {/* submit button */}
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
                  name="actionType"
                  value="login"
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
                    : "Change Password"}
                </Button>
              </Box>
            </Form>
          </Box>
        </>
      )}
    </Box>
  );
}

export default NewPasswordInput;

export async function action({ request }) {
  const formData = await request.formData();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  //password match check
  if (password != confirmPassword) {
    const response = { status: 400, message: "Invalid password" };
    return response;
  } else {
    //password matched and all rules followed backend call
    const response = await setNewPassword(password, token);
    return response;
  }
}
