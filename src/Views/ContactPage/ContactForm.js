import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";

import './ContactForm.css'
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import contactimage from './images/contactus.jpg'

const ContactForm = () => {
  return (
    <Container>
      <div className="image-container">
        <div className="overlay">
        <Typography variant="h2" className="contact-form-title">
        Contact Us
      </Typography>
        </div>
        <img src={contactimage} alt="Contact" />
      </div>

      <Grid container spacing={3} sx={{marginTop:'10px'}}>
        <Grid item xs={12} lg={4}>
            <Box className="contact-box">
            <PhoneIcon fontSize="large" style={{ margin: "1rem 0" }} />
          <Typography variant="h6">Phone</Typography>
          <Typography>078-166-9946</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
        <Box className="contact-box">
        <EmailIcon fontSize="large" style={{ margin: "1rem 0" }} />
          <Typography variant="h6">Email</Typography>
          <Typography>akashgeethanjana320@gmail.com</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
        <Box className="contact-box">
        <LocationOnIcon fontSize="large" style={{ margin: "1rem 0" }} />
          <Typography variant="h6">Address</Typography>
          <Typography>Ekala</Typography>
          </Box>
        </Grid>
      </Grid>


      <form className="contact-form" style={{marginTop:'10px',marginBottom:'20px'}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactForm;
