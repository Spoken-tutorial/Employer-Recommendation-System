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
import { navItems } from "../../constants/navbar";
import LoginSigup from "./LoginSignup";
import { NavHashLink } from "react-router-hash-link";
import scrollWithOffset from "../../utils/hashScrollwithOffset";

export default function LeftDrawer() {
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
        <LoginSigup type="sm"></LoginSigup>
      </Box>
      <Divider sx={{ backgroundColor: "#ffffff", mt: "0.3rem" }}></Divider>
      {/*Nav menu*/}
      <List sx={{ marginTop: "-0.5rem", marginLeft: "1rem" }}>
        {navItems.map((obj, index) => (
          <NavHashLink
            smooth
            to={obj.url}
            key={index}
            activeStyle={{ color: "red" }}
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
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <MenuIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Button>
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
