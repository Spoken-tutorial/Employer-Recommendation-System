import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TestScores() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("C", 40.0, "Feb. 12, 2020, 5:58 a.m."),
    createData("Cpp", 80.32, "Feb. 12, 2020, 9:03 a.m."),
    createData("Python 3.4.3", 66.0, "May. 5, 2021, 08:15 a.m."),
    createData("RDBMS PostgreSQL", 70.0, "Aug. 11, 2021, 12:28 p.m."),
    createData("PHP and MYSQL", 44.46, "Oct. 8, 2021, 7:53 a.m."),
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: "0.5rem", width: { xs: "100%", md: "73%" } }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Foss</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Test Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TestScores;
