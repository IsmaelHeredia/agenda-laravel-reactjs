import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();

// Fondo del fondo : #292828
// Fondo Botones : #3B3D3D
// Letra : #DDC7A1

export const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 18,
    "fontWeightLight": 300,
    "fontWeightRegular": 700,
    "fontWeightMedium": 500,
    allVariants: {
      color: "#DDC7A1"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#3B3D3D #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#DDC7A1",
          "& label.Mui-focused": {
            color: "#DDC7A1",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#DDC7A1",
          },
          "& label.Mui-focused": {
            color: "#DDC7A1",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#DDC7A1",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#DDC7A1",
            },
            "&:hover fieldset": {
              borderColor: "#DDC7A1",
              borderWidth: "0.15rem",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#DDC7A1",
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            zIndex: 1,
            color:"#DDC7A1"
          },
        },
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#DDC7A1"
        },
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#DDC7A1",
          fontSize: "15px",
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          color: "#DDC7A1",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#DDC7A1",
          textDecoration: "none",
          defaultProps: {
            color: "#DDC7A1",
            underline: "hover",
          },
          ":hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
  palette: {
    mode: "dark",
    
    primary: palette.augmentColor({
      color: {
        main: "#474640",
        contrastText: "#DDC7A1",
      },
    }),
    secondary: palette.augmentColor({
      color: {
        main: "#DDC7A1",
        contrastText: "#DDC7A1",
      },
    }),
    text: {
      primary: "#DDC7A1",
      secondary: "#DDC7A1",
    },
    background: {
      default: "#292828",
      paper: "#32302F",
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