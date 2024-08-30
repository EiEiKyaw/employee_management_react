import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const pages = ["Employees", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Logout"];
const employeeSubPages = ["Employee List", "Add Employee"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElEmployees, setAnchorElEmployees] = React.useState(null);
  const [activePage, setActivePage] = React.useState("Home");
  const [activeSetting, setActiveSetting] = React.useState("");
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenEmployeesMenu = (event) => {
    setAnchorElEmployees(event.currentTarget);
  };

  const handleCloseNavMenu = (pageName) => {
    console.log("inside handleCloseNavMenu ....", pageName, "....", activePage);
    if (pageName !== activePage) {
      setActivePage(pageName);
      if (pageName === "Employees") {
        navigate("/employee/all");
      } else if (pageName === "Home") {
        navigate("/");
      }
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (settingName) => {
    console.log(
      "inside handleCloseNavMenu ....",
      settingName,
      "....",
      activeSetting
    );
    if (settingName !== activeSetting) {
      setActiveSetting(settingName);
      if (settingName === "Logout") {
        navigate("/login");
      }
    }
    setAnchorElUser(null);
  };

  const handleCloseEmployeesMenu = (subPage) => {
    console.log("inside handleCloseNavMenu ....", subPage);
    if (subPage === "Employee List") {
      navigate(`/employee/all`);
    } else if (subPage === "Add Employee") {
      navigate(`/employee/add`);
    }
    setAnchorElEmployees(null);
  };

  const handleHomeRoute = () => {
    navigate("/");
    setActivePage("Home");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            onClick={handleHomeRoute}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            A-KEE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu(page);
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            onClick={handleHomeRoute}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            A-KEE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page === "Employees" ? (
                <Box key={page}>
                  <Button
                    onClick={handleOpenEmployeesMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                  <Menu
                    anchorEl={anchorElEmployees}
                    open={Boolean(anchorElEmployees)}
                    onClose={() => setAnchorElEmployees(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    sx={{
                      mt: 1,
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      "& .MuiMenuItem-root": {
                        padding: "8px 16px",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      },
                    }}
                  >
                    {employeeSubPages.map((subPage) => (
                      <MenuItem
                        key={subPage}
                        onClick={() => handleCloseEmployeesMenu(subPage)}
                      >
                        <Typography textAlign="center">{subPage}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              )
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
