import React, { useState, useEffect } from 'react';




function Loc() {
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <h1>Get User's Location</h1>
      {latitude !== null && longitude !== null && (
        <p>
          Latitude: {latitude}<br />
          Longitude: {longitude}
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Loc;
