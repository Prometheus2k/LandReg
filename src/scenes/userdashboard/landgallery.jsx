import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import landgallery from "asset/landgallery.png";

const LandGallerypage = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={landgallery} title="ground" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Ground
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Surat, Gujarat, India.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  );
};

export default LandGallerypage;
