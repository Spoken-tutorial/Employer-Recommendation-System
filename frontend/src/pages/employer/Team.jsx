import React, { useState } from "react";
import {
  Box, TextField, Button, Typography, Paper, Alert, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Switch, InputAdornment, IconButton, TableSortLabel, Stack,
  Container
} from "@mui/material";
import { EmailOutlined, Person, PersonOutline } from "@mui/icons-material";
import PageHeader from "../../components/common/PageHeader";

const dummyTeam = [
  { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@company.com", active: true },
  { id: 2, firstName: "Bob", lastName: "Johnson", email: "bob@company.com", active: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function Team() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [team, setTeam] = useState(dummyTeam);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }
    setTeam([
      ...team,
      {
        id: team.length + 1,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        active: true,
      },
    ]);
    setSuccess("Team member added successfully!");
    setError("");
    setForm({ firstName: "", lastName: "", email: "" });
  };

  const handleToggleActive = (id) => {
    setTeam(team =>
      team.map(member =>
        member.id === id ? { ...member, active: !member.active } : member
      )
    );
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Container>
        <Box sx={{ mx: "auto", mt: 4 }}>
          <PageHeader title="Team Members"/>
      <Paper sx={{ p: 3, mb: 4 }}>

        <Typography variant="h6" gutterBottom>
          Add Team Member
        </Typography>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="First Name"
            name="firstName"
            size="small"
            value={form.firstName}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            size="small"
            value={form.lastName}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Email"
            name="email"
            size="small"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 2 }}
          />
          <Button size="medium" type="submit" variant="contained" color="primary" >
            Add
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Team Members
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "firstName"}
                    direction={orderBy === "firstName" ? order : "asc"}
                    onClick={() => handleRequestSort("firstName")}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "lastName"}
                    direction={orderBy === "lastName" ? order : "asc"}
                    onClick={() => handleRequestSort("lastName")}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderBy === "email" ? order : "asc"}
                    onClick={() => handleRequestSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...team].sort(getComparator(order, orderBy)).map((member) => (
                <TableRow key={member.id} hover>
                  <TableCell>{member.firstName}</TableCell>
                  <TableCell>{member.lastName}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={member.active ? "success.main" : "text.secondary"}
                      fontWeight={member.active ? 600 : 400}
                    >
                      {member.active ? "Active" : "Inactive"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={member.active}
                      onChange={() => handleToggleActive(member.id)}
                      color="primary"
                      inputProps={{ "aria-label": "activate or deactivate" }}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
    </Container>
  );
}