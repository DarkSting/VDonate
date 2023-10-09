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
import React, { useEffect, useState } from "react";
import CustomTab from './TabComponent'; 
import UsersContent from '../UserCampaigns';
import UserComplainTab  from "../ComplainTab";
import DonationRequestTab from'../DonationRequestTab';
import SubTab from './SubTabs';
import CustomMap from "../../Map/DonorMap";
import BloodBag from "../BloodBag";
import MessageList from "../Message";
import SentMessageList from "../SentMessage";
import UserReportList from "../TestedReports";
import SentDontationRequestList from "../SentDonationRequests";



{/*implementation */}

{/*properties of elements */}
const ListButtonProp =(props)=>{

 return {
  
  '&.Mui-selected':{borderLeft:'solid 5px '+props.bordeColor,backgroundColor:props.backColor,color:'white'},
  '&.Mui-selected:hover':{backgroundColor:props.bordeColor},
  '&:hover':{
    backgroundColor:props.backHoverColor,
    color:'white'
  },
  borderRadius:'0px 5px 5px 0px'
  

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
function RenderTabsContent({props}){

  const tabarr = [<UsersContent/>,<DonationRequestTab hover={props.backHoverColor} color={props.backColor}/>,<SentDontationRequestList />];
  const selectedItemsarr = ["Pending Campaigns", "Donation Request", "Sent Donation Requests"];
  return(
   <SubTab props={props} selectedItems={selectedItemsarr} tabs={tabarr} />
  );
}

function RenderMessageTab({props}){
  const tabarr = [<MessageList />,<SentMessageList/>];
  const selectedItemsarr = ["InBox", "Messages Sent"];
  return(
   <SubTab props={props} selectedItems={selectedItemsarr} tabs={tabarr} />
  );
} 

function RenderComplainContent({props}){
  return(
    <UserComplainTab hover={props.backHoverColor} color={props.backColor}/>
  );
}



{/*sidebar options */}
function renderComponent(current,props,array){

  switch(current){
    case array[0]:
      return <CustomTab title="Add Campaign" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<RenderTabsContent props={props}/>}/>
    case array[1]:
      return <CustomTab title="Find Donors" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<CustomMap />}/>
    case array[5]:
      return <CustomTab title="Complains" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<RenderComplainContent props={props} />}/>
    case array[2]:
      return <CustomTab title="Blood Bag" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<BloodBag />}/>
    case array[4]:
      return <CustomTab title="Inbox" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<RenderMessageTab props={props}/>}/>
    case array[6]:
        return <CustomTab title="Reports" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<UserReportList />}/>
    case array[3]:
        return <CustomTab title="Emergencies" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<></>}/>
  }

}

const state = ['Campaign','Find Donors','Blood Bag', 'Emergencies','Inbox','Complains','Reports'];


{/*sidebar */}
const Sidebar = (props) => {

  const[selectedItem, setSelectedItem] = useState('Campaign');

  return (
    
    
      <Grid container spacing={2} sx={{height:'93vh'}}>
        <Grid item xs={2} md={3} lg={2}>
      <Box position="fixed" sx={{width:'100%', display: 'flex',flexDirection:'row',justifyContent: {sm:'center',lg:'flex-start',md:'flex-start'},marginTop:'50px'}} >

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
    
        
      },
      marginTop:{

        xs:3.5,
        lg:4,

      },
      width:'100%', display:'flex', justifyContent:'center',alignItems:'flex-start',height:'100%',overflow:'scroll'}}>
       {renderComponent(selectedItem,props,state)}
     </Box>
     </Grid>
    
  </Grid>
    
   
  );
};

export default Sidebar;
