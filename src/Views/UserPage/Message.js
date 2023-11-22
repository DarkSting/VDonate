import React, { useContext, useEffect, useState } from 'react';
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
  Autocomplete,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { NoData } from '../../CommonComponents/SpinFunction';
import { MyContext } from '../..';

const MessageCard = ({ username, message, sendDate, onDelete,receiver }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">Sender :{username}</Typography>
        <Typography variant="body1" m={3}>Description :{message}</Typography>
        <Typography variant="caption">Date Sent :{sendDate}</Typography>

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
    const{name,userID} = useContext(MyContext);

    const [messages, setMessages] = useState([]);

  useEffect(()=>{

    Axios.get(`user/getmessages?user=${userID}`).then(r=>{
        setMessages(r.data.foundMessages)
        console.log(r.data.foundMessages)
        openSnackbar({
            message: `Messages Loaded`,
            color:'green',
        
    })


    }).catch(er=>{

        console.log(er)
        openSnackbar({
            message: `No Messages Found`,
            color:'black',
        
    })
    })

    },[])

  const [anchorEl, setAnchorEl] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [description, setDescription] = useState('');
  const [admins,setAdmins] = useState([]);
  const[selectedAdmin,setSelectedAdmin] = useState(null);



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

    openSnackbar({
      message: `Message sending`,
      color:'black',
  
})
    Axios.post('user/sendmessage',{user:name,description:description,receiver:selectedAdmin}).then(r=>{

        console.log(r)
        openSnackbar({
            message: `Message sent`,
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

  useEffect(()=>{

    Axios.get('admin/findAllAdmins').then(r=>{

      console.log(r)
      setAdmins(r.data)
      openSnackbar({
          message: `Admins Loaded`,
          color:'green',
      
  })
  
  
  }).catch(er=>{
  
      console.log(er)
      openSnackbar({
          message: `Couldnt Load Admins`,
          color:'red',
      
  })

  })

  },[])

  const handleAutocompleteChange = (event, newValue) => {

    setSelectedAdmin(newValue);
    console.log(selectedAdmin)

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
          Send Message
        </Button>
      </div>
      {messages.length>0?messages.map((message, index) => (
        <MessageCard
          key={index}
          username={message.sender}
          message={message.description}
          sendDate={new Date(message.dateCreated).toLocaleString()}
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
          <Typography variant="h6">Message Box</Typography>
          <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onChange={handleAutocompleteChange}
        options={admins.map((option) => option.userName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select the user"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}

            
          />
        )}
      />
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
