import { Card, CardContent, List, Typography } from "@mui/material";
import { LandState } from "context/landProvider";

const Dashboardpage = () => {
  const { setLIPage } = LandState();
  return (
    <List sx={{ display: "flex" }}>
      <Card
        sx={{
          margin: "0 auto",
          height: "125px",
          width: "350px",
          bgcolor: "lightGreen",
        }}
        onClick={() => {
          setLIPage(2);
        }}
      >
        <CardContent>
          <Typography>Verify user requests</Typography>
          <Typography sx={{ fontSize: "40px" }}>1</Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          margin: "0 auto",
          height: "125px",
          width: "350px",
          bgcolor: "lightBlue",
        }}
        onClick={() => {
          setLIPage(3);
        }}
      >
        <CardContent>
          <Typography>Verify land requests</Typography>
          <Typography sx={{ fontSize: "40px" }}>1</Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          margin: "0 auto",
          height: "125px",
          width: "350px",
          bgcolor: "yellow",
        }}
        onClick={() => {
          setLIPage(4);
        }}
      >
        <CardContent>
          <Typography>Total Land Transfers</Typography>
          <Typography sx={{ fontSize: "40px" }}>1</Typography>
        </CardContent>
      </Card>
    </List>
  );
};

export default Dashboardpage;
