/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { isTokenExpired } from "../../../utils/auth/tokenExpiryCheck";
import { jwtDecode } from "jwt-decode";
import Typography from "@mui/material/Typography";
import { updatePasswordFromProfile } from "../../../utils/api/ResetPassword/resetPassword";

import { useNavigation, Form, useActionData } from "react-router-dom";

function PasswordChange(props) {
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

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
        // error
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
      <>
        {passwordResetSuccess ? (
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", mt: "1rem" }}
          >
            Password Updated Successfully
          </Typography>
        ) : null}

        {/* password reset component */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", mt: "1rem" }}
        >
          Change Your Password
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
          <Form method="post" action={"/auth/" + props.role + "/settings"}>
            {/* current password */}
            <Box
              sx={{
                mb: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                error={passwordError}
                id="currentPassword"
                name="currentPassword"
                label="Current Password"
                type="password"
                variant="outlined"
                required
                size="small"
                fullWidth
                sx={{
                  width: {
                    xs: "18rem",
                    sm: "100%",
                    md: "25rem",
                    lg: "25rem",
                    xl: "25rem",
                  },

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
            {/* new password */}
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
                id="newPassword"
                name="newPassword"
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
    </Box>
  );
}

export default PasswordChange;

export async function action({ request }) {
  const formData = await request.formData();

  const current_password = formData.get("currentPassword");
  const new_password = formData.get("newPassword");
  const confirm_password = formData.get("confirmPassword");

  const accessToken = localStorage.getItem("access");
  const tokenExpired = isTokenExpired(accessToken);

  //token expired or any issue in token
  if (tokenExpired) {
    const response = {
      status: 500,
      message: "Please login again to update password.",
    };
    return response;
  }

  //password match check
  if (new_password != confirm_password) {
    const response = {
      status: 400,
      message: "New Password & Current Password didn't match",
    };
    return response;
  } else {
    //password matched and all rules followed backend call
    //pass email also
    const decoded = jwtDecode(accessToken);
    const response = await updatePasswordFromProfile(
      decoded.email,
      current_password,
      new_password
    );
    return response;
  }
}
