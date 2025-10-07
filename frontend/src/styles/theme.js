import { createTheme } from "@mui/material/styles";

export const BRAND = {
  main: "#002648", // your primary color
  secondary: "#F9C60D", // bright accent
  lightBg: "#f5f7fa", // light background
  textDark: "#1b1b1b",
  textLight: "#ffffff",
  borderColor: "#e0e0e0",
};

const theme = createTheme({
    palette: {
        primary: {
            main: BRAND.main,
            contrastText: BRAND.textLight,
        },
        secondary: {
            main: BRAND.secondary,
        },
        background: {
            default: "BRAND.lightBg",
        },
        text: {
            primary: BRAND.textDark,
            secondary: "#5f6368"
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: BRAND.main,
                    color: BRAND.textLight,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 500,
                },
            },
        },
    },
    typography: {
        fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    },
});

export default theme;