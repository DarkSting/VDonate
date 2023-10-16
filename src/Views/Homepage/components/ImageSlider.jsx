import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageSlider.css';

import image1 from './images/1.jpg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg' // Create a CSS file for styling
import { Typography } from '@mui/material';

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
      <Typography variant='h3'>Total Donations Given</Typography>
    </div>
    <div className="box" style={{backgroundColor:'#9E6F21'}}>
      <Typography variant='h3'>Campaigns Completed</Typography>
      </div>
    <div className="box" style={{backgroundColor:'#C38154'}}>
      <Typography variant='h3'>Make</Typography>
    </div>
  </div> 
  </>
  );
};

export default ImageSlider;
