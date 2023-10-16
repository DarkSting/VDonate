import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Axios from '../../api/axios';
import { LoadSubSpinner } from '../../CommonComponents/SpinFunction';


const CardList = ({ Data}) => {


    return (
        <div>
            {Data.map((card, index) => (
                
                card.User===null? <></> : (<Card  elevation={1} variant='outlined' key={index} sx={{marginTop:2}}> 
                    <CardContent>
                        <div>
                            <Typography variant="h5">User Information</Typography> 
                        </div>
                        <Typography variant="body1">
                            <strong>Name:</strong> {card.User.userName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {card.User.email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Contact Number:</strong> {card.User.phone}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Donation Type:</strong> {card.request.donationType}
                        </Typography>
                        <Typography variant="body1" >
                            <strong>Comment:</strong> {card.request.description}
                        </Typography>
                    </CardContent>
                </Card>)
            ))}
        </div>
    );
};


export default function GetApprovedDonationRequests(){

    const[requests,setRequests] = useState([]);
    const[loading,setLoading] = useState(false);

    useEffect(()=>{

       
        Axios.get('donation/getapprovedrequests').then(r=>{
            setRequests(r.data.requestsArrays);
            setLoading(true);
            console.log(r.data);
        }).catch(error=>{

            console.log(error);
        })

    },[])

    return(

        requests.length>0?(<CardList Data={requests} />):LoadSubSpinner(loading,setLoading,"No Approved Requests")

    )

}
