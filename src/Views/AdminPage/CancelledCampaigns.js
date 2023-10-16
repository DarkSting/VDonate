import React, { useEffect, useState } from 'react';
import {Card ,
CardContent ,
Typography,
Box,
Stack} from '@mui/material';

import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { LoadSubSpinner } from '../../CommonComponents/SpinFunction';
import NotAvailableContent from '../../CommonComponents/ContentNotAvailableText';

const CampaignCard = ({ campaign}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant="body1">Location: {campaign.location}</Typography>
        <Typography variant="body1">Time Begin: {campaign.timeBegin}</Typography>
        <Typography variant="body1">Time End: {campaign.timeEnd}</Typography>
        <Typography variant="body1">Donors count: {campaign.donors.length}</Typography>
        <Typography variant="body1">Blood Container Capacity: {campaign.capacity}</Typography>
      </CardContent>
    </Card>
  );
};


export default function CancelledCampaignTab(){

    const[availablecampains,setAvailableCampaigns] = useState([]);

    const[isLoaded,setLoaded] = useState(false);
   
    const {openSnackbar, closeSnackbar} = useSnackbar();

    useEffect(()=>{

        Axios.get('/campaign/getcancellcampaigns').then(r=>{
            setAvailableCampaigns(r.data.foundCampaigns)
            console.log(r);
            openSnackbar({
                message: 'Data Loaded',
                color:'green',
                
              })
              console.log(r.data)
              setLoaded(true);

        }).catch(error=>{
            openSnackbar({
                message: 'Data Loading Failed',
                color:'red',
                
              })
        })

    },[])

   


    return(
        <Box>
        {
        !isLoaded?LoadSubSpinner(isLoaded, setLoaded, "No Cancelled Campaigns") :
          (<Stack spacing={1} direction='column' sx={{marginTop:'20px'}}>
            {availablecampains.length>0?availablecampains.map((value)=>
                (<CampaignCard key={value._id} campaign={value}/>) ):(<NotAvailableContent text="No Cancelled Campaings" />)
            }
          </Stack>)}
        </Box>

    )

}