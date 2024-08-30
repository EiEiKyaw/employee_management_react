import React, { createContext, useState, useMemo, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const [themeColor, setThemeColor] = useState("#FFFFFF");
  const [themeBgColor, setThemeBgColor] = useState("#25655E");
  const [iconColor, setIconColor] = useState("#25655E");
  const [title, setTitle] = useState("Hello World !!!");

  console.log(
    "color ...",
    themeColor,
    " ... bg color ...",
    themeBgColor,
    " ... icon color ... ",
    iconColor,
    " ... title ... ",
    title
  );

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
                color: "#25655E",
                fontWeight: "bold",
                padding: 0,
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#2f8077",
                  textDecoration: "underline",
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: themeBgColor,
                color: themeColor,
              },
            },
          },
        },
        palette: {
          icon: {
            main: iconColor,
            hover: "#e64a19",
          },
          title: {
            primary: themeColor,
            bgColor: themeBgColor,
          },
        },
      }),
    [themeColor, themeBgColor, iconColor]
  );

  return (
    <ThemeContext.Provider
      value={{ setThemeColor, setThemeBgColor, setIconColor, title, setTitle }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
