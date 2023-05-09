import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { LandState } from "context/landProvider";
import { useEffect, useState } from "react";

const LandGalleryCard = (props) => {
  const { land, account } = props;
  console.log(land);
  const { contract } = LandState();
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const fetchRequestStatus = async (id) => {
      const res = await contract.requestStatus(id);
      console.log(res);
      setStatus(res);
    };
    fetchRequestStatus(land.id);
  });
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  const buyRequest = async (id) => {
    console.log(id);
    const res = await contract.requestforBuy(id);
    console.log(res);
  };

  return (
    <>
      {land.landOwner !== account && land.isLandVerified && land.isForSell && (
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
                {console.log(status)}

                {status === 1n ? (
                  <Button disabled variant="contained">
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
      )}
    </>
  );
};

export default LandGalleryCard;
