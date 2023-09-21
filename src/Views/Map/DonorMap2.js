import React from 'react';
import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDKv4-KCDZuUgtvKNHq-DKKlFRiFhzpvdY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={{ lat: 40.7128, lng: -74.0060 }} // Change to your desired center coordinates
      >
        <Marker
          position={{ lat: 40.7128, lng: -74.0060 }} // Marker position
          title="Marker Title" // Optional: Marker title
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;