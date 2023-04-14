import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  Grid,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Navbar from "scenes/navbar";
import lp_image from "asset/lp_image.png";
import land_inspector from "asset/land_inspector.png";
import user_image from "asset/user_image.png";
import contract_owner from "asset/contract_owner.png";

const LandingPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box sx={{ padding: "5rem" }}>
          <Typography variant="h1">
            Land Registration using Blockchain
          </Typography>
          <Stack spacing={3} direction="row" sx={{ marginBlockStart: "2rem" }}>
            <Button variant="contained">
              <IconButton>
                <PlayCircleOutlineIcon />
              </IconButton>
              Watch demo
            </Button>
          </Stack>
        </Box>

        <Box>
          <img
            src={lp_image}
            style={{ width: "62vw", height: "auto" }}
            alt="landing page"
          />
        </Box>
      </Box>

      <Box
        width="100%"
        padding="8rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
        alignContent="center"
      >
        <Box sx={{ m: 2 }}>
          <Card sx={{ maxWidth: 345, borderRadius: "16px" }}>
            <CardMedia
              component="img"
              alt="Contract Owner"
              height="210"
              image={contract_owner}
            />
            <CardContent>
              <Typography variant="h3">
                <Grid container justifyContent="center">
                  Contract Owner
                </Grid>
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="center">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                >
                  Continue
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Box>

        <Box sx={{ m: 2 }}>
          <Card sx={{ maxWidth: 345, borderRadius: "16px" }}>
            <CardMedia
              component="img"
              alt="land inscpector"
              height="210"
              image={land_inspector}
            />
            <CardContent>
              <Typography variant="h3">
                <Grid container justifyContent="center">
                  Land Inspector
                </Grid>
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="center">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                >
                  Continue
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Box>

        <Box sx={{ m: 2 }}>
          <Card sx={{ maxWidth: 345, borderRadius: "16px" }}>
            <CardMedia
              component="img"
              alt="user"
              height="210"
              image={user_image}
            />
            <CardContent>
              <Typography variant="h3">
                <Grid container justifyContent="center">
                  User
                </Grid>
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="center">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                >
                  Continue
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
