import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
  CardHeader,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  signInWithGooglePopup,
  signInWithGitHubPopup,
} from "../utils/firebase";
import googleIcon from "../images/google.png";
import githubIcon from "../images/github.png";

export default function BasicCard() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    if (response) {
      console.log("Logged in user:", response.email);
      navigate("/");
    }
  };

  const signInWithGitHub = async () => {
    try {
      const response = await signInWithGitHubPopup();
      if (response) {
        console.log("Logged in github user:", response);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 300,
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  width: "100%",
                  // color: theme.palette.icon.main,
                }}
              >
                A-KEE
              </Typography>
            }
          />
          <CardContent
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-username">
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                type="text"
                label="Username"
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </CardContent>
          <CardActions
            sx={{
              width: "100%",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "100%" }}
            >
              Login
            </Button>
            <Divider sx={{ width: "100%" }}>
              <Chip label="Or" size="small" sx={{ my: 2 }} />
            </Divider>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              <Item
                sx={{
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
                onClick={signInWithGoogle}
              >
                <img
                  src={googleIcon}
                  alt="Google Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </Item>
              <Item
                sx={{
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
                onClick={signInWithGitHub}
              >
                <img
                  src={githubIcon}
                  alt="Github Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </Item>
            </Stack>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
