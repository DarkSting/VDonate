import styled from "@emotion/styled";
import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
  PersonAdd,
  Mail,
  Bloodtype,
  Report,
  Inbox,
  Dashboard,
} from "@mui/icons-material";

import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";

import {
  Box,
  List,
  Stack,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

const ListButtonProp = (props) => {
  return {
    "&.Mui-selected": {
      borderLeft: "solid 5px " + props.bordeColor,
      backgroundColor: "#C4B0FF",
    },
    "&:hover": {
      backgroundColor: "#A3AAcc",
    },
  };
};

const ListText = styled(ListItemText)(({ theme }) => ({}));

const setPanel = (event) => {
  console.log(event);
};

function renderComponent(current) {
  switch (current) {
    case "New Users":
      return <Typography variant="h3">New Users</Typography>;
    case "Campaigns":
      return <Typography variant="h3">Campaigns</Typography>;
    case "Blood Stock":
      return <Typography variant="h3">Blood Stock</Typography>;
    case "Emergencies":
      return <Typography variant="h3">Emergencies</Typography>;
    case "Inbox":
      return <Typography variant="h3">Inbox</Typography>;
    case "Complains":
      return <Typography variant="h3">Complains</Typography>;
    case "Reports":
      return <Typography variant="h3">Reports</Typography>;
  }
}

const state = [
  "New Users",
  "Campaigns",
  "Blood Stock",
  "Emergencies",
  "Inbox",
  "Complains",
  "Reports",
];

const Sidebar = (props) => {
  const [selectedItem, setSelectedItem] = useState("New Users");

  return (
    <Grid container spacing={2} sx={{ height: "93vh" }}>
      <Grid item xs={2} md={3} lg={2}>
        <Box position="fixed">
          <List sx={{ marginTop: "50px" }}>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedItem === "New Users"}
                onClick={() => {
                  setSelectedItem(state[0]);
                }}
                sx={ListButtonProp(props)}
              >
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListText
                  sx={{ display: { xs: "none", md: "block" } }}
                  primary="New Users"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedItem === "Campaigns"}
                onClick={() => {
                  setSelectedItem(state[1]);
                }}
                sx={ListButtonProp(props)}
              >
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListText
                  sx={{ display: { xs: "none", md: "block" } }}
                  primary="Campaigns"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedItem === "Blood Stock"}
                onClick={() => {
                  setSelectedItem(state[2]);
                }}
                sx={ListButtonProp(props)}
              >
                <ListItemIcon>
                  <Bloodtype />
                </ListItemIcon>
                <ListText
                  sx={{ display: { xs: "none", md: "block" } }}
                  primary="Blood Stock"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedItem === "Emergencies"}
                onClick={() => {
                  setSelectedItem(state[3]);
                }}
                sx={ListButtonProp(props)}
              >
                <ListItemIcon>
                  <EmergencyShareIcon />
                </ListItemIcon>
                <ListText
                  sx={{ display: { xs: "none", md: "block" } }}
                  primary="Emergencies"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedItem === "Inbox"}
                onClick={() => {
                  setSelectedItem(state[4]);
                }}
                sx={ListButtonProp(props)}
              >
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListText
                  sx={{ display: { xs: "none", md: "block" } }}
                  primary="Inbox"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedItem === "Complains"}
                onClick={() => {
                  setSelectedItem(state[5]);
                }}
                sx={ListButtonProp(props)}
              >
                <ListItemIcon>
                  <Report />
                </ListItemIcon>
                <ListText
                  sx={{ display: { xs: "none", md: "block" } }}
                  primary="Complains"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedItem === "Reports"}
                onClick={() => {
                  setSelectedItem(state[6]);
                }}
                sx={ListButtonProp(props)}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListText
                  sx={{ display: { xs: "none", md: "block" } }}
                  primary="Reports"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Grid>
      <Grid item xs={10} md={9} lg={10}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {renderComponent(selectedItem)}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
