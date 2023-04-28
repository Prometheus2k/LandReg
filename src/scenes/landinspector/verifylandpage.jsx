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
import { useEffect, useState } from "react";

// function createData(
//   number,
//   owner_address,
//   area,
//   price,
//   survey_no,
//   document,
//   verify,
// ) {
//   return { number, owner_address, area, price, survey_no, document, verify };
// }

// const rows = [
//   createData(1, "loremipsum", 350, 12345678, 123450, "cp_pdf", "verify"),
// ];

const VerifyLandPage = () => {
  const [rows, setRows] = useState([]);
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
    const verifyLand = async () => {
      const res = await contract.returnAllLands();
      console.log(res);
      setRows(res);
    };
    verifyLand();
  }, []);

  const landVerify = async (id) => {
    console.log("verify");
    console.log(id);
    const res = await contract.verifyLand(id);
    console.log(res);
    console.log(await contract.isLandVerified(id));
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
            <TableCell align="center">Owner&nbsp;Address</TableCell>
            <TableCell align="center">Area</TableCell>
            <TableCell align="center">Land Price</TableCell>
            <TableCell align="center">Survey&nbsp;No.</TableCell>
            <TableCell align="center">Land Address</TableCell>
            <TableCell align="center">Document</TableCell>
            <TableCell align="center">Picture</TableCell>
            <TableCell align="center">Verify</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => (
              <TableRow
                key={row.id + ""}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id + ""}
                </TableCell>
                <TableCell align="center">{row.landOwner}</TableCell>
                <TableCell align="center">{row.landArea + ""}</TableCell>
                <TableCell align="center">{row.landPrice + ""}</TableCell>
                <TableCell align="center">{row.surveyNumber}</TableCell>
                <TableCell align="center">{row.landAddress}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    onClick={() => openInNewTab(row.landDocument)}
                  >
                    View Document
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    onClick={() => openInNewTab(row.landPicture)}
                  >
                    View Picture
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {row.isLandVerified && (
                    <Button variant="contained" disabled>
                      verified
                    </Button>
                  )}
                  {!row.isLandVerified && (
                    <Button
                      variant="contained"
                      onClick={() => landVerify(row.id)}
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

export default VerifyLandPage;
