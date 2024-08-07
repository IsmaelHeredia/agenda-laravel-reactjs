import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();

export const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 18,
    "fontWeightLight": 300,
    "fontWeightRegular": 700,
    "fontWeightMedium": 500,
    allVariants: {
      color: "#e4e2db"
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#504945 #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
  palette: {
    mode: "dark",
    
    primary: palette.augmentColor({
      color: {
        main: "#CEA445",
        contrastText: "#253600",
      },
    }),
    secondary: palette.augmentColor({
      color: {
        main: "#CEA445",
        contrastText: "#CEA445",
      },
    }),
    text: {
      primary: "#e4e2db",
      secondary: "#e4e2db",
    },
    background: {
      default: "#3c3836",
      paper: "#504945",
    },
    error: palette.augmentColor({
      color: {
        main: "#ffb4a9",
        contrastText: "#680003",
      },
    }),
    success: palette.augmentColor({
      color: {
        main: "#79dd72",
        contrastText: "#003a03",
      },
    }),
    info: palette.augmentColor({
      color: {
        main: "#0062a2",
        contrastText: "#ffffff",
      },
    }),
    warning: palette.augmentColor({
      color: {
        main: "#606200",
        contrastText: "#ffffff",
      },
    }),
    divider: "#909284"
  }
})