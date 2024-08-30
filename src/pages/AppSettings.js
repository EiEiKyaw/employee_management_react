import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AppSettingsDetail from "./AppSettingsDetail";

const initialData = [
  {
    id: 1,
    title: "Background Color",
    description: "Testing",
    type: "Color",
    fieldCode: "themeBgColor",
    fieldValue: "#25655E",
  },
  {
    id: 2,
    title: "Text Color",
    description: "Testing",
    type: "Color",
    fieldCode: "themeColor",
    fieldValue: "#FFFFFF",
  },
  {
    id: 3,
    title: "Icon Color",
    description: "Testing",
    type: "Color",
    fieldCode: "iconColor",
    fieldValue: "#000000",
  },
  {
    id: 4,
    title: "Title Name",
    description: "Testing",
    type: "Normal",
    fieldCode: "title",
    fieldValue: "Employee Management",
  },
];

export default function AppSettings() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rows, setRows] = useState(initialData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row) => {
    console.log(row);
    setSelectedData(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedData(null);
  };

  const handleSave = (updatedRow) => {
    console.log("updatedRow", updatedRow);
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
    console.log(rows);
    handleCloseDialog();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Field Code</TableCell>
              <TableCell>Field Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.fieldCode}</TableCell>
                    <TableCell>{row.fieldValue}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={initialData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {selectedData && (
        <AppSettingsDetail
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSave}
          setting={selectedData}
        />
      )}
    </Paper>
  );
}
