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
import { LandState } from "context/landProvider";
import { useEffect } from "react";

const VerifyUser = () => {
  const [rows, setRows] = React.useState([]);
  const {
    provider,
    setProvider,
    signer,
    setSigner,
    contract,
    setContract,
    CO_page,
    setCOPage,
    LI_page,
    setLIPage,
  } = LandState();
  useEffect(() => {
    const userList = async () => {
      const res = await contract.ReturnAllUserDetails();
      console.log(res);
      setRows(res);
    };
    userList();
  }, []);
  const userVerify = async (address) => {
    console.log("verify");
    console.log(address);
    const res = await contract.verifyUser(address);
    console.log(res);
    console.log(await contract.isUserVerified(address));
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Aadhar&nbsp;Number</TableCell>
            <TableCell align="center">Pan</TableCell>
            <TableCell align="center">Document</TableCell>
            <TableCell align="center">Verify</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id + ""}
                </TableCell>
                <TableCell align="center">{row._userAddress}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.aadharCard}</TableCell>

                <TableCell align="center">{row.panCard}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    onClick={() => openInNewTab(row.document)}
                  >
                    View Document
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {row.isVerified && (
                    <Button variant="contained" disabled>
                      verified
                    </Button>
                  )}
                  {!row.isVerified && (
                    <Button
                      variant="contained"
                      onClick={() => userVerify(row._userAddress)}
                    >
                      verify
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

export default VerifyUser;
