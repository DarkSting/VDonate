import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Backdrop,
} from '@mui/material';

const UserProfileDialog = ({ open, onClose, userData }) => {
  const { username, age, nic, email, profileCreatedDate, phone, gender, bloodType, location } = userData;

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" sx={{padding:'30px'}}>
          <Typography variant="subtitle1">Username: {username}</Typography>
          <Typography variant="subtitle1">Age: {age}</Typography>
          <Typography variant="subtitle1">NIC: {nic}</Typography>
          <Typography variant="subtitle1">Email: {email}</Typography>
          <Typography variant="subtitle1">Profile Created Date: {profileCreatedDate}</Typography>
          <Typography variant="subtitle1">Phone: {phone}</Typography>
          <Typography variant="subtitle1">Gender: {gender}</Typography>
          <Typography variant="subtitle1">Blood Type: {bloodType}</Typography>
          <Typography variant="subtitle1">Location: {location}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const UserProfile = ({open,setOpen}) => {
  

  const userData = {
    username: 'JohnDoe',
    age: 30,
    nic: '12345-67890',
    email: 'john@example.com',
    profileCreatedDate: '2023-09-30',
    phone: '+1 123-456-7890',
    gender: 'Male',
    bloodType: 'O+',
    location: 'New York, USA',
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <UserProfileDialog open={open} onClose={handleClose} userData={userData} />
      {/* Backdrop to blur the background */}
      <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(5px)' }} />
    </div>
  );
};

export default UserProfile;
