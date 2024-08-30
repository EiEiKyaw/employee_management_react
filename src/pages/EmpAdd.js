import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ReplyIcon from "@mui/icons-material/Reply";
import Typography from "@mui/material/Typography";

export default function EmpAdd() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState({
    id: "",
    name: "",
    position: "",
    department: "",
    birthdate: "",
    start_date: "",
  });

  useEffect(() => {
    setValue({
      id: "",
      name: "",
      position: "",
      department: "",
      birthdate: "",
      start_date: "",
    });
  }, [location]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value);
  };

  const handleBackClick = () => {
    navigate(`/employee/all`);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const bodyContent = `value=${JSON.stringify(value)}`;
    console.log(`value=${JSON.stringify(value)}`);
    try {
      const response = await fetch("https://sst.mglt.workers.dev/addEK/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyContent,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      navigate("/employee/all");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        boxShadow: 3,
        padding: 4,
        borderRadius: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">ID:</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            name="id"
            value={value.id}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">Name:</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            name="name"
            value={value.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">Position:</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            name="position"
            value={value.position || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">Department:</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            name="department"
            value={value.department || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">DOB:</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            name="birthdate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={value.birthdate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">Start Date:</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            name="start_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={value.start_date || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            fullWidth
            onClick={handleBackClick}
          >
            <ReplyIcon />
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
