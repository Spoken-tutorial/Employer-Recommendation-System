// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004687', // blue
    },
    secondary: {
      main: '#ffa500', // orange
    },
    info: {
      main: '#0288d1', // cyan-blue
    },
    success: {
      main: '#2e7d32', // green
    },
    warning: {
      main: '#ed6c02', // amber-orange
    },
    error: {
      main: '#d32f2f', // red
    },
    neutral: {
      main: '#64748B', // custom gray (requires extra config below)
      contrastText: '#fff'
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
