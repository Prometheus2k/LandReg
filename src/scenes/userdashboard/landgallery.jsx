import * as React from "react";
import { CssBaseline, Container, Box, Grid } from "@mui/material";
import { LandState } from "context/landProvider";
import { useEffect, useState } from "react";
import LandGalleryCard from "./utils/LandGalleryCard";

const LandGallerypage = () => {
  const { signer, contract } = LandState();
  const [myLands, setMyLands] = useState([]);
  const [account, setAccount] = useState("");
  useEffect(() => {
    const fetchMyLands = async () => {
      const res = await signer.getAddress();
      setAccount(res);
      const values = await contract.returnAllLands();
      console.log(values);
      setMyLands(values);
    };
    fetchMyLands();
  }, [contract, signer]);

  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{ m: 2 }}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {myLands.length > 0 &&
              myLands.map((land) => (
                <LandGalleryCard key={land.id} land={land} account={account} />
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LandGallerypage;
