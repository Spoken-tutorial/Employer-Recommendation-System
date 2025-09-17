// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004687', // blue
      light: "#e3f2fd",
      darkText: "black"
      
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
  shape: { borderRadius: 12 },

  // Global component styles (no need to pass sx everywhere)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 12,
          letterSpacing: 0.3,
        },
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
    },
  
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider
        }),
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        columnHeaders: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          fontWeight: 700,
        }),
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          p: 1,
          // border: "2px solid green"
        }
      },
      defaultProps: {
         maxWidth: "xl",
      }
    }
  }
});

export default theme;
