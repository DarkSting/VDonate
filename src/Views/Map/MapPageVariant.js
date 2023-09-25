import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,

} from '@react-google-maps/api';
import { useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack, TextField, Typography, Button } from '@mui/material';
import { useCallback } from 'react';
import { CenterFocusStrong } from '@mui/icons-material';
import { useMemo } from 'react';

const libraries = ['places'];


const MyMarkers = ({markers})=>{

  const[int,setInt] = useState(0);

  return (
    
    markers.map((value)=>{
      <>
      <Marker position={value} />
      </>
    })
  );


}

export default function CustomMap() {
   const center = useMemo(() => ({ lat:6.9271,lng:79.9102 }), []);;
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef();
  const destiantionRef = useRef();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDKv4-KCDZuUgtvKNHq-DKKlFRiFhzpvdY',
    libraries: libraries,
    id: 'google-map-script',
  });

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress sx={{ color: 'white' }} />
        <Typography variant="h5" sx={{ color: 'white' }}>
          Please wait
        </Typography>
      </Box>
    );
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.children[0].children[0].value,
      destination: destiantionRef.current.children[0].children[0].value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
  }

  return (
    <Box sx={{width:'100%'}}>
      <Stack direction="row" sx={{ backgroundColor: 'white' }}>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={14}
          mapContainerStyle={{ width: '100%', height: '400px' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <></>
          <MyMarkers markers={[{lat:6.9271,lng:78.9102}]} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
        <Box
          p={4}
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          minW="container.md"
          zIndex="1"
        >
          <Stack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              <Autocomplete>
                <TextField type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1}>
              <Autocomplete>
                <TextField
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>
            <Button variant="contained" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
          </Stack>
          <Stack spacing={4} justifyContent="space-between">
            <Typography variant="body1">
              <b>Distance:</b> {distance}
            </Typography>
            <Typography>
              <b>Duration:</b> {duration}
            </Typography>
          <Button
            variant='outlined'
            aria-label='center back'
            icon={<CenterFocusStrong />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          >
            Re-Center
        </Button>
        <Button
            variant='outlined'
            aria-label='center back'
            icon={<CenterFocusStrong />}
            isRound
            onClick={() => {
              
            }}
          >
            Refresh
        </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}