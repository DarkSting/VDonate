import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Axios from '../../api/axios';
import { LoadSubSpinner } from '../../CommonComponents/SpinFunction';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const RequestCard = ({Data,itemArray,setArray,setOpen,setText,setSeverity})=>{

    const [userId,setID] = useState(Data.User._id);
    const [requestId,setRequestID] = useState(Data.request._id);


    console.log(Data.request._id);

    function setApprove(){

        setText('Loading...');
        setSeverity('warning');
        setOpen(true);
        Axios.post('donation/acceptdonationrequest',{donorID:userId, requestID:requestId}).then(r=>{
            console.log(r.data);
            let newarray = itemArray.filter((item)=>
                item.request._id !==requestId);
            setArray(newarray);
            setSeverity('success');
            setText('Approved');
            setOpen(true);

        }).catch(error=>{
            setSeverity('error');
            setText('Approved Failed');
            console.log(error);

        })

    }

    function deleteApproval(){

        setText('Loading...');
        setSeverity('warning');
        setOpen(true);
        Axios.put('donation/deletedonationrequest/',{donorID:userId, requestID:requestId}).then(r=>{
            console.log(r.data);
            let newarray = itemArray.filter((item)=>
                item.request._id !==requestId);
            setArray(newarray);
            setSeverity('success');
            setText('Rejected');
            setOpen(true);
        }).catch(error=>{

            setSeverity('error');
            setText('Failed to reject');

        })

    }

    return(
        <Card  elevation={1} sx={{marginTop:2}}>
                    <CardContent>
                        <div>
                            <Typography variant="h5">User Information</Typography> 
                        </div>
                        <Typography variant="body1">
                            <strong>Name:</strong> {Data.User.userName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {Data.User.email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Contact Number:</strong> {Data.User.phone}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Donation Type:</strong> {Data.request.donationType}
                        </Typography>
                        <Typography variant="body1" >
                            <strong>Comment:</strong> {Data.request.description}
                        </Typography>
                    </CardContent>
                    <CardActions >
                    <Button variant="contained" onClick={setApprove}>
                                Approve
                    </Button>
                    <Button variant="contained" onClick={deleteApproval} sx={{backgroundColor:'red','&:hover':{
                        backgroundColor:'green'
                    }}}>
                                Reject
                    </Button>
                        </CardActions>
                </Card>
    );

}


const CardList = ({ Data, itemArray, setArray,setOpen,setText,setSeverity}) => {


    return (
        <div>
            {Data.map((card, index) => (
                
                card.User===null? <></> : (<RequestCard Data={card} itemArray={itemArray} setArray={setArray} setOpen={setOpen} setSeverity={setSeverity} setText={setText}/>)
            ))}
        </div>
    );

};


export default function DonationRequest(){

    const[requests,setRequests] = useState([]);
    const[loading,setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setServerity] = useState('success');
    const [text, setText] = useState('null');
      

    useEffect(()=>{

        Axios.get('donation/getdonationrequests').then(r=>{
            setRequests(r.data.requestsArrays);
            setLoading(true);
            console.log(r.data);
        }).catch(error=>{

            console.log(error);
        })

    },[])

    return(
        <>
        {requests.length>0?(<CardList Data={requests} itemArray={requests} setArray={setRequests} setOpen={setOpen} setSeverity={setServerity} setText={setText} />):LoadSubSpinner(loading,setLoading,"No Pending Requests")}
        <Snackbar
      open={open}
      autoHideDuration={4000} // Adjust as needed
      onClose={() => setOpen(false)}
    >
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {text}
      </MuiAlert>
    </Snackbar>
        </>
    )

}
