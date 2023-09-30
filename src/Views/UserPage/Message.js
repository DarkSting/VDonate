import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  IconButton,
  Popover,
  TextField,
  MenuItem,
  Box,
  FormControl,
  Select,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { NoData } from '../../CommonComponents/SpinFunction';

const MessageCard = ({ username, message, sendDate, onDelete }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">{username}</Typography>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="caption">{sendDate}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={onDelete} color="secondary" aria-label="Delete message">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const MessageList = () => {

    const {openSnackbar, closeSnackbar} = useSnackbar();

  const [messages, setMessages] = useState([
    {
      username: 'User1',
      message: 'Hello there!',
      sendDate: '2023-09-30 10:00 AM',
    },
    {
      username: 'User2',
      message: 'Hi! How are you?',
      sendDate: '2023-09-30 10:15 AM',
    },
    // Add more messages as needed
  ]);

  useEffect(()=>{

    Axios.get('user/getmessages').then(r=>{

        console.log(r)
        openSnackbar({
            message: `Messages Loaded`,
            color:'green',
        
    })


    }).catch(er=>{

        console.log(er)
        openSnackbar({
            message: `Message Loading Failed`,
            color:'red',
        
    })
    })

    },[])

  const [anchorEl, setAnchorEl] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [description, setDescription] = useState('');

  const handleDelete = (index) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  const handleCreateMessage = (event) => {
    setAnchorEl(event.currentTarget);
    openSnackbar({
        message: `Message Box Opened`,
        color:'black',
    
    
})


  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleSend = () => {


    Axios.post('user/sendmessage',{description,receiver}).then(r=>{

        console.log(r)
        openSnackbar({
            message: `Messages sent`,
            color:'green',
        
    })
    
    
    }).catch(er=>{
    
        console.log(er)
        openSnackbar({
            message: `Couldnt send the message`,
            color:'red',
        
    })
    })
  };

  return (
    <div style={{backgroundColor:'white',padding:'20px',width:'100%'}}>
       <div style={{  position: 'fixed',
          bottom: '30px',
          right: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',}}>
        <Button variant="contained" color="primary" onClick={handleCreateMessage} endIcon={<Add />}>
          Create Message
        </Button>
      </div>
      {messages.length>0?messages.map((message, index) => (
        <MessageCard
          key={index}
          username={message.username}
          message={message.message}
          sendDate={message.sendDate}
          onDelete={() => handleDelete(index)}
        />
      )):NoData("No Messages Yet")}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <Typography variant="h6">Create Message</Typography>
          <FormControl fullWidth style={{ marginTop: '8px' }}>
            <Select
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Receiver
              </MenuItem>
              <MenuItem value="User1">User1</MenuItem>
              <MenuItem value="User2">User2</MenuItem>
              {/* Add more receivers as needed */}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            style={{ marginTop: '8px' }}
          >
            Send
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default MessageList;
