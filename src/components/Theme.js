import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#25655E",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2f8077",
            color: "#fff",
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
  },
  palette: {
    icon: {
      main: "#25655E",
      hover: "#e64a19",
    },
    title: {
      primary: "#25655E",
    },
  },
});

export default theme;
