import * as React from "react";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { LandState } from "context/landProvider";
import { useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
const Dashboardpage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { signer, contract } = LandState();

  const [values, setValues] = useState("");
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  useEffect(() => {
    const getUser = async () => {
      const account = await signer.getAddress();
      const values = await contract.ReturnUser(account);
      console.log(values);
      setValues(values);
    };
    getUser();
  }, [contract, signer]);

  return (
    <form>
      <Box sx={{ paddingBottom: 2 }}>
        <Stack direction="row" spacing={6}>
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

          <Button variant="text" onClick={() => openInNewTab(values.document)}>
            View Document
          </Button>
        </Stack>
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
          value={values._userAddress}
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
