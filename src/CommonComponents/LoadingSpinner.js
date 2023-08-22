import React from 'react';
import './Spinner.css'
import { Typography } from '@mui/material';

const LoadingSpinner = () => {
    return (
        
      <div className="loading-spinner">
        <Typography variant="h5" sx={{color:'black',marginTop:2}}>Please wait </Typography>
        <div className="spinner"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;

  export function SubSpinner(){

    return (
        
      <div className="sub-spinner-body">
        <div className="small-spinner" ></div>
      </div>
    );
  };