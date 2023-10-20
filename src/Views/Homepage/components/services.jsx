import React from "react";
import { List, ListItem, ListItemText, Typography,Box} from "@mui/material";
import { CheckCircle, LocationOn, MedicalServices, Phone, Receipt, Report, VerifiedUser } from "@mui/icons-material";

const FeaturesList = () => {
  const features = [
    { icon: <CheckCircle fontSize="large" sx={{color:'#7D7C7C'}} />, text: "Online donor registrations" },
    { icon: <Phone fontSize="large" sx={{color:'#7D7C7C'}}/>, text: "Mobile donation campaigns" },
    { icon: <MedicalServices fontSize="large" sx={{color:'#7D7C7C'}}/>, text: "Emergency services for urgent blood needs" },
    { icon: <Receipt fontSize="large" sx={{color:'#7D7C7C'}} />, text: "Improved notification system to notify details about campaigns and donations" },
    { icon: <LocationOn fontSize="large" sx={{color:'#7D7C7C'}}/>, text: "Tracking the nearby location of donors" },
    { icon: <Report fontSize="large" sx={{color:'#7D7C7C'}}/>, text: "Online blood reports handling" },
    // Add more features here
  ];

  return (
    <Box sx={{display:'flex',justifyContent:'center', flexWrap:'wrap',margin:'50px 0px'}}>
    <List >
      {features.map((feature, index) => (
        <ListItem key={index} >
          {feature.icon}
          <Typography variant="h6" sx={{marginLeft:"20px"}}>{feature.text}</Typography>
        </ListItem>
      ))}
    </List>
    
    </Box>
  );
};

export default FeaturesList;
