import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../controls/tb-fields.js";

export default function DataTable({ data }) {
  return (
    <div style={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
