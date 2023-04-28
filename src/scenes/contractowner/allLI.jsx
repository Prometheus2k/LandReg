import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { LandState } from "context/landProvider";
import { useEffect } from "react";

const AllLIpage = () => {
  const { contract } = LandState();

  const [rows, setRows] = React.useState([]);

  const removeLI = async (addr) => {
    const res = await contract.removeLandInspector(addr);
    console.log(res);
  };

  useEffect(() => {
    const getLI = async () => {
      const res = await contract.returnAllLandInspectorsDetails();
      setRows(res);
      console.log(res);
    };
    getLI();
  }, [contract]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Public Key</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Designation</TableCell>
            <TableCell align="center">City</TableCell>

            <TableCell align="center">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length !== 0 &&
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id.toString()}
                </TableCell>
                <TableCell align="center">{row._inspectorAddress}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.age + ""}</TableCell>
                <TableCell align="center">{row.designation}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => removeLI(row._inspectorAddress)}
                    variant="contained"
                    sx={{ bgcolor: "red" }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllLIpage;
