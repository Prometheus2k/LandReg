import { Card, CardContent, List, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLiPage } from "state";

const Dashboardpage = () => {
  const dispatch = useDispatch();
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
          dispatch(setLiPage({ LI_page: 2 }));
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
          dispatch(setLiPage({ LI_page: 3 }));
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
          dispatch(setLiPage({ LI_page: 4 }));
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
