import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import { useSnackbar } from '../../../CommonComponents/SnackBarContext';
import Axios from '../../../api/axios';


const PasswordChangeDialog = ({ open, onClose }) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {openSnackbar, closeSnackbar} = useSnackbar();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'oldPassword') setOldPassword(value);
      if (name === 'newPassword') setNewPassword(value);
      if (name === 'confirmPassword') setConfirmPassword(value);
    };
  
    const handleSubmit = () => {
      if (newPassword !== confirmPassword) {
        openSnackbar({
            message: `Password doesnt match`,
            color:'red',
        
    })
        return;
      }
  
      
      Axios.post('/admin/updatepass', { oldPassword, newPassword })
        .then((response) => {
          
          console.log(response.data);
          openSnackbar({
            message: `Password updated`,
            color:'green',
        
        })
          onClose();
        })
        .catch((error) => {
            openSnackbar({
                message: `Password update failed`,
                color:'red',
            
            })
        });
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent sx={{display:'flex',gap:2,flexDirection:'column',width:'400px'}}>
          <TextField
            name="oldPassword"
            label="Old Password"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={handleChange}

            sx={{marginTop:'10px'}}
          />
          <TextField
            name="newPassword"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={newPassword}
            onChange={handleChange}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={confirmPassword}
            onChange={handleChange}
          />
          <Button
            onClick={() => setShowPassword(!showPassword)}
            variant="contained"
            color="primary"
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Change Password
          </Button>
        </DialogContent>
      </Dialog>
    );
  };
  

  export default PasswordChangeDialog;