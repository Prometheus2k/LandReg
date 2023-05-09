import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LandState } from "context/landProvider";
import SentRequest from "./utils/SentRequest";

const SentLandRequestPage = () => {
  const { contract } = LandState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchMySentLandRequests = async () => {
      const sentReq = await contract.mySentLandRequestsDetails();
      console.log(sentReq);
      setRows(sentReq);
    };
    fetchMySentLandRequests();
  }, [contract]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Land ID</TableCell>
            <TableCell align="center">Owner Address</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Price(in ETH)</TableCell>
            <TableCell align="center">Make Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => <SentRequest key={row.reqId} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SentLandRequestPage;
