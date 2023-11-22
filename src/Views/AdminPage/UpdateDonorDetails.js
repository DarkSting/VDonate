// EditProfileDialog.js
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';

const EditDonor= ({ open, onClose, user, onUpdateUser,setUpdate }) => {

  //passing through the parent element
  const [editedUser, setEditedUser] = useState({ ...user });
  const {openSnackbar, closeSnackbar} = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleChangeBloodType = (event)=>{
    setEditedUser({...editedUser,bloodType:event.target.value});
  }

  useEffect(()=>{
    setEditedUser({...user})
  },[user])

  const handleSubmit = async () => {

    console.log(editedUser)
    
    try {
     
      await Axios.put('/user/updateUser', editedUser);
        setUpdate(true);
      // Update the user locally
      onUpdateUser(editedUser);
      openSnackbar({
        message: `User updated`,
        color:'green',
    
})
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      openSnackbar({
        message: `User update fail`,
        color:'red',
    
})
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent sx={{display:'flex',gap:2, flexDirection:'column',width:'600px'}}>
        <TextField
          name="nic"
          label="Nic"
          fullWidth
          value={editedUser.nic}
          onChange={handleChange}
          sx={{marginTop:'20px'}}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          value={editedUser.email}
          onChange={handleChange}
        />
        
        <TextField
          name="phone"
          label="Phone Number"
          fullWidth
          value={editedUser.phone}
          onChange={handleChange}
        />
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Blood Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editedUser.bloodType}
              label="Blood Type"
              onChange={handleChangeBloodType}
            >
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
              <MenuItem value={"AB+"}>AB+</MenuItem>
              <MenuItem value={"AB-"}>AB-</MenuItem>
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"O-"}>O-</MenuItem>
            </Select>
         
          </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditDonor;
