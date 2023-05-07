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
import VerifiedIcon from "@mui/icons-material/Verified";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
const MyLandpage = () => {
  const { signer, contract } = LandState();
  const [myLands, setMyLands] = useState([]);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const makeitforsell = async (id) => {
    console.log(id);
    const res = await contract.makeItforSell(id);
    console.log(res);
  };
  const makeItNotforSell = async (id) => {
    const res = await contract.makeItNotforSell(id);
    console.log(res);
  };
  useEffect(() => {
    const fetchMyLands = async () => {
      const account = await signer.getAddress();
      const values = await contract.myAllLandsDetails(account);
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
            spacing={5}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {myLands.length > 0 &&
              myLands.map((land) => (
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={land.landPicture}
                      title="ground"
                    />
                    <CardContent>
                      {land.isLandVerified && (
                        <Typography
                          variant="body1"
                          noWrap
                          component="div"
                          color="#43a047"
                        >
                          Verified
                          <VerifiedIcon sx={{ color: "#43a047" }} />
                        </Typography>
                      )}
                      {!land.isLandVerified && (
                        <Typography
                          variant="body1"
                          noWrap
                          component="div"
                          color="#ef5350"
                        >
                          Not Verified
                          <UnpublishedIcon sx={{ color: "#ef5350" }} />
                        </Typography>
                      )}
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
                        {land.isForSell && (
                          <Button
                            onClick={() => makeItNotforSell(land.id)}
                            color="error"
                            variant="contained"
                          >
                            Make it Not for Sell
                          </Button>
                        )}
                        {land.isLandVerified && !land.isForSell && (
                          <Button
                            onClick={() => makeitforsell(land.id)}
                            color="success"
                            variant="contained"
                          >
                            Make it for Sell
                          </Button>
                        )}

                        {!land.isLandVerified && (
                          <Button variant="contained" disabled>
                            Unable to Sell
                          </Button>
                        )}
                      </Stack>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default MyLandpage;
