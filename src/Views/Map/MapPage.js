import React from "react";
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  
    const defaultProps = {
    center: {
      lat: 6.9271,
      lng: 79.8612
    },
    zoom: 11
  };



  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
    
      <GoogleMapReact
        bootstrapURLKeys={{  }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom} 
        yesIWantToUseGoogleMapApiInternals
        options={{clickableIcons:false,disableDefaultUI:true}}
      >

        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="My Marker"
        />


      </GoogleMapReact>
    </div>
  );
}