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
import { useEffect, useState } from "react";
import { LandState } from "context/landProvider";
import TransferRequest from "./utils/TransferRequest";

function createData(number, land_id, buyer_address, seller_address, transfer) {
  return { number, land_id, buyer_address, seller_address, transfer };
}

const rows = [createData(1, "loremipsum", 350, 12345678, "transfer")];

const TransferOwnershipPage = () => {
  const { contract } = LandState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchTransferRequests = async () => {
      const transReq = await contract.allLandRequestsDetails();
      console.log(transReq);
      setRows(transReq);
    };
    fetchTransferRequests();
  }, [contract]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Land ID</TableCell>
            <TableCell align="center">Buyer Address</TableCell>
            <TableCell align="center">Seller Address</TableCell>
            <TableCell align="center">Land Address</TableCell>
            <TableCell align="center">Document</TableCell>
            <TableCell align="center">Picture</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Price(in ETH)</TableCell>
            <TableCell align="center">Transfer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => <TransferRequest key={row.reqId} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransferOwnershipPage;
