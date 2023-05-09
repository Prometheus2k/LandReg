import * as React from "react";
import { TableCell, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LandState } from "context/landProvider";

const TransferRequest = (props) => {
  const { row } = props;
  const { contract } = LandState();
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [landAddress, setLandAddress] = useState("");

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  useEffect(() => {
    const fetchTransferLandDetails = async () => {
      const res = await contract.landPrice(row.landId);
      console.log(res);
      setPrice(res);
      const land = await contract.lands(row.landId);
      setLandAddress(land.landAddress);
      setPicUrl(land.landPicture);
      setDocumentUrl(land.landDocument);
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
    fetchTransferLandDetails();
  }, [contract, row.landId, row.land, row.reqId]);

  const Transferland = async (id, documentUrl) => {
    console.log(id, documentUrl);
    const res = await contract.transferOwnership(id, documentUrl);
    console.log(res);
  };
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
        <TableCell align="center">{row.sellerId}</TableCell>
        <TableCell align="center">{landAddress}</TableCell>
        <TableCell align="center">
          <Button variant="text" onClick={() => openInNewTab(documentUrl)}>
            View Document
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button variant="text" onClick={() => openInNewTab(picUrl)}>
            View Pic
          </Button>
        </TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">{price + ""}</TableCell>
        {status === "Paid" ? (
          <TableCell align="center">
            <Button
              variant="contained"
              onClick={() => {
                Transferland(row.reqId, documentUrl);
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
    </>
  );
};

export default TransferRequest;
