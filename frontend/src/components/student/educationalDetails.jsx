import React from "react";
import { Box } from "@mui/material";
import AlertBox from "../common/alertBox";
import TextField from "@mui/material/TextField";
function EducationalDetails() {
  return (
    <Box
      sx={{
        mt: "2.5rem",
        display: "flex",
        flexDirection: { xs: "column", md: "column" },
        justifyContent: "flex-start",
        width: { xs: "100%", md: "73%" },
      }}
    >
      <AlertBox
        alertMessage={"Educational Details"}
        alertType={"info"}
        style={{ mt: "0rem", width: { xs: "100%", md: "100%" } }}
      ></AlertBox>

      {/* institute name & type */}
      <Box
        sx={{
          mt: "1rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <TextField
          id="studentInstituteName"
          label="Institute Name"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="Lorem Ipsum"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            width: { xs: "auto", md: "24rem" },
          }}
        />
        <TextField
          id="studentInstituteType"
          label="Institute Type"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="Lorem Ipsum"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            ml: { xs: 0, md: "3rem" },
            mt: { xs: "2rem", md: 0 },
            width: { xs: "auto", md: "24rem" },
          }}
        />
      </Box>
      {/* universityName & Degree */}
      <Box
        sx={{
          mt: "2.5rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <TextField
          id="studentUniversityName"
          label="University Name"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="Indian Institute of Technology"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            width: { xs: "auto", md: "24rem" },
          }}
        />
        <TextField
          id="studentDegree"
          label="Degree"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="B.Tech"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            ml: { xs: 0, md: "3rem" },
            mt: { xs: "2rem", md: 0 },
            width: { xs: "auto", md: "24rem" },
          }}
        />
      </Box>
      {/* admission year, state & city */}
      <Box
        sx={{
          mt: "2.5rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <TextField
          id="studentAdmissionYear"
          label="Admission Year"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="2021"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            width: { xs: "auto", md: "24rem" },
          }}
        />
        <TextField
          id="studentState"
          label="State"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="Tamil Nadu"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            ml: { xs: 0, md: "3rem" },
            mt: { xs: "2rem", md: 0 },
            width: { xs: "auto", md: "24rem" },
          }}
        />
        <TextField
          id="studentCity"
          label="City"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="Chennai"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            ml: { xs: 0, md: "3rem" },
            mt: { xs: "2rem", md: 0 },
            width: { xs: "auto", md: "24rem" },
          }}
        />
      </Box>
    </Box>
  );
}

export default EducationalDetails;
