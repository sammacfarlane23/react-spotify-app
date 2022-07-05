import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1db954",
      light: "#37D36E",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    caption: {
      fontSize: 10,
    },
    h1: {
      color: "white",
      fontSize: "2rem",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          "&:hover": {
            color: "white",
            borderColor: "white",
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "white",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "white",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          padding: "6px 12px",
          textDecoration: "none",
          color: "white",
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            color: "white",
            backgroundColor: theme.palette.primary.light,
            backgroundColor: "orange",
            borderColor: "white",
          },
        },
      },
    },
  },
});

export default theme;
