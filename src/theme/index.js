import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    text: {
      primary: "#fff",
    },
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
    allVariants: {
      color: "#fff",
    },
    caption: {
      fontSize: 10,
    },
    h1: {
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
        outlined: {
          borderColor: "white",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        root: {
          color: "white !important",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "white",
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
            borderColor: "white",
          },
        },
      },
    },
  },
});

export default theme;
