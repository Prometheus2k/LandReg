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
import RecievedRequest from "./utils/RecievedRequest";

const ReceivedLandRequestPage = () => {
  const { contract } = LandState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchMyReceivedLandRequestsDetails = async () => {
      const sentReq = await contract.myReceivedLandRequestsDetails();
      console.log(sentReq);
      setRows(sentReq);
    };
    fetchMyReceivedLandRequestsDetails();
  }, [contract]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Land ID</TableCell>
            <TableCell align="center">Buyer Address</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Price(in ETH)</TableCell>
            <TableCell align="center">Payment Done</TableCell>
            <TableCell align="center">Reject</TableCell>
            <TableCell align="center">Accept</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => <RecievedRequest key={row.reqId} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ReceivedLandRequestPage;
