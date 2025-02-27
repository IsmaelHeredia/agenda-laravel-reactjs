import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") => {
  const isDark = mode === "dark";

  return createTheme({
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 18,
      fontWeightLight: 300,
      fontWeightRegular: 700,
      fontWeightMedium: 500,
      allVariants: {
        color: isDark ? "#DDC7A1" : "#e4e2db",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDark ? "#3B3D3D #2b2b2b" : "#504945 #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
      },
      MuiInputBase: isDark ? {
        styleOverrides: {
          root: {
            color: "#DDC7A1",
            "& label.Mui-focused": {
              color: "#DDC7A1",
            },
          },
        },
      } : {},
      MuiTextField: isDark ? {
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
      } : {},
      MuiCheckbox: isDark ? {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": {
              zIndex: 1,
              color: "#DDC7A1",
            },
          },
        },
      } : {},
      MuiIconButton: isDark ? {
        styleOverrides: {
          root: {
            color: "#DDC7A1",
          },
        },
      } : {},
      MuiTooltip: isDark ? {
        styleOverrides: {
          tooltip: {
            color: "#DDC7A1",
            fontSize: "15px",
          },
        },
      } : {},
      MuiTable: isDark ? {
        styleOverrides: {
          root: {
            color: "#DDC7A1",
          },
        },
      } : {},
      MuiLink: isDark ? {
        styleOverrides: {
          root: {
            color: "#DDC7A1",
            textDecoration: "none",
            ":hover": {
              textDecoration: "underline",
            },
          },
        },
      } : {},
    },
    palette: {
      mode,
      primary: {
        main: isDark ? "#474640" : "#CEA445",
        contrastText: isDark ? "#DDC7A1" : "#253600",
      },
      secondary: {
        main: "#DDC7A1",
        contrastText: "#DDC7A1",
      },
      text: {
        primary: isDark ? "#DDC7A1" : "#e4e2db",
        secondary: isDark ? "#DDC7A1" : "#e4e2db",
      },
      background: {
        default: isDark ? "#292828" : "#3c3836",
        paper: isDark ? "#32302F" : "#504945",
      },
      error: {
        main: "#ffb4a9",
        contrastText: "#680003",
      },
      success: {
        main: "#79dd72",
        contrastText: "#003a03",
      },
      info: {
        main: "#0062a2",
        contrastText: "#ffffff",
      },
      warning: {
        main: "#606200",
        contrastText: "#ffffff",
      },
      divider: "#909284",
    },
  });
};
