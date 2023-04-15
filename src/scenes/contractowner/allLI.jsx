import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createData(number, land_inspector_address, name, city, remove) {
  return { number, land_inspector_address, name, city, remove };
}

const rows = [createData(1, 12345678, "Nick Fury", "NY", "Remove")];

const AllLIpage = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Land&nbsp;Inspector&nbsp;ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell align="center">{row.land_inspector_address}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.city}</TableCell>
              <TableCell align="center">
                <Button variant="contained" sx={{ bgcolor: "red" }}>
                  {row.remove}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllLIpage;
