import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

import './BloodBag.css'; // Import a CSS file for styling (see below)
import { MyContext } from '../..';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';


function BloodBag() {

  const {name} = useContext(MyContext);
  const {openSnackbar, closeSnackbar} = useSnackbar();
  

useEffect(()=>{

  Axios.get(`user/getbloodbag?name=${name}`).then(r=>{

    setCapacity(r.data.foundBloodBag.capacity)
    setBloodBag(r.data.foundBloodBag)
    openSnackbar({
      message:'Blood Bag Loaded',
      color:'black'
    })


  }).catch(error=>{

    console.log(error)

    openSnackbar({
      message:'Blood Bag Loading Failed',
      color:'black'
    })
  })

},[])

  const [capacity, setCapacity] = useState(300); // Initialize capacity to 0
  const [bloodBag,setBloodBag] = useState(null);

  const handleCapacityChange = (event) => {
    let newCapacity = parseInt(event.target.value);

    if (isNaN(newCapacity)) {
      newCapacity = 0;
    }

    if (newCapacity > 450) {
      newCapacity = 450;
    }
    
    setCapacity(newCapacity);
    
  };

  const updateCapacity = ()=>{

    Axios.put('campaign/updatebloodbag',{capacity}).then(r=>{

      openSnackbar({
        message:'Blood Bag capacity updated',
        color:'green'
      })

    }).catch(er=>{

      openSnackbar({
        message:'Blood Bag Updating Failed',
        color:'red'
      })

    })
  }

  return (
    <Box>
      <Paper sx={{width:'100%'}}>
      <Box display="flex" flexDirection={{sx:'column',md:'row'}} alignItems="center" justifyContent="center" p={2} sx={{gap:2}}>
        <TextField
          label="Capacity (ml)"
          type="number"
          variant="outlined"
          value={capacity}
          onChange={handleCapacityChange}
          InputProps={{
            inputProps: { min: 70, max: 450 },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCapacity(450)}
        >
          Fill
        </Button>
        <Typography variant="h5">
        <b>Donation Type :</b> {bloodBag?.donationType}
        </Typography>
        <Typography variant="h5">
        <b>Date Created :</b> {bloodBag?.dateCreated}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateCapacity() }
        >
          update capacity
        </Button>
      </Box>
      <Box mt={2} className="blood-bag-container" sx={{width:'80%'}}>
        <div className="blood-bag-fill" style={{ height: `${(capacity / 450) * 100}%`,display:'flex',justifyContent:'center' }}>
        <Typography variant='h3' className="blood-bag-text" >
            {capacity} ml
          </Typography>
        </div>
      </Box>
      </Paper>
    </Box>
  );
}

export default BloodBag;
