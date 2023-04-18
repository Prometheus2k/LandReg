import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ContactsIcon from "@mui/icons-material/Contacts";
import LogoutIcon from "@mui/icons-material/Logout";
import AddLIpage from "./addLI";
import AllLIpage from "./allLI";
import LIRegisterPage from "./addLI";
import ChangeCOpage from "./changeCo";
import { useEffect, useState } from "react";
import { LandState } from "context/landProvider";

const drawerWidth = 240;

export default function ContractDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [page, setpage] = useState(0);
  const navigate = useNavigate();
  const { CO_page, setCOPage } = LandState();

  useEffect(() => {
    setCOPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <ListItemText>Steve Roger</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            setCOPage(1);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText>Add Land Inspector</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            setCOPage(2);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText>All Land Inspector</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            setCOPage(3);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ManageHistoryIcon />
            </ListItemIcon>
            <ListItemText>Change Contract Owner</ListItemText>
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
        return <LIRegisterPage />;
      case 2:
        return <AllLIpage />;
      case 3:
        return <ChangeCOpage />;
      default:
        return <AddLIpage />;
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
            Contract Owner Dashboard
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
        {content(CO_page)}
      </Box>
    </Box>
  );
}
