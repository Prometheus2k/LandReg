import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CssBaseline,
  Container,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import landgallery from "asset/landgallery.png";
import { LandState } from "context/landProvider";
import { useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
const LandGallerypage = () => {
  const { provider, setProvider, signer, setSigner, contract, setContract } =
    LandState();
  const [myLands, setMyLands] = useState([]);
  const [account, setAccount] = useState("");
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
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
              myLands.map(
                (land) =>
                  land.landOwner !== account &&
                  land.isLandVerified && (
                    <Grid item xs={4}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={land.landDocument}
                          title="ground"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {land.landArea + " acres"}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {land.landAddress}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {land.surveyNumber}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Stack direction="row" spacing={4}>
                            <Button
                              variant="text"
                              onClick={() => openInNewTab(land.landDocument)}
                            >
                              View Doc
                            </Button>
                            <Button
                              onClick={() => {}}
                              color="info"
                              variant="contained"
                            >
                              Buy
                            </Button>
                          </Stack>
                        </CardActions>
                      </Card>
                    </Grid>
                  ),
              )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LandGallerypage;
