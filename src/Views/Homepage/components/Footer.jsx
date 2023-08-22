import React from "react";
import {StyleSheet} from 'react'
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core";
import { Stack } from "@mui/material";
import Footer from "file path eka deepan methan ara uba haduwa footer eka"

const Image = styled('img')({

    width:'200px',
    height:'auto',
    objectFit:'cover',
    border:'none',
    borderRadius:'10px'

})

const commonStyles = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    width:'100wh',
    height:'100vh'

  };

export default function CreateIssues(){

    const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    // TODO: Send formData to server using fetch or axios
    setImage(file);
  };

    return(
<>
    
<Box sx={commonStyles} >
  
  <Typography variant="h3">This is a Blog!</Typography>
  <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center'}}>

        
      <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{width:'100%'}}/>
      

        <TextField fullWidth label="Tell us your problem here:" id="fullWidth"  multiline/>

        <Input type="file" hidden onChange={handleImageUpload} />
    
      {image && <Image src={URL.createObjectURL(image)} alt="Uploaded Image" />}
      <Button variant="contained">PLACE ISSUE</Button>
</Stack>   
</Box>
        {/*methan gahapan footer eka naththan uba footer kiyala wenama ekak hadala jsx file ekak eka import karala yata tag eka me widihata dapan
        
        
            <Footer />
        
            header ekath oya widihatama karapan*/}

       
        
</>
    
    )
}


{/* jsx file ekak hadapn footer kiyala hadala palleha tika ekata dala 

e file eka me file ekata import karanna uda mn sinhalen deela thiyena thana path eka deepan ara hadapu file eke

 <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        <Link color="inherit" href="https://www.example.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>



*/}