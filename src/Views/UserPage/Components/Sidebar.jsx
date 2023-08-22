import styled from "@emotion/styled";
import {
  AccountBox,
  Article,
  Group,
  Explore,
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
import UserComplainTab  from "../ComplainTab";
import DonationRequestTab from'../DonationRequestTab';
import SubTab from './SubTabs';


{/*implementation */}

{/*properties of elements */}
const ListButtonProp =(props)=>{

 return {
  
  '&.Mui-selected':{borderLeft:'solid 5px '+props.bordeColor,backgroundColor:props.backColor,color:'white'},
  '&.Mui-selected:hover':{backgroundColor:props.bordeColor},
  '&:hover':{
    backgroundColor:props.backHoverColor,
    color:'white'
  }


}

}

const IconProp = (prop)=>{

  return{
    '&':{
      color:prop.bordeColor
    }
    ,
    '&:hover':{
      color:"white"
    }
  }
}

const ListText = styled(ListItemText)(({theme})=>({


}));

{/*add here other contents to be rendered inside a function */}
function renderTabsContent(props){

  const tabarr = [<UsersContent/>,<DonationRequestTab hover={props.backHoverColor} color={props.backColor}/>];
  const selectedItemsarr = ["Pending Campaigns", "Donation Request"];
  return(
   <SubTab props={props} selectedItems={selectedItemsarr} tabs={tabarr} />
  );
}

function renderUserContent(){
  return(
    <UsersContent />
  );
} 

function renderComplainContent(props){
  return(
    <UserComplainTab hover={props.backHoverColor} color={props.backColor}/>
  );
}

{/*sidebar options */}
function renderComponent(current,props,array){

  switch(current){
    case array[0]:
      return <CustomTab title="Add Campaign" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={renderTabsContent(props)}/>
    case array[1]:
      return <CustomTab title="Find Donors" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={renderUserContent()}/>
    case array[5]:
      return <CustomTab title="Complains" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={renderComplainContent(props)}/>
  }

}

const state = ['Campaign','Find Donors','Blood Stock', 'Emergencies','Inbox','Complains','Reports'];


{/*sidebar */}
const Sidebar = (props) => {

  const[selectedItem, setSelectedItem] = useState('Campaign');
  


  return (
    
    
      <Grid container spacing={2} sx={{height:'93vh'}}>
        <Grid item xs={2} md={3} lg={2}>
      <Box position="fixed" sx={{ width:'100%', display: 'flex',flexDirection:'row',justifyContent: {sm:'center',lg:'flex-start',md:'flex-start'}}} >

        {/*Campaign */}
        <List id="List" sx={{overflowX:'scroll',display:'flex',flexDirection:{
          sm:'row', lg:'column',md:'column'
        } ,scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': {
          display: 'none' // Chrome, Safari, Edge, and Opera
        }}}>
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem===state[0]} onClick={()=>{setSelectedItem(state[0])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Group sx={IconProp(props)}/>
              </ListItemIcon>
              <ListText sx={{display:{xs:'none',md:'block'}}} primary={state[0]} />
            </ListItemButton>
          </ListItem>

        {/*Pending Campaigns*/}
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem===state[1]} onClick={()=>{setSelectedItem(state[1])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Explore sx={IconProp(props)}/>
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary={state[1]}/>
            </ListItemButton >
          </ListItem>

          {/*Blood Stock*/}
          <ListItem  disablePadding>
            <ListItemButton selected={selectedItem===state[2]} onClick={()=>{setSelectedItem(state[2])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Bloodtype sx={IconProp(props)}/>
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary={state[2]} />
            </ListItemButton>
          </ListItem>

        {/*Emergencies*/}
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem===state[3]} onClick={()=>{setSelectedItem(state[3])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <EmergencyShareIcon sx={IconProp(props)}/>
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary={state[3]} />
            </ListItemButton>
          </ListItem>

         {/*Inbox*/}
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem===state[4]} onClick={()=>{setSelectedItem(state[4])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Inbox sx={IconProp(props)} />
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary={state[4]} />
            </ListItemButton>
          </ListItem>

    {/*Complains*/}
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem===state[5]} onClick={()=>{setSelectedItem(state[5])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Report sx={IconProp(props)}/>
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary={state[5]} />
            </ListItemButton>
          </ListItem>
     {/*Reports*/}
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem===state[6]} onClick={()=>{setSelectedItem(state[6])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <Dashboard sx={IconProp(props)} />
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary={state[6]} />
            </ListItemButton>
          </ListItem>
         
        </List>
        </Box>
        </Grid>
        <Grid item xs={10} md={9} lg={10}>

          {/*content */}
      <Box  sx={{marginLeft:{
        xs:-3.5,
        lg:-4,
    
        
      },width:'100%', display:'flex', justifyContent:'center',alignItems:'center',height:'100%',overflow:'scroll'}}>
       {renderComponent(selectedItem,props,state)}
     </Box>
     </Grid>
    
  </Grid>
    
   
  );
};

export default Sidebar;
