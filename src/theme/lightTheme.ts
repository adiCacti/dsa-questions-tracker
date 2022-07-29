import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F6FB",
    },

    success: {
      main: "#00b497",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1010,
      lg: 1200,
      xl: 1620,
    },
  },
  typography: {
    fontFamily: `"Epilogue", sans-serif`,
  },
});

export default lightTheme;
