import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageSlider.css';

import image1 from './images/1.jpg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg' // Create a CSS file for styling
import { Typography } from '@mui/material';
import AnimatedNumber from '../../../CommonComponents/CountUPNumber';
import Axios from '../../../api/axios';
import CountUp from 'react-countup';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Set the interval for image transitions (in milliseconds)
  };

  const images = [
    image2,
    image1,
    image3
    // Add more image URLs as needed
  ];

  const [campaigns,setCampaigns] = useState(0)
  const [onGoingCamps,setOnGoingCamps] = useState(0)
  const [totalDonations,setTotalDonations] = useState(0)
  const [isloaded,setLoaded] = useState(false)

  useEffect(()=>{

    Axios.get('campaign/gethomepageinfo').then(r=>{

      setCampaigns(r.data.completedCampaigns.length)
      setOnGoingCamps(r.data.onGoingCampaigns.length)
      setTotalDonations(r.data.totalDonations.length)
      console.log(r.data)
      setLoaded(true)

    }).catch(er=>{

      console.log(er)

    })

  })

  return (
  <>
    <div className="image-slider-container">
    <Carousel showArrows={true} showThumbs={false} dynamicHeight={true}>
      {images.map((image, index) => (
        <div key={index} className="image-slide">
          <img src={image}  />
          
        </div>
        
      ))} 
    </Carousel>
    <div className="number-overlay">
              <div className="overlay-content">
              <Typography variant='h1'>Give a helping hand</Typography>
              <Typography variant='h1'>to those who</Typography>
              <Typography variant='h1' sx={{color:'#FF9B9B',fontSize:'bold'}}>need it</Typography>
              </div>
    </div>   
  </div>
    <div className="boxes-container">
    <div className="box" style={{backgroundColor:'#BA704F'}}>
      <Typography variant='h3'>Island Wide Donations</Typography>
      <Typography variant='h1'><CountUp end={totalDonations==0?500:campaigns} duration={5} /></Typography>
        
      
    </div>
    <div className="box" style={{backgroundColor:'#9E6F21'}}>
      <Typography variant='h3'>Island Wide Completed Campaigns</Typography>
      <Typography variant='h1'><CountUp end={campaigns==0?200:onGoingCamps} duration={5} /></Typography>
    </div>
    <div className="box" style={{backgroundColor:'#C38154'}}>
      <Typography variant='h3'>Island Wide On Going Campaigns</Typography>
      <Typography variant='h1'><CountUp end={onGoingCamps==0?20:totalDonations} duration={5} /></Typography>
    </div>
  </div> 
  </>
  );
};

export default ImageSlider;
