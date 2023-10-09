import {
    useJsApiLoader,
    GoogleMap,
    InfoWindow,
    Autocomplete,
    Marker,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
  import CircularProgress from '@mui/material/CircularProgress';
  import { Box, ButtonGroup, Container, IconButton, Stack, TextField, Typography, Button} from '@mui/material';
import { useEffect } from 'react';
import { CenterFocusStrong, LocationCity, Refresh } from '@mui/icons-material';

const libraries = ['places'];


const RenderMarkers = ()=>{



return(
  <>
  <Marker position={{lat: 6.927079, lng: 79.861244}} title='colombo'/>
         
  <Marker position={{lat: 6.95079, lng: 79.861270}} title='colombo'/>
  </>
)

}


  export default function CustomMap (){

    const center = { lat: 6.927079, lng: 79.861244 }

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [forceRerender, setForceRerender] = useState(false);

useEffect(() => {
  // Trigger a re-render when the component mounts or when forceRerender changes
  // This may help ensure the map is correctly initialized
  // You can toggle the value of forceRerender as needed
  setForceRerender(!forceRerender);
}, []);


  /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDKv4-KCDZuUgtvKNHq-DKKlFRiFhzpvdY",
        libraries:libraries,
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
    originRef.current.children[0].children[0].value = ''
    destiantionRef.current.children[0].children[0].value = ''
  }

  const MarkerList = [{lat: 6.927079, lng: 79.861260},
  {lat: 6.927079, lng: 79.861270},
{lat: 6.927079, lng: 79.861278} ]


  return (

        
    <Stack direction={{sm:"column",md:"row"}} sx={{backgroundColor:'white'}}>
        {/* Google Map Box */}
    
        <GoogleMap
        
          center={center}
          zoom={15}
            mapContainerStyle={ {width:'100%',height:'auto'}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            
            
          }}

          
          onLoad={map => setMap(map)}
        >
 
          <Marker position={{lat: 6.927079, lng: 79.861244}} title='colombo'/>

          <Marker position={{lat: 6.927079, lng: 79.861244}} title='colombo'/>
            
        {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
        
      <Box
        p={4}
        borderRadius='lg'
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <Stack spacing={2} justifyContent='space-between'>
       
            <Autocomplete>
              <TextField fullWidth type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>

            <Autocomplete>
              <TextField fullWidth
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
                
              />
            </Autocomplete>
         


            <Button variant='contained' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>

       
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


  );

  }