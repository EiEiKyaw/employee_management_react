import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useThemeContext } from "../components/ThemeContext";

export default function Home() {
  const { title } = useThemeContext();
  const theme = useTheme();

  return (
    <Card sx={{ minWidth: 200, backgroundColor: theme.palette.title.bgColor }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: theme.palette.title.primary,
              fontWeight: "bold",
              fontSize: "32px",
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome !!!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
