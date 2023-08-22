import React from 'react';
import { Paper,Grid,Box,Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import bloodimg  from '../images/blood.png'


const gridItem = ()=>{
    return{
    alignItems:'center',
    display:'flex',
    justifyContent:'center',
    margin:'0'
  
    
};
}

const CardButton = styled(Button)(({ theme }) => ({
    display: "flex",
    margin:0,
    justifyContent:'center',
    backgroundColor:"#F1DEC9aa",
    height:'50px',
    color:"brown",
    marginLeft:'0px',
    borderRadius:'5px',
    padding:'0 20px',
    fontWeight:'bold',
  
  
  '&:hover':{
    backgroundColor:'#6D3B3B',
    fontWeight:'bold',
    color:'#fff',
  }
  
  }));

  const Image = styled("img")({
    backgroundSize:'cover',

  
  });

const ContentBox = styled(Box)({
    
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    
});

const CardBox = styled(Card)({
    boxShadow:'none',
    height:'100%', 
    display:'flex',
    flexDirection:'column',
    backgroundSize:'cover',
  


})

export default function DescBox(props){


    return(
        <>
            <Grid container spacing={0.4} sx={{marginTop:3,flexDirection:props.direction,  padding:2}}>
                <Grid item xs={12} lg={3} sx={gridItem} >
                    <CardBox sx={{ height:props.height,width:'auto',backgroundColor:"#fff" ,boxShadow:'none'}}>
                        <CardMedia sx={{height:'100%', alignItems:'center', display:'flex',overflow:'hidden'}}>
                            <Image src={props.image} width={'auto'} height={'100%'} />
                        </CardMedia>
                    </CardBox>
                </Grid>
                <Grid item xs={12} lg={9} sx={gridItem}>
                <CardBox sx={{padding:props.padding,backgroundColor:props.color ,backgroundImage:props.textImage}}>
                    <CardContent sx={{color:props.topicColor, overflow:'hidden',height:'100%'}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:'bold'}} >
                        {props.topic}
                        </Typography>
                        <Typography variant={props.variant} sx={{color:props.textColor}} >
                           {props.content}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display:'flex', justifyContent:'flex-end'}}>
                        <CardButton size="small" onClick={()=>{}} sx={{backgroundColor:props.btnclr,color:props.btntxtclr}}>{props.btntxt}</CardButton>
                    </CardActions>
                </CardBox>
                </Grid>
            </Grid>
        </>
    )

}