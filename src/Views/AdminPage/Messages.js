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

const MessageCard = ({ username, message, sendDate, onDelete }) => {
  return (
    <div>
    <Card variant="outlined" style={{ marginBottom: '16px',flex:1}}>
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
    </div>
  );
};

const MessageList = () => {

    const {openSnackbar, closeSnackbar} = useSnackbar();

  const [messages, setMessages] = useState([]);

  
  const{name,userID} = useContext(MyContext);

  useEffect(()=>{

    Axios.get(`user/getmessages?user=${userID}`).then(r=>{

        setMessages(r.data.foundMessages)
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
  const [users,setUsers] = useState([]);
  const[selectedUser,setSelectedUser] = useState({
    name: "",
    phone:"",
    userUD:""
    });


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
    Axios.post('admin/sendmessage',{user:name,description:description,receiver:selectedUser}).then(r=>{

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

    Axios.get('user/findAllUsers').then(r=>{

      console.log(r)
      setUsers(r.data.users)
      openSnackbar({
          message: `Users Loaded`,
          color:'green',

      
  })
  
  
  }).catch(er=>{
  
      console.log(er)
      openSnackbar({
          message: `Couldnt Load Users`,
          color:'red',
      
  })

  })

  },[])

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedUser(newValue);
    console.log(selectedUser)
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
          <Typography variant="h6">Create Message</Typography>
          <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onChange={handleAutocompleteChange}
        options={users.map((option) => option.name)}
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
