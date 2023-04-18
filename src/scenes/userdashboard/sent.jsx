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
import Paymentmodel from "./paymentbox";
function createData(number, address, name, id_proof, pan, document, verify) {
  return { number, address, name, id_proof, pan, document, verify };
}

const rows = [
  createData(
    1,
    1,
    "0x78dc01161356985ced66ff72fh",
    "Accepted",
    "2000.0",
    "Make Payment",
    
  ),
];
const Sentpage = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Land ID</TableCell>
            <TableCell align="center">Owner Address</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Price(in $)</TableCell>
            <TableCell align="center">Make Payment</TableCell>
            
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
               <Button onClick={() => {Paymentmodel()}} color="success" variant="contained">{row.document}</Button> 
                </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

};

export default Sentpage;
