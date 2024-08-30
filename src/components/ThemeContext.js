import React, { createContext, useState, useMemo, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const [themeColor, setThemeColor] = useState("#FFFFFF");
  const [themeBgColor, setThemeBgColor] = useState("#25655E");
  const [iconColor, setIconColor] = useState("#25655E");
  const [sbColor, setSbColor] = useState("#FFFFFF");
  const [sbBgColor, setSbBgColor] = useState("#212529");
  const [prjTitle, setPrjTitle] = useState("A-KEE");
  const [abColor, setAbColor] = useState("#FFFFFF");
  const [abBgColor, setAbBgColor] = useState("#25655E");
  const [headerColor, setHeaderColor] = useState("#25655E");

  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                backgroundColor: themeBgColor,
                color: themeColor,
                "&:hover": {
                  backgroundColor: themeBgColor,
                  color: themeColor,
                },
              },
              custom: {
                backgroundColor: "#fff",
                color: themeBgColor,
                fontWeight: "bold",
                padding: 0,
                "&:hover": {
                  backgroundColor: "#fff",
                  color: themeBgColor,
                  textDecoration: "underline",
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: abBgColor,
                color: abColor,
              },
            },
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                "& .MuiTableCell-root": {
                  color: headerColor,
                  fontWeight: "bold",
                },
              },
            },
          },
          MuiDataGrid: {
            styleOverrides: {
              columnHeaders: {
                color: headerColor,
              },
            },
          },
        },
        palette: {
          icon: {
            main: iconColor,
            hover: "#e64a19",
          },
          sidebar: {
            iconColor: sbColor,
            textColor: sbColor,
            bgColor: sbBgColor,
          },
          genText: {
            primary: themeColor,
          },
        },
      }),
    [
      themeColor,
      themeBgColor,
      iconColor,
      sbColor,
      abBgColor,
      abColor,
      headerColor,
      sbBgColor,
    ]
  );

  return (
    <ThemeContext.Provider
      value={{
        setThemeColor,
        setThemeBgColor,
        setIconColor,
        prjTitle,
        setPrjTitle,
        setSbColor,
        setAbBgColor,
        setAbColor,
        setHeaderColor,
        setSbBgColor,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
