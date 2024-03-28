/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, useNavigation } from "react-router-dom";
import { Typography } from "@mui/material";

export default function SendPasswordResetLink({ linkSent, linkSentError }) {
  const [open, setOpen] = React.useState(false);

  const navigation = useNavigation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{
          height: "1rem",
          ml: "-0.2rem",
        }}
      >
        Forgot Passwrod?
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {linkSent ? "Email has been sent" : "Forgot Password"}
        </DialogTitle>

        <Form method="post" action="/login">
          <DialogContent>
            {/* error message display */}
            {linkSentError ? (
              <Typography sx={{ color: "red", mb: "0.5rem" }}>
                Error in sending reset link, kindly check given email.
              </Typography>
            ) : null}

            <DialogContentText>
              {linkSent
                ? "Please Check your email inbox for a password recovery link. Don't forget to check your spam folder."
                : "Enter the email address you use. We'll send you a link to reset your password."}
            </DialogContentText>

            {/* email input */}
            {!linkSent ? (
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                disabled={linkSent}
                type="email"
                fullWidth
                variant="standard"
                sx={{
                  "& .MuiTextInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#002648",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#002648",
                  },
                  mt: "1rem",
                }}
              />
            ) : null}
          </DialogContent>

          <DialogActions>
            {/* buttons switching on basis of situation */}
            {linkSent ? (
              <Button onClick={handleClose}>Close</Button>
            ) : (
              <>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  type="submit"
                  name="actionType"
                  value="reset"
                  disabled={navigation.state === "submitting" ? true : false}
                >
                  {navigation.state == "submitting"
                    ? "Please Wait..."
                    : "Reset Password"}
                </Button>
              </>
            )}
          </DialogActions>
        </Form>
      </Dialog>
    </React.Fragment>
  );
}
