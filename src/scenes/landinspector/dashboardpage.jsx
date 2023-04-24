import { Card, CardContent, List, Typography } from "@mui/material";
import { LandState } from "context/landProvider";
import { useEffect, useState } from "react";

const Dashboardpage = () => {
  const {
    provider,
    setProvider,
    signer,
    setSigner,
    contract,
    setContract,
    CO_page,
    setCOPage,
    LI_page,
    setLIPage,
  } = LandState();
  const [count, setCount] = useState({
    users: 0,
    lands: 0,
    transfers: 0,
  });
  useEffect(() => {
    const getCount = async () => {
      const users = await contract.userCount();
      const lands = await contract.LandCount();
      const transfers = await contract.transferRequestCount();
      setCount({
        users,
        lands,
        transfers,
      });
      console.log(users, lands, transfers);
    };
    getCount();
  }, [contract]);
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
          <Typography>Total Users Registered</Typography>
          <Typography sx={{ fontSize: "40px" }}>
            {count.users.toString()}
          </Typography>
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
          <Typography>Total Property Registered</Typography>
          <Typography sx={{ fontSize: "40px" }}>
            {count.lands.toString()}
          </Typography>
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
          <Typography>Total Property Transfered</Typography>
          <Typography sx={{ fontSize: "40px" }}>
            {count.transfers.toString()}
          </Typography>
        </CardContent>
      </Card>
    </List>
  );
};

export default Dashboardpage;
