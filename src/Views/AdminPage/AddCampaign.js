import React, { useState,useContext, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button}from '@mui/material';
import Tab from "../../CommonComponents/TabComponent";
import { MyContext } from "../..";
import Axios from '../../api/axios';
import { Stack } from 'react-bootstrap';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { ArrowUpward, CircleOutlined } from '@mui/icons-material';

function CardForm(){

    const [selectedItems, setSelectedItems] = useState([]);
    const [availableItems, setAvailableItems] = useState([]);  
    const {openSnackbar, closeSnackbar} = useSnackbar();
    const {darkColor} = useContext(MyContext);

    useEffect(()=>{
      openSnackbar({
        message: 'Loading',
        color:'#000000',
        
      })
        Axios.get('donation/getapprovedrequests').then(r=>{
        //setAvailableItems(r.data.requestsArrays);
        let tempArray = [];
        r.data.requestsArrays.map((value)=>{
            tempArray.push(value.User);
        })

        setAvailableItems(tempArray);
        openSnackbar({
          message: 'Data Loaded',
          color:'green',
          
        })
      

    }).catch(error=>{
      openSnackbar({
        message: 'Loading',
        color:'red',
        
      })
        console.log(error);
    })

    },[])
  
    const handleSelectItem = (item) => {
      const newSelectedItems = [...selectedItems, item];
      const newAvailableItems = availableItems.filter((i) => i !== item);
  
      setSelectedItems(newSelectedItems);
      setAvailableItems(newAvailableItems);
    };
  
    const handleDeselectItem = (item) => {
      const newSelectedItems = selectedItems.filter((i) => i !== item);
      const newAvailableItems = [...availableItems, item];
  
      setSelectedItems(newSelectedItems);
      setAvailableItems(newAvailableItems);
    };
  
    return (
      
  
      <Card sx={{width:'200%', flex:1}}>
        <CardContent>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Typography variant="body1"><b>Available Donors:</b></Typography>
              <List>
                {availableItems.map((item, index) => (
                  <ListItem key={index} button onClick={() => handleSelectItem(item)}>
                    <ListItemText primary={item.userName} />
                  </ListItem>
                ))}
              </List>
            </div>
            <div style={{ flex: 1 }}>
              <Typography variant="body1"><b>To Be Added Donors:</b></Typography>
              <List>
                {selectedItems.map((item, index) => (
                  <ListItem key={index} button onClick={() => handleDeselectItem(item)}>
                    <ListItemText primary={item.userName} />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
          <Stack>
          <Button variant="contained" color="primary" onClick={() =>{
            openSnackbar({
              message: 'Creating Campaign...',
              color:'#000000',
              icon:<ArrowUpward />
            })
          }}>
            Save
          </Button>
          </Stack>
        </CardContent>
      </Card>
   
    );

}


function CampaignTab() {
  
    const { darkColor } = useContext(MyContext);

    return (
        <Tab title="Campaigns" fontSize="h4" fontColor="white" renderContent={<CardForm />} titleBackColor={darkColor}></Tab>
    );
  
}

export default CampaignTab;
