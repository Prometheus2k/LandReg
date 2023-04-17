import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  colors,
} from "@mui/material";
import { color } from "@mui/system";
function createData(number, address, name, id_proof, pan, document, verify) {
  return { number, address, name, id_proof, pan, document, verify };
}

const rows = [
  createData(
    1,
    1,
    "0x25cc0116565d5cbd66ff7281gfh",
    "Pending",
    "false",
    "Reject",
    "Accept",
  ),
];
const Receivedpage = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Land ID</TableCell>
            <TableCell align="center">Buyer Address</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Payment Done</TableCell>
            <TableCell align="center">Reject</TableCell>
            <TableCell align="center">Accept</TableCell>
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
              <TableCell align="center">{row.address}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.id_proof}</TableCell>
              <TableCell align="center">{row.pan}</TableCell>
              <TableCell align="center">
               <Button color="error" variant="contained">{row.document}</Button> 
                </TableCell>
              <TableCell align="center">
                <Button color="success" variant="contained">{row.verify}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Receivedpage;
