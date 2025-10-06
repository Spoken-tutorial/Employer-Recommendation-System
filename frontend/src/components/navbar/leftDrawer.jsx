/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginSigup from "./LoginSignup";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";

export default function LeftDrawer(props) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "#002648",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/*Login signup*/}
      <Box sx={{ marginTop: "4rem", marginLeft: "1.3rem" }}>
        <LoginSigup type="sm" homepage={props.homepage}></LoginSigup>
      </Box>
      <Divider sx={{ backgroundColor: "#ffffff", mt: "0.3rem" }}></Divider>
      {/*Nav menu*/}
      {props.homepage ? (
        <List sx={{ marginTop: "-0.5rem", marginLeft: "1rem" }}>
          {props.navItems.map((obj, index) => (
            <NavHashLink
              smooth
              to={obj.url}
              key={index}
              style={{ textDecoration: "none", color: "#ffffff" }}
              scroll={(el) => scrollWithOffset(el)}
            >
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={obj.text}
                    sx={{
                      marginTop: "0.5rem",
                    }}
                  />
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
                          mt: "0.1rem",
                          ml: "0.5rem",
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
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <MenuIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}