import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';





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

export default function DescCard(props) {
    

  return (
    <Card sx={{ width: props.width, backgroundColor:"#F1DEC944" ,boxShadow:'none'}}>
      <CardMedia sx={{height:props.height, justifyContent:'center', alignItems:'center', display:'flex',overflow:'hidden'}}>
         <Image src={props.image} width={'auto'} height={'150%'} />
      </CardMedia>
      <CardContent sx={{color:"brown", overflow:'hidden',marginBottom:2}}>
        <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:'bold'}}>
          {props.topic}
        </Typography>
        <Typography variant="body1"  sx={{ height:props.contheight}}>
          {props.content}
        </Typography>
      </CardContent>
      <CardActions>
        <CardButton size="small" onClick={()=>{}}>Learn More</CardButton>
      </CardActions>
    </Card>
  );
}