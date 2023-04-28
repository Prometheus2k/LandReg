import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import Dashboardpage from "./dashboardpage";
import VerifyUser from "./verifyuser";
import VerifyLandPage from "./verifylandpage";
import TransferOwnershipPage from "./transferownershippage";
import { VerifiedUser } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LandState } from "context/landProvider";

const drawerWidth = 240;

export default function LandInspectorDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, setName] = useState("");

  // const [page, setpage] = useState(0);
  const navigate = useNavigate();
  const { signer, contract, LI_page, setLIPage } = LandState();
  useEffect(() => {
    const getLIAddress = async () => {
      const address = await signer.getAddress();
      const res = await contract.returnLandInspector(address);
      console.log(res.name);
      setName(res.name);
    };

    getLIAddress();
    setLIPage(1);
  }, [contract, setLIPage, signer]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>{name}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            setLIPage(1);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            setLIPage(2);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <VerifiedUser />
            </ListItemIcon>
            <ListItemText>Verify User</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            setLIPage(3);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <WhereToVoteIcon />
            </ListItemIcon>
            <ListItemText>Verify Land</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            setLIPage(4);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <PublishedWithChangesIcon />
            </ListItemIcon>
            <ListItemText>Transfer Ownership</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => navigate("/")}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const content = (pageno) => {
    switch (pageno) {
      case 1:
        return <Dashboardpage />;
      case 2:
        return <VerifyUser />;
      case 3:
        return <VerifyLandPage />;
      case 4:
        return <TransferOwnershipPage />;
      default:
        return <Dashboardpage />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Land Inspector Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {content(LI_page)}
      </Box>
    </Box>
  );
}
