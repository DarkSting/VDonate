import React, { useState,useContext } from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button}from '@mui/material';
import Wrapper from '../../CommonComponents/Wrap';
import Tab from "./TabComponent";
import { MyContext } from "../..";

function CardForm(){

    const initialList = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    const [selectedItems, setSelectedItems] = useState([]);
    const [availableItems, setAvailableItems] = useState(initialList);
  
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
              <Typography variant="subtitle1">Available Items:</Typography>
              <List>
                {availableItems.map((item, index) => (
                  <ListItem key={index} button onClick={() => handleSelectItem(item)}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </div>
            <div style={{ flex: 1 }}>
              <Typography variant="subtitle1">Selected Items:</Typography>
              <List>
                {selectedItems.map((item, index) => (
                  <ListItem key={index} button onClick={() => handleDeselectItem(item)}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
          <Button variant="contained" color="primary" onClick={() => console.log(selectedItems)}>
            Save
          </Button>
        </CardContent>
      </Card>
   
    );

}


function DualBoxCard() {
  
    const { color, darkColor } = useContext(MyContext);

    return (
        <Tab title="Campaigns" fontSize="h4" fontColor="white" renderContent={<CardForm />} titleBackColor={darkColor}></Tab>
    );
  
}

export default DualBoxCard;
