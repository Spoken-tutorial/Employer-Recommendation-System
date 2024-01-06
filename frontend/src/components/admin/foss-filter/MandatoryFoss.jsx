/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FossFilterForm from "./FossFilterForm";

function MandatoryFoss({ mandatoryFossList, manipulateFossList }) {
  //to add new foss form in card
  const handleAddNewMandatoryFoss = () => {
    const newMandatoryFossList = [
      ...mandatoryFossList,
      { fossName: "", fossGrade: "" },
    ];
    manipulateFossList(newMandatoryFossList);
  };

  const card = (
    <>
      <CardContent>
        {/* card description */}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Select FOSS Name & FOSS Grade
        </Typography>
        <Box sx={{ mt: "1rem" }}>
          {/* handles deleting foss modifying foss updating foss */}
          <FossFilterForm
            data={mandatoryFossList}
            manipulateFossList={manipulateFossList}
          ></FossFilterForm>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ fontSize: "0.8rem", ml: "0.5rem" }}
          onClick={handleAddNewMandatoryFoss}
        >
          + Add New
        </Button>
      </CardActions>
    </>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default MandatoryFoss;
