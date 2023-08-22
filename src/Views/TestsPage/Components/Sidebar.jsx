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
import UsersContent from '../UserContent';
import axios from 'axios';


{/*implementation */}

const sessionData = sessionStorage.getItem('obj');
var userData = null;

//console.log(sessionData);

const awake = async()=>{

  await axios.post('http://localhost:8000/user/getUser', sessionData, {
    headers: {
   'Content-Type': 'application/json',
   }
}).then(res=>{

  userData = res;
  console.log(res);
   
}).catch(err=>{
   console.log(err)
})


}

awake();



{/*properties of elements */}
const ListButtonProp =(props)=>{

 return {
  
  '&.Mui-selected':{borderLeft:{sm:'0px',md:'0px',lg:'solid 5px '+props.bordeColor,backgroundColor:props.backColor},
  backgroundColor: props.backColor,
  
},
  '&:hover':{
    backgroundColor:props.backHoverColor,
    color:'white'
  },
  '&:active':{
    backgroundColor: props.backColor,
  }


}

}

const ListText = styled(ListItemText)(({theme})=>({


}));


function renderUserContent(){
  return(
   <UsersContent/>
  );
}


{/*sidebar options */}
function renderComponent(current){

  switch(current){
    case 'New Users':
      return <CustomTab title="New Users" titleBackColor="#C4B0FF" fontSize="h5" fontColor="white" renderContent={renderUserContent()}/>
    case 'Campaigns':
      return <CustomTab title="Campaings" titleBackColor="#C4B0FF" fontSize="h5" fontColor="white" renderContent={renderUserContent()}/>
    case 'Blood Stock':
      return <CustomTab title="Blood Stock" titleBackColor="#C4B0FF" fontSize="h5" fontColor="white" renderContent={renderUserContent()}/>
    case 'Emergencies':
      return <CustomTab title="Emergencies" titleBackColor="#C4B0FF" fontSize="h5" fontColor="white" renderContent={renderUserContent()}/>
    case 'Inbox':
      return <CustomTab title="Inbox" titleBackColor="#C4B0FF" fontSize="h5" fontColor="white"/>
    case 'Complains':
      return <CustomTab title="Complains" titleBackColor="#C4B0FF" fontSize="h5" fontColor="white"/>
    case 'Reports':
        return <CustomTab title="Reports" titleBackColor="#C4B0FF" fontSize="h5" fontColor="white"/>
   
  }

}

const state = ['New Users','Campaigns','Blood Stock', 'Emergencies','Inbox','Complains','Reports'];


{/*sidebar */}
const Sidebar = (props) => {

  const[selectedItem, setSelectedItem] = useState('New Users');
  const[user,setUser] = useState(userData);


  return (
    
      
      <Grid container spacing={2} sx={{height:'93vh'}}>
        <Grid item xs={12} md={3} lg={2}>
      <Box position="fixed" sx={{ width:'100%', display: 'flex',flexDirection:'row',justifyContent: {sm:'center',lg:'flex-start',md:'flex-start'}}} >

        <List id="List" sx={{overflowX:'scroll',display:'flex',flexDirection:{
          sm:'row', lg:'column',md:'column'
        } ,scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': {
          display: 'none' // Chrome, Safari, Edge, and Opera
        }}} >
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
        </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>

          {/*content */}
      <Box  sx={{width:'100%', display:'flex', justifyContent:'center',alignItems:'center',height:'100%'}}>
       {renderComponent(selectedItem)}
       <p>{user}</p>
     </Box>
     </Grid>
    
  </Grid>

  );
};

export default Sidebar;
