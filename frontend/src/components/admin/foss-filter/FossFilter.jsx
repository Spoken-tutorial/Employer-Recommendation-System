import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MandatoryFoss from "./MandatoryFoss";
import OptionalFoss from "./OptionalFoss";
function FossFilter() {
  //holds array of foss
  const [mandatoryFossList, setMandatoryFossList] = useState([]);
  const [optionalFossList, setOptionalFossList] = useState([]);
  //for reset button
  const handleResetClick = () => {
    setMandatoryFossList([]);
    setOptionalFossList([]);
  };
  return (
    <>
      <Box sx={{ marginTop: "2rem", p: "1rem", marginBottom: "6rem" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
          }}
        >
          Filter Students
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
          }}
        ></Divider>
        {/* mandatory foss */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "1.5rem" }}
        >
          Mandatory FOSS
        </Typography>
        <MandatoryFoss
          mandatoryFossList={mandatoryFossList}
          manipulateFossList={setMandatoryFossList}
        />
        {/* optional foss */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", mt: "1.5rem" }}
        >
          Optional FOSS
        </Typography>
        <OptionalFoss
          optionalFossList={optionalFossList}
          manipulateFossList={setOptionalFossList}
        />
        {/* action buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#054C77",
              color: "#ffffff",
              m: "1rem",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#002648",
              },
            }}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#054C77",
              color: "#ffffff",
              m: "1rem",

              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#002648",
              },
            }}
            onClick={handleResetClick}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default FossFilter;
