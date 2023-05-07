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
import { ethers } from "ethers";

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

  const makeLandPayment = async (id, price) => {
    await contract.makePayment(id, {
      value: ethers.utils.parseUnits(price, "ether"),
    });
  };

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
          {rows.map(async (row) => (
            <TableRow
              key={row.reqId + ""}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.reqId + ""}
              </TableCell>
              <TableCell align="center">{row.landId}</TableCell>
              <TableCell align="center">{row.sellerId}</TableCell>
              <TableCell align="center">{row.requestStatus}</TableCell>
              <TableCell align="center">
                {await contract.landPrice(row.landId)}
              </TableCell>
              <TableCell align="center">
                {(await contract.requestStatus(rows.landId)) === 2 ? (
                  <Button
                    onClick={async () => {
                      makeLandPayment(
                        row.reqId,
                        await contract.landPrice(row.landId),
                      );
                    }}
                    color="success"
                    variant="contained"
                  >
                    Make Payment
                  </Button>
                ) : (
                  <Button variant="contained" disabled>
                    Unable to Pay/Paid
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SentLandRequestPage;
