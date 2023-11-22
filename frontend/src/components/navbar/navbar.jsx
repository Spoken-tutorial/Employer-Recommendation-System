import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import LeftDrawer from "./leftDrawer";
import { navItems } from "../../constants/navbar";
import LoginSigup from "./LoginSignup";

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#002648" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Spoken Tutorial JRS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <LeftDrawer></LeftDrawer>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          {/*Mobile Screen*/}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Spoken Tutorial
          </Typography>
          {/*Nav Items lg*/}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              justifyContent: "left",
              marginLeft: "1rem",
            }}
          >
            <List sx={{ display: "flex" }}>
              {navItems.map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} sx={{ color: "#ffffff" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          {/* login signup button */}
          <LoginSigup type="lg"></LoginSigup>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
