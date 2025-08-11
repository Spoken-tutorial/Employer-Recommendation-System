import { Outlet } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BuildOutlined, CorporateFare, Group, Mail, School } from "@mui/icons-material";

// const pages = ['Dashboard', 'Jobs'];
const pages = [
  { label: 'Dashboard', icon: <DashboardIcon sx={{ mr: 1 }} />, link: '/admin/dashboard' },
  { label: 'Jobs', icon: <WorkOutlineIcon sx={{ mr: 1 }} />, link: '/admin/jobs' },
  { label: 'Companies', icon: <CorporateFare sx={{ mr: 1 }} />, link: '/admin/companies' },
  { label: 'Students', icon: <School sx={{ mr: 1 }} />, link: '/admin/students' },
  { label: 'Mail', icon: <Mail sx={{ mr: 1 }} />, link: '/admin/mail' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AdminNavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (setting) => {
    console.log("clicked ****");
    console.log(setting);
    if (setting === "Logout") {
      localStorage.removeItem('token');
      navigate("/", { replace: true });
    }
  }

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Spoken Tutorial - JRS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
           <Menu
  id="menu-appbar"
  anchorEl={anchorElNav}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  keepMounted
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  open={Boolean(anchorElNav)}
  onClose={handleCloseNavMenu}
  sx={{ display: { xs: 'block', md: 'none' } }}
>
 {pages.map((page) => (
    <MenuItem
      key={page.label}
      component={RouterLink}
      to={page.link}
      onClick={handleCloseNavMenu}
      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
    >
      {page.icon}
      <Typography sx={{ textAlign: 'center', fontWeight: 500 }}>{page.label}</Typography>
    </MenuItem>
  ))}
</Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Spoken Tutorial - JRS
          </Typography>
         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
  {pages.map((page) => (
    <Button
      key={page.label}
      component={RouterLink}
      to={page.link}
      onClick={handleCloseNavMenu}
      sx={{
        my: 2,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '1rem',
        px: 2,
        mx: 1,
        letterSpacing: 1,
      }}
      startIcon={page.icon}
    >
      {page.label}
    </Button>
  ))}
</Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

        <Outlet/>
    </>
      );
}
export default AdminNavBar;
