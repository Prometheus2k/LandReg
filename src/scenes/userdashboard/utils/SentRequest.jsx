import * as React from "react";
import { TableCell, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LandState } from "context/landProvider";
import { ethers } from "ethers";

const SentRequest = (props) => {
  const { row } = props;
  // console.log(row);
  const { contract } = LandState();

  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");
  const makeLandPayment = async (id, price) => {
    console.log(id, price);
    const res = await contract.makePayment(id, {
      value: ethers.parseUnits(price + "", "ether"),
    });
    console.log(res);
  };

  useEffect(() => {
    const fetchSentLandDetails = async () => {
      const res = await contract.landPrice(row.landId);
      console.log(res);
      setPrice(res);
      const result = await contract.requestStatus(row.reqId);
      console.log(result);
      switch (result) {
        case 0n:
          setStatus("Not Requested");
          break;
        case 1n:
          setStatus("Requested");
          break;
        case 2n:
          setStatus("Accepted");
          break;
        case 3n:
          setStatus("Rejected");
          break;
        case 4n:
          setStatus("Paid");
          break;
        case 5n:
          setStatus("Completed");
          break;
        default:
          setStatus("Invalid");
          break;
      }
    };
    fetchSentLandDetails();
  }, [contract, row.landId, row.land, row.reqId]);

  return (
    <>
      <TableRow
        key={row.reqId + ""}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.reqId + ""}
        </TableCell>
        <TableCell align="center">{row.landId + ""}</TableCell>
        <TableCell align="center">{row.sellerId}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">{price + ""}</TableCell>
        <TableCell align="center">
          {status === "Accepted" ? (
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
    </>
  );
};

export default SentRequest;
