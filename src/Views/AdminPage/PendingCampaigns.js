import React, { useEffect, useState } from 'react';
import {Card ,
CardContent ,
CardActions ,
Button ,
Typography,
Box,
Stack} from '@mui/material';
//import CardExpansion from './CardExpansion'; 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { ArrowDropDown, ArrowDropDownCircle, ArrowDropUp, ArrowUpward } from '@mui/icons-material';

const CampaignCard = ({ campaign }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="body2">Location: {campaign.location}</Typography>
        <Typography variant="body2">Time Begin: {campaign.timeBegin}</Typography>
        <Typography variant="body2">Time End: {campaign.timeEnd}</Typography>
        <Typography variant="body2">Blood Container Capacity: {campaign.capacity}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          variant='contained'
          onClick={() => {
            // Handle cancel button click
          }}
          style={{ marginLeft: 'auto' }}

        >
          Cancell
        </Button>
        <Button
          size="small"
          variant='contained'
          onClick={toggleExpansion}
          style={{ marginLeft: 'auto' }}
          endIcon={(expanded?<ArrowDropDownCircle />:<ArrowUpward />)}
        >
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </CardActions>
      {/* <CardExpansion expanded={expanded}>
    
      </CardExpansion> */}
      
    </Card>
  );
};


export default function PendingCampaignTab(){

    const[availablecampains,setAvailableCampaigns] = useState([]);
    const [startTime,setStartTime] = useState(null);
    const [endTime,setEndTime] = useState(null);
   
    const {openSnackbar, closeSnackbar} = useSnackbar();

    useEffect(()=>{

        Axios.get(`campaign/getpendingcampaigns?startTime=${startTime}&endTime=${endTime}`).then(r=>{
            setAvailableCampaigns(r.data)
            openSnackbar({
                message: 'Data Loaded',
                color:'green',
                
              })
              console.log(r.data)

        }).catch(error=>{
            openSnackbar({
                message: 'Data Loading Failed',
                color:'red',
                
              })
        })

    },[startTime,endTime])

   


    return(
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
            <Stack direction='row' spacing={2}>
            <DateTimePicker
              label="From Time"
              defaultValue={startTime}
              onChange={(newValue) => setStartTime(newValue)}
            />
            <DateTimePicker
              label="To Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
            />
            </Stack>
          </DemoContainer>
          </LocalizationProvider>
          <Stack spacing={1} direction='column' sx={{marginTop:'20px'}}>
            {availablecampains.map((value)=>
                (<CampaignCard key={value._id} campaign={value}/>)
            )}
          </Stack>
        </Box>

    )

}
