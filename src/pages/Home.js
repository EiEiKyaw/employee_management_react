import * as React from "react";
import { Typography, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{
          color: theme.palette.genText.primary,
          fontWeight: "bold",
          fontSize: "32px",
        }}
      >
        Employee Management
      </Typography>
    </>
  );
}
