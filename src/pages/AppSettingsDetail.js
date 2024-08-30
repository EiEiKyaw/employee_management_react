import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useThemeContext } from "../components/ThemeContext";

export default function AppSettingsDetail({ open, onClose, onSave, setting }) {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    type: "",
    fieldCode: "",
    fieldValue: "",
  });
  const {
    setThemeColor,
    setThemeBgColor,
    setIconColor,
    setPrjTitle,
    setSbColor,
    setSbBgColor,
    setAbBgColor,
    setAbColor,
    setHeaderColor,
  } = useThemeContext();

  useEffect(() => {
    if (setting) {
      setFormData({
        id: setting.id,
        title: setting.title,
        description: setting.description,
        type: setting.type,
        fieldCode: setting.fieldCode,
        fieldValue: setting.fieldValue,
      });
    }
  }, [setting]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({ ...formData });

    if (formData.type === "Color") {
      if (formData.fieldCode === "themeBgColor")
        setThemeBgColor(formData.fieldValue);
      if (formData.fieldCode === "themeColor")
        setThemeColor(formData.fieldValue);
      if (formData.fieldCode === "iconColor") setIconColor(formData.fieldValue);
      if (formData.fieldCode === "sbColor") setSbColor(formData.fieldValue);
      if (formData.fieldCode === "sbBgColor") setSbBgColor(formData.fieldValue);
      if (formData.fieldCode === "abColor") setAbColor(formData.fieldValue);
      if (formData.fieldCode === "abBgColor") setAbBgColor(formData.fieldValue);
      if (formData.fieldCode === "headerColor")
        setHeaderColor(formData.fieldValue);
    } else if (formData.type === "Normal") {
      if (formData.fieldCode === "prjTitle") setPrjTitle(formData.fieldValue);
    }

    console.log("saved ..... ", { ...formData });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Setting</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          id="outlined-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          id="outlined-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          select
          margin="dense"
          label="Select Type"
          value={formData.type}
          onChange={handleChange}
          name="type"
          fullWidth
          id="outlined-select-currency"
        >
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="Color">Color</MenuItem>
        </TextField>
        {/* <TextField
          select
          margin="dense"
          label="Select Code"
          value={formData.fieldCode}
          onChange={handleChange}
          name="fieldCode"
          fullWidth
          id="outlined-select-currency"
        >
          <MenuItem value="themeBgColor">Background Color</MenuItem>
          <MenuItem value="themeColor">Text Color</MenuItem>
          <MenuItem value="iconColor">Icon Color</MenuItem>
        </TextField> */}
        <TextField
          margin="dense"
          label="Field Value"
          name="fieldValue"
          type="text"
          value={formData.fieldValue}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
