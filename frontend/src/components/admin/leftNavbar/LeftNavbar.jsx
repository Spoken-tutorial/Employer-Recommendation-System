/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Outlet } from "react-router-dom";
import Footer from "../../../views/footer/footer";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import LoginSigup from "../../navbar/LoginSignup";
import { HashLink } from "react-router-hash-link";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import "./styles.css";
import { navItemsManager } from "../../../constants/navbar";
const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [nestedListStates, setNestedListStates] = React.useState({});

  const handleClick = (listId) => {
    setNestedListStates((prevStates) => ({
      ...prevStates,
      [listId]: !prevStates[listId],
    }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#002648" }}>
        <Toolbar>
          {/* expand and minimize button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 1,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              marginRight: 1,
              color: "#ffffff",
              ...(!open && { display: "none" }),
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          {/* logo and title */}
          <Avatar
            sx={{
              backgroundColor: "#ffffff",
              ml: "0.5rem",
              mr: "0.5rem",
              display: "inline",
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
                display: "flex",
                fontFamily: "monospace",
                fontSize: { xs: "1rem", sm: "1rem", md: "1.2rem" },
                fontWeight: 700,
                letterSpacing: ".05rem",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              Spoken Tutorial JRS
            </Typography>
          </HashLink>
          {/* login signup button */}
          <LoginSigup type="lg" homepage={props.homepage}></LoginSigup>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{}}>
        <DrawerHeader sx={{}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              mr: "0.5rem",
              p: 2,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#FFA500CC", p: "1rem" }}
            >
              Welcome
            </Typography>
          </Box>
        </DrawerHeader>
        <Divider />

        {/* left menu items */}
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {navItemsManager.map((obj) => (
            <>
              {obj.nested ? (
                <>
                  {/* nested item */}
                  <Divider
                    component="li"
                    sx={{ backgroundColor: "#ffffff", opacity: "20%" }}
                  />
                  <ListItemButton
                    key={obj.text}
                    onClick={() => handleClick(obj.text)}
                    sx={{ mb: "0.5rem", mt: "0.5rem" }}
                  >
                    <ListItemIcon>
                      {obj.icon ? (
                        obj.icon
                      ) : (
                        <InboxIcon sx={{ color: "#ffffff" }} />
                      )}
                    </ListItemIcon>
                    <Typography
                      sx={{ color: "#ffffff", fontSize: "0.9rem!important" }}
                    >
                      {obj.text}
                    </Typography>
                    {nestedListStates[obj.text] ? (
                      <ExpandLess sx={{ color: "#FFA500CC" }} />
                    ) : (
                      <ExpandMore sx={{ color: "#ffffff" }} />
                    )}
                  </ListItemButton>
                  {/* children mapping */}
                  {obj.children.map((nestedObj) => (
                    <>
                      <Collapse
                        key={nestedObj.text}
                        in={nestedListStates[obj.text]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              {nestedObj.icon ? (
                                nestedObj.icon
                              ) : (
                                <StarBorder sx={{ color: "#FFA500CC" }} />
                              )}
                            </ListItemIcon>
                            <Typography
                              sx={{
                                color: "#ffffff",
                                fontSize: "0.9rem!important",
                              }}
                            >
                              {nestedObj.text}
                            </Typography>
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </>
                  ))}
                </>
              ) : (
                // not nested item
                <>
                  <Divider
                    component="li"
                    sx={{ backgroundColor: "#ffffff", opacity: "15%" }}
                  />
                  <ListItemButton
                    key={obj.text}
                    sx={{ mb: "0.5rem", mt: "0.5rem" }}
                  >
                    <ListItemIcon>
                      {obj.icon ? (
                        obj.icon
                      ) : (
                        <InboxIcon sx={{ color: "#ffffff" }} />
                      )}
                    </ListItemIcon>
                    <Typography
                      sx={{ color: "#ffffff", fontSize: "0.9rem!important" }}
                    >
                      {obj.text}
                    </Typography>
                  </ListItemButton>
                  <Divider
                    component="li"
                    sx={{ backgroundColor: "#ffffff", opacity: "15%" }}
                  />
                </>
              )}
            </>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Outlet></Outlet>
        <Footer></Footer>
      </Box>
    </Box>
  );
}
