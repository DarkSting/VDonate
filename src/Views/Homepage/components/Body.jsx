import {Box, IconButton, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import img from '../images/slideshowimg.jpg'
import logo from '../images/logo.png'
import {useState,useEffect}from 'react';
import { Paper,Grid} from '@mui/material';
import {  ArrowRight } from "@mui/icons-material";
import { ArrowLeft } from '@mui/icons-material';
import Card from './Card';
import plasmaimg from '../images/plasma.jpg';
import blooddonimg from '../images/download.jpg';
import mapimg from '../images/map.jpg';
import Description from './TwoSideDescBox';
import donateimg from '../images/donating.jpg'
import './text.css'
import FeaturesList from './services';

const ImageBox = styled(Paper)({

    display:'flex',
    width: 'auto',
    height: 300,
    position: 'relative',
    justifyContent:'center',
    alignItems:'center',
    overflow: 'hidden',

});

const Text = styled(Typography)({
    
    overflow:'scroll',
    alignContent:'center',
    textTransform:'uppercase',
    justifyItems:'center',
     textAlign:'center',
     padding:'10px',
     overflowX :'hidden',
     fontSize:'1.4rem',
});

const DescBox = styled(Paper)({

    display:'grid',
    width: 400,
    height: 300,
    borderRadius:'10px',
    border:'2px solid #AC5B5B'
    
});



const Image = styled("img")({

    width:'90%',
    backgroundRepeat:'cover',
    height:'auto'

})

const gridItem = ()=>{
    return{
    alignItems:'center',
    display:'flex',
    justifyContent:'center',
    

};
}

const ImgSlider = ()=>{
   

  let desc1 = 'Source plasma donation and blood donation are critically important activities that contribute to saving lives.'
  + 'For many with rare diseases, these are the only therapies available to treat these chronic conditions.'
  +'Your plasma will be used to create therapies that treat a variety of conditions and diseases.'

  let desc2 = 'Tens of thousands of people are doing something amazing by registering to join our growing community of blood donors'
  +'ready to save lives when the NHS needs them.'

  let desc3 = 'Track the nearest blood location using our app and request for immediate blood transfustion'

  let cont = 'For cancer patients, blood transfusions can act as a resource to implement platelets back into the body after heavy treatments such as chemo or radiation therapy.'+

  'For cancer patients blood cells that are made in the bone marrow are often at risk. This lack of blood cell production can cause chronic diseases over'
  +'time which may affect organs such as the kidneys, spleen and liver.';

  let cont2 ='Everyone has their own justifications for giving blood, however a few typical ones are as follows:\n'+

  '\nMaking a donation is a kind act. It benefits those in need as well as members of your neighborhood. Others live when you contribute.'+
  'Donors, particularly those who give frequently, maintain a steady supply of blood in our country. Despite the fact that many individuals give blood following tragedies, it is still necessary every day of the year.'+
  
 'Blood cannot be substituted. Blood that can save lives is only available from donors to those who need it.'+
  'Giving is easy, quick, and handy. Even 30 minutes of your time may make a significant difference in someone else\'s life via donating.';
   
  return(
    <>

            <Box sx={{borderRadius:'10px',margin:'40px 0px',textAlign:'center'}}>
            <Typography variant='h2' sx={{color:'#7D7C7C'}}>As VDONATE we provide</Typography>
            <FeaturesList />
            <Grid container spacing={1} sx={{marginTop:5}}>
             <Grid item xs={12} lg={4} sx={gridItem} >
                <Card width="400px" height="200px" contheight="100px" topic="Donate Plasma" content={desc1} image={plasmaimg}></Card>       
             </Grid>
             <Grid item xs={12} lg={4} sx={gridItem}>
                 <Card width="400px" height="200px" contheight="100px" topic="Need to donate Blood for the first time?" content={desc2} image={blooddonimg}></Card>
             </Grid>
             <Grid item xs={12} lg={4} sx={gridItem}>
             <Card width="400px" height="200px" contheight="100px" topic="Track Location" content={desc3} image={mapimg}></Card>
             </Grid>
            </Grid>
            </Box>      
        <Description image={mapimg} height={'300px'} topic={'Why Cancer Patients Need Blood?'}  content={cont}
        topicColor={'#4F200D'} padding={3} textImage={"linear-gradient(100deg, #FFf6db, #ffffff)"}  textColor={'#4F200D' }
        btntxt={'Learn More'}
        />

        <Description image={donateimg} height={'300px'} topic={'Lets Donate'} direction="row-reverse" content={cont2}
        topicColor={'#fff'} padding={3} textImage={"linear-gradient(100deg, #D3756B, #F0997D)"}  textColor={'white'}
         btnclr={'white'} btntxtclr={'black'} btntxt={'Donate'}/>
            
        
    
    </>);

}

export default ImgSlider;