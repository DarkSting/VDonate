import React, { useContext, useState} from 'react';
import { Box,Tab, Tabs, Typography } from '@mui/material';
import MainTab from "../../../CommonComponents/TabComponent";
import { MyContext } from '../../..';
import UploadTest from '../Reports';


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
      <div >
        <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="Multiple Tabs Example"
        sx={{alignSelf:'flex-start',marginTop:5,}}
      >
        <Tab label="Upload Tests"  />
        <Tab label="Complete Tests" />
        <Tab label="Pending Tests" />
      </Tabs>
      <TabPanel value={currentTab} index={0} >
        <UploadTest />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>

      </TabPanel>
      <TabPanel value={currentTab} index={2}>
   
      </TabPanel>
    </div>
    )
  }


  function ReportTab() {
    
    const {  darkColor } = useContext(MyContext);

    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue);
    };
    
  
    return (
      <MainTab
          title="Reports"
          fontSize="h4"
          fontColor="white"
          titleBackColor={darkColor}
          renderContent={<ContentTabs currentTab={currentTab} handleTabChange={handleTabChange} />}
        ></MainTab>

    );
  }
  
  export default ReportTab;
  