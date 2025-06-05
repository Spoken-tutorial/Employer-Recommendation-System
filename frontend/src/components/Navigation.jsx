/* eslint-disable react/prop-types */
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
import LeftDrawer from "./navbar/leftDrawer";
import LoginSigup from "./navbar/LoginSignup";
import { NavHashLink, HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import scrollWithOffset from "../utils/hashScrollwithOffset";
import Avatar from "@mui/material/Avatar";

function NavbarMain(props) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#002648" }}>
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
          <HashLink to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
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
          </HashLink>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <LeftDrawer
              navItems={props.navItems}
              homepage={props.homepage}
            ></LeftDrawer>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
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
            <HashLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".05rem",
                  color: "#ffffff",
                  fontSize: { xs: "0.9rem", sm: "1.2rem" },
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Spoken Tutorial JRS
              </Typography>
            </HashLink>
          </Box>

          {/*Nav Items lg*/}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              justifyContent: "left",
              marginLeft: "1rem",
            }}
          >
            {props.homepage ? (
              <List sx={{ display: "flex" }}>
                {props.navItems.map((obj, index) => (
                  <NavHashLink
                    smooth
                    to={obj.url}
                    key={index}
                    style={{ textDecoration: "none", color: "#ffffff" }}
                    scroll={(el) => scrollWithOffset(el)}
                  >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary={obj.text} />
                      </ListItemButton>
                    </ListItem>
                  </NavHashLink>
                ))}
              </List>
            ) : (
              // after login highlighted active nav item
              props.navItems.map((obj) => (
                <>
                  <List sx={{ display: "flex" }}>
                    <NavLink to={obj.url} style={{ textDecoration: "none" }}>
                      {({ isActive }) => (
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText
                              primary={obj.text}
                              sx={{
                                color: isActive ? "#FFA500CC" : "#ffffff",
                                mt: "0.3rem",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      )}
                    </NavLink>
                  </List>
                </>
              ))
            )}
          </Box>
          {/* login signup button */}
          <LoginSigup type="lg" homepage={props.homepage}></LoginSigup>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarMain;