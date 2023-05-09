import * as React from "react";
import { TableCell, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LandState } from "context/landProvider";

const RecievedRequest = (props) => {
  const { row } = props;

  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");
  const { contract } = LandState();

  const rejectlandRequest = async (id) => {
    const res = await contract.rejectRequest(id);
    console.log(res);
  };

  const approvelandRequest = async (id) => {
    const res = await contract.acceptRequest(id);
    console.log(res);
  };

  useEffect(() => {
    const fetchRecievedLandDetails = async () => {
      const res = await contract.landPrice(row.landId);
      // console.log(res);
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
    fetchRecievedLandDetails();
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
        <TableCell align="center">{row.buyerId}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">{price + ""}</TableCell>
        <TableCell align="center">{row.isPaymentDone + ""}</TableCell>
        {status === "Requested" ? (
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
    </>
  );
};

export default RecievedRequest;
