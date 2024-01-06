/* eslint-disable react/prop-types */
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

function FossFilterForm({ data, manipulateFossList }) {
  //just pass data and setData from optional or mandatory foss component this will handle everything
  const handleFossNameChange = (event, index) => {
    const newData = [...data];
    newData[index].fossName = event.target.value;
    manipulateFossList(newData);
  };
  const handleFossGradeChange = (event, index) => {
    const newData = [...data];
    newData[index].fossGrade = event.target.value;
    manipulateFossList(newData);
  };
  //delete from particular index
  const handleFossDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    manipulateFossList(newData);
  };
  return (
    <>
      {data.length != 0 ? (
        <>
          {data.map((obj, index) => (
            <div key={index}>
              <Grid container spacing={2} sx={{ mt: "0.5rem" }}>
                <Grid item sx={{ width: "20rem" }}>
                  {/* Foss Name */}
                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: { xs: "14rem", md: "18rem" },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        { borderColor: "#054C77" },
                    }}
                    size="small"
                  >
                    <InputLabel
                      id={`foss-name-${index}`}
                      sx={{ fontSize: "0.7rem" }}
                    >
                      FOSS
                    </InputLabel>
                    <Select
                      labelId={`foss-name-${index}`}
                      id={`foss-name-select-${index}`}
                      sx={{ fontSize: "0.8rem" }}
                      value={obj.fossName}
                      label="Foss"
                      onChange={(e) => handleFossNameChange(e, index)}
                    >
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={"C"}>
                        C
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={"C++"}>
                        C++
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={"Python"}>
                        Python
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={"DBMS"}>
                        Datbase Management System
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={"Nodejs"}>
                        NodeJs
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  {/* Foss Grade */}
                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: { xs: "14rem", md: "18rem" },
                      ml: { sm: "0", md: "1rem" },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        { borderColor: "#054C77" },
                    }}
                    size="small"
                  >
                    <InputLabel
                      id={`foss-grade-${index}`}
                      sx={{ fontSize: "0.7rem" }}
                    >
                      Grade
                    </InputLabel>
                    <Select
                      labelId={`foss-grade-${index}`}
                      id={`foss-grade-select-${index}`}
                      value={obj.fossGrade}
                      sx={{ fontSize: "0.8rem" }}
                      label="Foss"
                      onChange={(e) => handleFossGradeChange(e, index)}
                    >
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={">=40 <=50"}>
                        {">=40 && <=50"}
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={">=50 <=60"}>
                        {">=50 && <=60"}
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={">=60 <=70"}>
                        {">=60 && <=70"}
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={">=70 <=80"}>
                        {">=70 && <=80"}
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={">=80 <=90"}>
                        {">=80 && <=90"}
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "0.7rem" }} value={">=90"}>
                        {">=90"}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  {/* delete button */}
                  <IconButton
                    aria-label="delete"
                    sx={{ mt: "0.5rem", fontSize: "0.3rem!important" }}
                    onClick={() => {
                      handleFossDelete(index);
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: "1.1rem" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}

export default FossFilterForm;
