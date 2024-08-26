import { createTheme } from "@mui/material";

const colors = {
  main: "#5e43f3",
  secondary: "#1e293b",
  background: "#121212",
  text: "#e2e8f0",
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1380,
      xl: 1920,
    },
  },
  spacing: 10,
  typography: {
    fontFamily: `Poppins, sans-serif`,
    htmlFontSize: 10,
    fontSize: 10, 
  },
  palette: {
    primary: {
      main: colors.main,
      contrastText: colors.text,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
    text: {
      primary: colors.text,
    },
  },

  // Override button style
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});
