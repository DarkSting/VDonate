import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { NoData } from '../../CommonComponents/SpinFunction';
import { MyContext } from '../..';

const MessageCard = ({ donationType, isApproved, sendDate, description }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">Donation Type :{donationType}</Typography>
        <Typography variant="body1" m={3}>description :{description}</Typography>
        <Typography variant="caption" m={3}>Approved :{isApproved?"yes":"No"}</Typography>
        <Typography variant="caption">Sent Date :{sendDate}</Typography>
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
  );
};

const SentDontationRequestList = () => {

    const {openSnackbar, closeSnackbar} = useSnackbar();

  const [messages, setMessages] = useState([]);
  const{name,userID} = useContext(MyContext);

  useEffect(()=>{

    Axios.get(`donation/findAllDonations?user=${userID}`).then(r=>{

        setMessages(r.data)
        openSnackbar({
            
            message: `Messages Loaded`,
            color:'green',
        
    })

    console.log(r.data)

    }).catch(er=>{

        console.log(er)
        openSnackbar({
            message: `Message Loading Failed`,
            color:'red',
        
    })
    })

    },[])




  return (
    <div style={{backgroundColor:'white',padding:'20px',width:'100%'}}>
      {messages.length>0?messages.map((message, index) => (
        <MessageCard
          key={index}
          donationType={message.donationType}
          isApproved={message.isApproved}
          sendDate={new Date(message.approvedDate).toLocaleString()}
          description={!message.description?"No Description":message.description}
        />
      )):NoData("No Sent Donation Requests Yet")}
     
    </div>
  );
};

export default SentDontationRequestList;
