import * as React from "react";
import {
  Box,
  TextField,
  useMediaQuery,
  useTheme,
  Typography,
  Stack,
} from "@mui/material";
import { LandState } from "context/landProvider";
import { useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
const Dashboardpage = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { provider, setProvider, signer, setSigner, contract, setContract } =
    LandState();

  const [values, setValues] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const account = await signer.getAddress();
      const values = await contract.ReturnUser(account);
      console.log(values);
      setValues(values);
    };
    getUser();
  }, [contract, signer]);

  // const values = {
  //   fullname: "John Due",
  //   email: "johndue@gmail.com",
  //   age: "30",
  //   city: "Surat",
  //   document: "aadhar.png",
  //   aadharcardno: "3333-4444-5555-6666",
  //   pancardno: "NTDO9385",
  // };
  return (
    <form>
      <Box sx={{ paddingBottom: 2 }}>
        {values.isVerified && (
          <Typography variant="h6" noWrap component="div" color="#43a047">
            Verified
            <VerifiedIcon sx={{ color: "#43a047" }} />
          </Typography>
        )}
        {!values.isVerified && (
          <Typography variant="h6" noWrap component="div" color="#ef5350">
            Not Verified
            <UnpublishedIcon sx={{ color: "#ef5350" }} />
          </Typography>
        )}
      </Box>

      <Box
        component="form"
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          required
          id="filled-required"
          label="Full Name"
          value={values.name}
          defaultValue="fullname"
          variant="filled"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          id="filled-required"
          label="Wallet Address"
          value={values.id}
          defaultValue="wallet address"
          variant="filled"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          id="filled-required"
          label="Email"
          value={values.email}
          defaultValue="email"
          variant="filled"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          id="filled-required"
          label="Age"
          value={values.age + ""}
          defaultValue="age"
          variant="filled"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          id="filled-required"
          label="City"
          value={values.city}
          defaultValue="city"
          variant="filled"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          id="filled-required"
          label="Document"
          value={values.document}
          defaultValue="document"
          variant="filled"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          id="filled-required"
          label="Aadhar card no"
          value={values.aadharCard}
          defaultValue="aadharcardno"
          variant="filled"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          id="filled-required"
          label="Pan card no"
          value={values.panCard}
          defaultValue="pancardno"
          variant="filled"
          sx={{ gridColumn: "span 2" }}
        />
      </Box>
    </form>
  );
};

export default Dashboardpage;
