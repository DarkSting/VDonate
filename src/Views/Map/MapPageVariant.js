import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
  import CircularProgress from '@mui/material/CircularProgress';
  import { Box, ButtonGroup, Container, IconButton, Stack, TextField, Typography, Button} from '@mui/material';

import { CenterFocusStrong, LocationCity, Refresh } from '@mui/icons-material';


  export default function CustomMap (){

    const center = { lat: 48.8584, lng: 2.2945 }

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDKv4-KCDZuUgtvKNHq-DKKlFRiFhzpvdY",
        libraries: ['places'],
      })


    if(!isLoaded){

        return (
        <Box sx={{display:'flex',flexDirection:'column  ',alignItems:'center'}}>
            <CircularProgress sx={{color:'white'}}  />
            <Typography variant="h5" sx={{color:'white'}}>Please wait</Typography>
        </Box>
            
        );

    }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }

    console.log(originRef.current.children[0].children[0].value);

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.children[0].children[0].value,
      destination: destiantionRef.current.children[0].children[0].value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Box>
        
    <Stack direction="row" sx={{backgroundColor:'white'}}>
        {/* Google Map Box */}
        
        <GoogleMap
          center={center}
          zoom={15}
            mapContainerStyle={ {width:'100%'}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <Stack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <TextField type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <TextField
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
                
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button variant='contained' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
        
          </ButtonGroup>
        </Stack>
        <Stack spacing={4}  justifyContent='space-between' >
          <Typography variant='body1'><b>Distance:</b> {distance} </Typography>
          <Typography><b>Duration:</b> {duration} </Typography>
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
        </Stack>
      </Box>
      </Stack>
      </Box>

  );

  }