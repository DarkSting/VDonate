import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';

const DonorList = () => {

    const[donors,setDonors] = useState([])

    const {openSnackbar, closeSnackbar} = useSnackbar();

    useEffect(()=>{

        Axios.get('user/findAllUsers').then(r=>{
    
          console.log(r)
          setDonors(r.data.users)
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


  return (
    <div style={{marginTop:'30px'}}>
      {donors.map((donor) => (
        <Card key={donor.userID} variant="outlined" style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {donor.name}
            </Typography>
            <Typography color="text.secondary">User ID: {donor.userID}</Typography>
            <Typography color="text.secondary">Phone: {donor.phone}</Typography>
            <Typography color="text.secondary">Email: {donor.email}</Typography>
            <Typography color="text.secondary">NIC: {donor.nic}</Typography>
            <Typography color="text.secondary">Blood Type: {donor.bloodType}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DonorList;