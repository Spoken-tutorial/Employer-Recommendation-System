import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function ContactUsForm() {
  return (
    <>
      {/* parent container */}
      <Container>
        {/* form */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={3}
          sx={{ mt: "2rem" }}
        >
          {/* info text */}
          <Grid
            item
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ fontSize: "1rem", opacity: "60%", mt: "-1rem", mb: "1rem" }}
            >
              Want to send us feedback? Need details about our platform? Let us
              know.
            </Typography>
          </Grid>

          {/* name */}
          <Grid
            item
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <TextField
              id="outlined-basic"
              label="Your Name"
              variant="outlined"
              type="text"
              sx={{
                width: "80%",
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
          </Grid>

          {/* email */}
          <Grid
            item
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <TextField
              id="outlined-basic"
              label="Your Email"
              variant="outlined"
              type="email"
              sx={{
                width: "80%",
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
          </Grid>

          {/* message */}
          <Grid
            item
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <TextField
              id="outlined-basic"
              label="Your Message"
              variant="outlined"
              multiline
              type="text"
              sx={{
                width: "80%",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#002648",
                  },
                },
                "& label.Mui-focused": {
                  color: "#002648",
                },
              }}
              rows={8}
            />
          </Grid>

          {/* send button */}
          <Grid
            item
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "80%",
              }}
            >
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: "#054C77",
                  color: "#ffffff",
                  mt: "1.5rem",

                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.9rem",
                    md: "0.8rem",
                  },
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "#002648",
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ContactUsForm;
