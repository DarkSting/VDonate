import React, { useContext, useState} from 'react';
import DonationRequest from "../DonationRequest";
import { Box,Tab, Tabs, Typography } from '@mui/material';
import GetApprovedDonationRequests from '../ApproveDonationRequestsTab';
import RejectedDonationRequests from '../RejectedRequestsTab';
import MainTab from "../../../CommonComponents/TabComponent";
import { MyContext } from '../../..';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  

  function ContentTabs({currentTab,handleTabChange}){

    

    return(
      <div>
        <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="Multiple Tabs Example"
        sx={{alignSelf:'flex-start',marginTop:5}}
      >
        <Tab label="Pending Requests" />
        <Tab label="Approved Requests" />
        <Tab label="Rejected Requests" />
      </Tabs>
      <TabPanel value={currentTab} index={0} >
        <DonationRequest />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <GetApprovedDonationRequests />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <RejectedDonationRequests />
      </TabPanel>
    </div>
    )
  }


  function DonationReqTab() {
    
    const {  darkColor } = useContext(MyContext);

    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue);
    };
    
  
    return (
      <MainTab
          title="Requests"
          fontSize="h4"
          fontColor="white"
          titleBackColor={darkColor}
          renderContent={<ContentTabs currentTab={currentTab} handleTabChange={handleTabChange} />}
        ></MainTab>

    );
  }
  
  export default DonationReqTab;
  