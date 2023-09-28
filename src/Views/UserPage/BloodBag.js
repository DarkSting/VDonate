import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

import './BloodBag.css'; // Import a CSS file for styling (see below)

function BloodBag() {
  const [capacity, setCapacity] = useState(300); // Initialize capacity to 0

  const handleCapacityChange = (event) => {
    let newCapacity = parseInt(event.target.value);

    if (isNaN(newCapacity)) {
      newCapacity = 0;
    }

    if (newCapacity > 450) {
      newCapacity = 450;
    }
    
    else if(newCapacity<70){
            newCapacity = 70;
        }


    setCapacity(newCapacity);
  };

  return (
    <Box>
      <Typography variant="h4">Blood Bag</Typography>
      <Paper sx={{width:'100%'}}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" p={2} >
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
      </Box>
      <Box mt={2} className="blood-bag-container" sx={{width:'80%', justifyContent:'center'}}>
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
