import React, { useState } from "react";
import { Box } from "@mui/material";
import LeftSideBar from "./LeftSideBar";
import AppBar from "./AppBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      <LeftSideBar isOpen={isSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isSidebarOpen ? "220px" : "60px",
          marginTop: "64px",
          backgroundColor: "#fff",
          transition: "margin-left 0.3s",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
