import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function EmpList() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://sst.mglt.workers.dev/js/getEK.json",
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      setData(res["employee"]);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return moment(dateString).format("DD MMM, YYYY");
  };

  const handleDetailClick = (id) => {
    navigate(`/employee/detail/${id}`);
  };

  const handleDialogOpen = (employee) => {
    setSelectedData(employee);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  const handleDelete = async (event) => {
    console.log("Deleting employee id:", selectedData?.id);
    event.preventDefault();
    try {
      const response = await fetch(
        `https://sst.mglt.workers.dev/deleteEK?id=${selectedData?.id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setData((prevData) =>
        prevData.filter((item) => item.id !== selectedData.id)
      );

      await response.json();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
    handleDialogClose();
  };

  if (loading) return <p>Loading</p>;
  if (!data) return <p>No data available</p>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">DOB</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell align="right">{formatDate(row.birthdate)}</TableCell>
                <TableCell align="right">
                  {formatDate(row.start_date)}
                </TableCell>
                <TableCell>
                  <EditIcon
                    sx={{ color: theme.palette.icon.main }}
                    onClick={() => handleDetailClick(row.id)}
                  />
                  <DeleteIcon
                    sx={{ color: theme.palette.icon.main, marginLeft: 1 }}
                    onClick={() => handleDialogOpen(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete <b>'{selectedData?.name}'</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: theme.palette.icon.main }}
              onClick={handleDialogClose}
              variant="custom"
            >
              Cancel
            </Button>
            <Button
              sx={{ color: theme.palette.icon.main }}
              onClick={handleDelete}
              variant="custom"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
}
