import React from 'react'
import { Card,CardActionArea, CardContent, CardMedia, Typography,Box } from '@mui/material'
import daker from '../../../CommonComponents/ColorDarker.js';



export default function Tab(props){

    const lightColor = daker(props.titleBackColor,0,77);

   

    return(
 
      <>
   
                <Box sx={{backgroundColor:lightColor,borderBottom:'3px solid '+props.titleBackColor, width:'95%',borderRadius:'8px'}}>
                <Typography variant={props.fontSize} sx={{padding:'10px',color:props.fontColor}}>{props.title}</Typography>
                
                
                {props.renderContent}

                </Box>
          

          
               
                </>
    
  );


}