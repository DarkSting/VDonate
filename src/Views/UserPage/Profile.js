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

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" sx={{padding:'30px',gap:2}}>
          <Typography variant="body1"><b>Username</b>: {userData?.username}</Typography>
          <Typography variant="body1"><b>NIC</b>: {userData?.nic}</Typography>
          <Typography variant="body1"><b>Email</b>: {userData?.email}</Typography>
          <Typography variant="body1"><b>Phone</b>: {userData?.phoneNumber}</Typography>
          <Typography variant="body1"><b>Blood Type</b>: {userData?.bloodType}</Typography>
          <Typography variant="body1"><b>Location</b>: {userData?.location}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const UserProfile = ({open,setOpen,user}) => {
  

  const userData = user


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
