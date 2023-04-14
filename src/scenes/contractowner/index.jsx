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
import ChangeCOpage from "./changeCo";

const drawerWidth = 240;

export default function ContractDashboard() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [page, setpage] = React.useState(0);
  const navigate = useNavigate();

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
            setpage(1);
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
            setpage(2);
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
            setpage(3);
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

  const content = (page) => {
    switch (page) {
      case 1:
        return <AddLIpage />;
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
        {content(page)}
      </Box>
    </Box>
  );
}
