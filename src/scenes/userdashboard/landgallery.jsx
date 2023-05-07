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
import { LandState } from "context/landProvider";
import { useEffect, useState } from "react";
const LandGallerypage = () => {
  const { signer, contract } = LandState();
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

  const buyRequest = async (id) => {
    const res = await contract.requestforBuy(id);
    console.log(res);
  };

  const fetchRequestStatus = async (id) => {
    const res = await contract.requestStatus(id);
    console.log(res);
    return res;
  };

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
                  land.isLandVerified &&
                  land.isForSell && (
                    <Grid item xs={4}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={land.landPicture}
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
                            {"Price : " + land.landPrice}
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
                            {fetchRequestStatus(land.id) === "1" ? (
                              <Button disabled variant="text">
                                Buy request sent
                              </Button>
                            ) : (
                              <Button
                                onClick={() => buyRequest(land.id)}
                                color="info"
                                variant="contained"
                              >
                                Request to Buy
                              </Button>
                            )}
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
