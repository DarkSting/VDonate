import React from 'react'
import { Card,CardActionArea, CardContent, CardMedia, Typography,Box } from '@mui/material'

export default function Tab(props){



    return(
 
        <Card  sx={{width:'95%',height:'95%',boxShadow:'none'}}> 

            <CardMedia sx={{display:'flex',justifyContent:'center'}}>
                <Box sx={{backgroundColor:props.titleBackColor,borderRadius:'10px'}}>
                <Typography variant={props.fontSize} sx={{padding:'10px',color:props.fontColor}}>{props.title}</Typography>
                </Box>
            </CardMedia>

            <CardContent sx={{display:'flex',justifyContent:'center',alignItems:'center',}}>
                {props.renderContent}
            </CardContent >
        </Card>
    
  );


}