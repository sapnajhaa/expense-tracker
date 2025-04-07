import React from "react";
import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from '@mui/material/Divider';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AreaChartRoundedIcon from "@mui/icons-material/AreaChartRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuItem = [
    {
      id: 1,
      name: "Records",
      icon: <PaidRoundedIcon />,
      route: "/budget",
    },
    {
      id: 2,
      name: "Reward",
      icon: <EmojiEventsRoundedIcon />,
      route: "/reward",
    },
    {
      id: 3,
      name: "Notification",
      icon: <NotificationsRoundedIcon />,
      route: "/notification",
    },
    {
      id: 4,
      name: "Analysis",
      icon: <AreaChartRoundedIcon />,
      route: "/charts",
    },
    {
      id: 5,
      name: "Reports",
      icon: <SummarizeRoundedIcon />,
      route: "/reports",
    },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => navigate("/")}
            >
              Expence Tracker
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
          <Typography variant="h6" textAlign={"center"} padding={1} color={"primary"}>Expense Tracker</Typography>
          <Divider/>
          {menuItem.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => navigate(item.route)}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </Drawer>
      {children}
    </>
  );
};
export default Layout;
