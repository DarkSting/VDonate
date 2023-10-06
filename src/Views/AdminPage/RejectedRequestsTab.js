import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Axios from '../../api/axios';
import { LoadSubSpinner } from '../../CommonComponents/SpinFunction';


const RequestCard = ({Data,index})=>{

    return(
        <Card key={index} elevation={1} sx={{marginTop:2}} variant='outlined'>
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
                </Card>
    );

}


const CardList = ({ Data}) => {


    return (
        <div>
            {Data.map((card, index) => (
                
                card.User===null? <></> : (<RequestCard Data={card} index={index} />)
            ))}
        </div>
    );
};


export default function RejectedDonationRequests(){

    const[requests,setRequests] = useState([]);
    const[loading,setLoading] = useState(false);


    useEffect(()=>{

        Axios.get('donation/getrejectedrequests').then(r=>{
            setRequests(r.data.requestsArrays);
            setLoading(true);
            console.log(r.data.requestsArrays);
        }).catch(error=>{

            console.log(error);

        })

    },[])


    return(
        requests.length>0?(<CardList Data={requests} />):LoadSubSpinner(loading,setLoading,"No Rejected Requests")
    )

}
