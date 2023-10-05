import { Container, Typography, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';



const Footer = ({color,backColor, marginTop}) => {

  const fontColor = color || 'white';
  const phoneNumber = '+94-78 166 9946'
  const backgroundColor = backColor || '#C08261';
  const margintop = marginTop ||'10px';

  return (
    <footer style={{backgroundColor:backgroundColor,marginTop:margintop, padding:'50px',boxShadow:'0px -5px 5px #B4B4B3aa'}} >
      <Container sx={{backgroundColor:backgroundColor, display:'flex',justifyContent:'center'}}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={4} sx={{display:'flex',justifyContent:'center'}} >
            <div >
              <Typography variant="h3" component="h2" sx={{color:fontColor,textAlign:'center'}}>
                VDonate
              </Typography>
              <Typography variant="body2" sx={{color:fontColor,textAlign:'center'}}>Live Together For A Better Future</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4} sx={{display:'flex',justifyContent:'center'}}>
            <div style={{display:'flex',flexDirection:'column'}}>
              <Typography variant="h5" gutterBottom sx={{color:fontColor,textAlign:'center'}}>
                Follow Us
              </Typography>
              <div>
              <IconButton color="inherit" component={Link} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon sx={{color:fontColor}}/>
              </IconButton>
              <IconButton color="inherit" component={Link} href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon sx={{color:fontColor}}/>
              </IconButton>
              <IconButton color="inherit" component={Link} href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon sx={{color:fontColor}} />
              </IconButton>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} sx={{display:'flex',justifyContent:'center'}}>
            <div >
              <Typography variant="h5" sx={{color:fontColor,textAlign:'center'}} gutterBottom>
                Contact Us
              </Typography>
              <Typography sx={{color:fontColor,textAlign:'center'}} variant="body1">{phoneNumber}</Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;