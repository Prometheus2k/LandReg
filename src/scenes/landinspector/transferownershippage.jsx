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

function createData(number, land_id, buyer_address, seller_address, transfer) {
  return { number, land_id, buyer_address, seller_address, transfer };
}

const rows = [createData(1, "loremipsum", 350, 12345678, "transfer")];

const TransferOwnershipPage = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Land&nbsp;ID</TableCell>
            <TableCell align="center">Buyer&nbsp;Address</TableCell>
            <TableCell align="center">Seller&nbsp;Address</TableCell>
            <TableCell align="center">Transfer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.number}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell align="center">{row.land_id}</TableCell>
              <TableCell align="center">{row.buyer_address}</TableCell>
              <TableCell align="center">{row.seller_address}</TableCell>
              <TableCell align="center">
                <Button variant="contained">{row.transfer}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransferOwnershipPage;
