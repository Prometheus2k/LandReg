import { useState } from "react";
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
import AddLocationIcon from "@mui/icons-material/AddLocation";
import TerrainIcon from "@mui/icons-material/Terrain";
import PersonIcon from "@mui/icons-material/Person";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import Dashboardpage from "./dashboardpage";
import AddLandpage from "./addlandpage";

const drawerWidth = 240;

export default function UserDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setpage] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const SideNav = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>Tony Stark</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            setpage(1);
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
            setpage(2);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AddLocationIcon />
            </ListItemIcon>
            <ListItemText>Add Land</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TerrainIcon />
            </ListItemIcon>
            <ListItemText>My Land</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TerrainIcon />
            </ListItemIcon>
            <ListItemText>Land Gallery</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CallReceivedIcon />
            </ListItemIcon>
            <ListItemText>Received Request</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText>Sent Land Request</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
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

  const Content = (page) => {
    switch (page) {
      case 1:
        return <Dashboardpage />;
      case 2:
        return <AddLandpage />;
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
            User Dashboard
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
          {SideNav}
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
          {SideNav}
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
        {Content(page)}
      </Box>
    </Box>
  );
}
