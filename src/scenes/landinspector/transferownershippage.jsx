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

  const Transferland = async (id) => {
    const documentUrl =
      "https://www.amardasseducation.com/images/ncte/land-document-01.jpg";
    await contract.transferOwnership(id, documentUrl);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Land ID</TableCell>
            <TableCell align="center">Buyer Address</TableCell>
            <TableCell align="center">Seller Address</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Price(in ETH)</TableCell>
            <TableCell align="center">Transfer</TableCell>
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
              <TableCell align="center">{row.sellerId}</TableCell>
              <TableCell align="center">{row.requestStatus}</TableCell>
              <TableCell align="center">
                {await contract.landPrice(row.landId)}
              </TableCell>
              {row.requestStatus === 4 ? (
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      Transferland(row.reqId);
                    }}
                  >
                    Transfer
                  </Button>
                </TableCell>
              ) : (
                <TableCell align="center">
                  <Button variant="contained" disabled>
                    Transfer
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransferOwnershipPage;
