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
const MyLandpage = () => {
  const { provider, setProvider, signer, setSigner, contract, setContract } =
    LandState();
  const [myLands, setMyLands] = useState([]);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
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
                      image={land.landDocument}
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
                        {land.isLandVerified && (
                          <Button
                            onClick={() => {}}
                            color="success"
                            variant="contained"
                          >
                            Sell
                          </Button>
                        )}
                        {!land.isLandVerified && (
                          <Button
                            onClick={() => {}}
                            variant="contained"
                            disabled
                          >
                            Sell
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
