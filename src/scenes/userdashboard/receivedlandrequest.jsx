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

  const rejectlandRequest = async (id) => {
    await contract.rejectRequest(id);
  };

  const approvelandRequest = async (id) => {
    await contract.acceptRequest(id);
  };
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
          {rows.map(async (row) => (
            <TableRow
              key={row.reqId + ""}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.reqId + ""}
              </TableCell>
              <TableCell align="center">{row.landId}</TableCell>
              <TableCell align="center">{row.buyerId}</TableCell>
              <TableCell align="center">{row.requestStatus}</TableCell>
              <TableCell align="center">
                {await contract.landPrice(row.landId)}
              </TableCell>
              <TableCell align="center">{row.isPaymentDone}</TableCell>
              {row.requestStatus === 1 ? (
                <>
                  <TableCell align="center">
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => rejectlandRequest(row.reqId)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => approvelandRequest(row.reqId)}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">
                    <Button variant="contained" disabled>
                      Reject
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" disabled>
                      Accept
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ReceivedLandRequestPage;
