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
import LeftDrawer from "./leftDrawer";
import { navItems } from "../../constants/navbar";
import LoginSigup from "./LoginSignup";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function NavbarMain() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#002648" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{
              backgroundColor: "#ffffff",
              ml: "0.5rem",
              mr: "0.5rem",
              display: { xs: "none", sm: "none", md: "inline" },
            }}
            alt="IIT Bombay"
            src="https://jrs.spoken-tutorial.org/static/images/st-logo.png"
          />
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
          <Avatar
            sx={{
              backgroundColor: "#ffffff",
              mr: "0.5rem",
              width: { xs: "1.5rem", sm: "1.8rem" },
              height: { xs: "1.5rem", sm: "1.8rem" },
              display: { xs: "flex", md: "none" },
            }}
            alt="IIT Bombay"
            src="https://jrs.spoken-tutorial.org/static/images/st-logo.png"
          />
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
              fontSize: { xs: "0.9rem", sm: "1.2rem" },
              textDecoration: "none",
            }}
          >
            Spoken Tutorial JRS
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
              {navItems.map((obj, index) => (
                <NavLink
                  to={obj.url}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  {({ isActive }) => (
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText
                          primary={obj.text}
                          sx={{ color: isActive ? "#FFA500CC" : "#ffffff" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  )}
                </NavLink>
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
export default NavbarMain;
