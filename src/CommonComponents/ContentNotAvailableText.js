import { Typography } from '@mui/material';
import React from 'react';


export default function NotAvailableContent({text}){


    return(

        <Typography variant="h4" sx={{backgroundColor:"#F5F5F5",padding:'20px',borderRadius:'10px',textAlign:'center',alignItems:'center',marginTop:'50px'}}>{text}</Typography>

    )

}

