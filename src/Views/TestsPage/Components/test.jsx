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
  Dashboard
} from "@mui/icons-material";

import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';

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
import CustomTab from './TabComponent'; 
import UsersContent from '../Reports';

const ListButtonProp = (props) => {
  return {
    '&.Mui-selected': { borderLeft: 'solid 5px ' + props.bordeColor, backgroundColor: props.backColor },
    '&:hover': {
      backgroundColor: props.backHoverColor,
      color: 'white'
    }
  }
}

const ListText = styled(ListItemText)(({ theme }) => ({}));

function renderUserContent() {
  return (
    <UsersContent />
  );
}

function renderComponent(current) {
  // ...switch case remains the same
}

const state = ['New Users', 'Campaigns', 'Blood Stock', 'Emergencies', 'Inbox', 'Complains', 'Reports'];

const Sidebar = (props) => {
  const [selectedItem, setSelectedItem] = useState('New Users');

  return (
    <Grid container spacing={2} sx={{ height: '93vh' }}>
      <Grid item xs={12} md={3} lg={2}>
        <Box position="fixed" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <List sx={{ mt: '50px' }}>
            {/* ...list items remain the same */}
            <ListItem disablePadding>
            <ListItemButton selected={selectedItem==='New Users'} onClick={()=>{setSelectedItem(state[0])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <PersonAdd/>
              </ListItemIcon>
              <ListText sx={{display:{xs:'none',md:'block'}}} primary="New Users" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={selectedItem==='Campaigns'} onClick={()=>{setSelectedItem(state[1])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary="Campaigns" />
            </ListItemButton >
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton selected={selectedItem==='Blood Stock'} onClick={()=>{setSelectedItem(state[2])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Bloodtype/>
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary="Blood Stock" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={selectedItem==='Emergencies'} onClick={()=>{setSelectedItem(state[3])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <EmergencyShareIcon />
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary="Emergencies" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={selectedItem==='Inbox'} onClick={()=>{setSelectedItem(state[4])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary="Inbox" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={selectedItem==='Complains'} onClick={()=>{setSelectedItem(state[5])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Report/>
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary="Complains" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={selectedItem==='Reports'} onClick={()=>{setSelectedItem(state[6])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary="Reports" />
            </ListItemButton>
          </ListItem>
         
          </List>
          {/* ...widgets or additional components at the bottom */}
        </Box>
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          {renderComponent(selectedItem)}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
