import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from "@mui/icons-material/Key";
import { NavLink, useNavigate } from "react-router-dom";

export default function StudentNav() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Desktop menus
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);
  const [anchorJobs, setAnchorJobs] = useState<null | HTMLElement>(null);
  const [anchorGear, setAnchorGear] = useState<null | HTMLElement>(null);

  // Mobile drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const openMenu = (setter: any) => (e: React.MouseEvent<HTMLElement>) => setter(e.currentTarget);
  const closeMenu = (setter: any) => () => setter(null);

  const navButtonSx = {
    color: theme.palette.primary.contrastText,
    "&.active": { textDecoration: "underline", fontWeight: 700 },
  };

  const go = (to: string, close?: () => void) => () => {
    navigate(to);
    close?.();
  };

  return (
    <>
      {/* TOP BAR (desktop) */}
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          {/* Left gear (as requested) */}
          <IconButton
            color="inherit"
            aria-label="settings"
            sx={{ mr: 1, display: { xs: "none", md: "inline-flex" } }}
            onClick={openMenu(setAnchorGear)}
          >
            <SettingsIcon />
          </IconButton>

          {/* Mobile hamburger */}
          <IconButton
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { md: "none" } }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Portal
          </Typography>

          {/* Desktop main menu (right-aligned) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {/* Profile */}
            <Button
              onClick={openMenu(setAnchorProfile)}
              startIcon={<PersonIcon />}
              sx={navButtonSx}
            >
              Profile
            </Button>
            <Menu
              anchorEl={anchorProfile}
              open={Boolean(anchorProfile)}
              onClose={closeMenu(setAnchorProfile)}
            >
              <MenuItem onClick={go("/student/profile", closeMenu(setAnchorProfile))}>
                Your Profile
              </MenuItem>
              <MenuItem onClick={go("/student/profile/resume", closeMenu(setAnchorProfile))}>
                Resume
              </MenuItem>
            </Menu>

            {/* Jobs */}
            <Button onClick={openMenu(setAnchorJobs)} startIcon={<WorkIcon />} sx={navButtonSx}>
              Jobs
            </Button>
            <Menu anchorEl={anchorJobs} open={Boolean(anchorJobs)} onClose={closeMenu(setAnchorJobs)}>
              <MenuItem onClick={go("/student/jobs", closeMenu(setAnchorJobs))}>All Jobs</MenuItem>
              <MenuItem onClick={go("/student/jobs/applied", closeMenu(setAnchorJobs))}>
                Applied Jobs
              </MenuItem>
            </Menu>

            {/* Companies (no submenu) */}
            <Button
              component={NavLink}
              to="/student/companies"
              startIcon={<BusinessIcon />}
              sx={navButtonSx}
            >
              Companies
            </Button>

            {/* Gear dropdown (also available on the left icon) */}
            <Button
              onClick={openMenu(setAnchorGear)}
              startIcon={<SettingsIcon />}
              sx={navButtonSx}
            >
              Settings
            </Button>
            <Menu anchorEl={anchorGear} open={Boolean(anchorGear)} onClose={closeMenu(setAnchorGear)}>
              <MenuItem onClick={go("/student/settings/password", closeMenu(setAnchorGear))}>
                <KeyIcon fontSize="small" style={{ marginRight: 8 }} />
                Change Password
              </MenuItem>
              <MenuItem onClick={go("/logout", closeMenu(setAnchorGear))}>
                <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 280, boxSizing: "border-box" },
        }}
      >
        <List sx={{ py: 1 }}>
          <ListItemButton onClick={go("/student/profile", () => setOpenDrawer(false))}>
            <PersonIcon fontSize="small" style={{ marginRight: 8 }} />
            <ListItemText primary="Your Profile" />
          </ListItemButton>
          <ListItemButton onClick={go("/student/profile/resume", () => setOpenDrawer(false))}>
            <ListItemText inset primary="Resume" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          <ListItemButton onClick={go("/student/jobs", () => setOpenDrawer(false))}>
            <WorkIcon fontSize="small" style={{ marginRight: 8 }} />
            <ListItemText primary="All Jobs" />
          </ListItemButton>
          <ListItemButton onClick={go("/student/jobs/applied", () => setOpenDrawer(false))}>
            <ListItemText inset primary="Applied Jobs" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          <ListItemButton onClick={go("/student/companies", () => setOpenDrawer(false))}>
            <BusinessIcon fontSize="small" style={{ marginRight: 8 }} />
            <ListItemText primary="Companies" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          <ListItemButton onClick={go("/student/settings/password", () => setOpenDrawer(false))}>
            <KeyIcon fontSize="small" style={{ marginRight: 8 }} />
            <ListItemText primary="Change Password" />
          </ListItemButton>
          <ListItemButton onClick={go("/logout", () => setOpenDrawer(false))}>
            <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
