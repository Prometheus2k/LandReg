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
} from "@mui/material";
function createData(number, address, name, id_proof, pan, document, verify) {
  return { number, address, name, id_proof, pan, document, verify };
}

const rows = [
  createData(
    1,
    "loremipsum",
    "Falcon",
    "Avenger_08",
    12345678,
    "cp_pdf",
    "verify",
  ),
];

const VerifyUser = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">ID&nbsp;proof</TableCell>
            <TableCell align="center">Pan</TableCell>
            <TableCell align="center">Document</TableCell>
            <TableCell align="center">Verify</TableCell>
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
              <TableCell align="center">{row.document}</TableCell>
              <TableCell align="center">
                <Button variant="contained">{row.verify}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VerifyUser;
