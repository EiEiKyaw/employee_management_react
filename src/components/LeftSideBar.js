import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import { Home, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const listItemStyle = {
  height: 50,
  "&:hover": {
    backgroundColor: "#343a40",
  },
};

export default function Sidebar({ isOpen }) {
  const [openSubMenu, setOpenSubMenu] = React.useState({});

  const navigate = useNavigate();

  const toggleSubMenu = (menu) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <Box
      sx={{
        width: isOpen ? 220 : 60,
        height: "100vh",
        backgroundColor: "#212529",
        color: "#ffffff",
        position: "fixed",
        paddingTop: "64px",
        transition: "width 0.3s",
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")} sx={listItemStyle}>
          <ListItemIcon>
            <Home sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Home" />}
        </ListItemButton>
        <ListItemButton
          onClick={() => toggleSubMenu("employees")}
          sx={listItemStyle}
        >
          <ListItemIcon>
            <PeopleAltIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Employees" />}
          {isOpen &&
            (openSubMenu["employees"] ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {isOpen && (
          <Collapse in={openSubMenu["employees"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ ...listItemStyle, pl: 4 }}
                onClick={() => navigate("/employee/all")}
              >
                <ListItemIcon>
                  <FormatListBulletedIcon sx={{ color: "#ffffff" }} />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItemButton>
              <ListItemButton
                sx={{ ...listItemStyle, pl: 4 }}
                onClick={() => navigate("/employee/add")}
              >
                <ListItemIcon>
                  <AddIcon sx={{ color: "#ffffff" }} />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItemButton>
            </List>
          </Collapse>
        )}
        <ListItemButton onClick={() => navigate("/setting")} sx={listItemStyle}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Settings" />}
        </ListItemButton>
        <Divider sx={{ backgroundColor: "#ffffff", m: 2 }} />
        <ListItemButton onClick={() => navigate("/login")} sx={listItemStyle}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Logout" />}
        </ListItemButton>
      </List>
    </Box>
  );
}
