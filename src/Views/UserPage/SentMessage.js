import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { NoData } from '../../CommonComponents/SpinFunction';
import { MyContext } from '../..';

const MessageCard = ({ username, message, sendDate, onDelete }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">Receiver :{username}</Typography>
        <Typography variant="body1" m={3}>Description :{message}</Typography>
        <Typography variant="caption">Sent Date :{sendDate}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={onDelete} color="secondary" aria-label="Delete message">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const SentMessageList = () => {

    const {openSnackbar, closeSnackbar} = useSnackbar();

  const [messages, setMessages] = useState([]);
  const{name,userID} = useContext(MyContext);

  useEffect(()=>{

    Axios.get(`user/getsentmessages?user=${userID}`).then(r=>{

        setMessages(r.data.foundMessages)
        openSnackbar({
            message: `Messages Loaded`,
            color:'green',
        
    })


    }).catch(er=>{

        console.log(er)
        openSnackbar({
            message: `No sent messages`,
            color:'black',
        
    })
    })

    },[])




  return (
    <div style={{backgroundColor:'white',padding:'20px',width:'100%'}}>
      {messages.length>0?messages.map((message, index) => (
        <MessageCard
          key={index}
          username={message.receiver}
          message={message.description}
          sendDate={new Date(message.dateCreated).toLocaleString()}
        />
      )):NoData("No Messages Yet")}
     
    </div>
  );
};

export default SentMessageList;
