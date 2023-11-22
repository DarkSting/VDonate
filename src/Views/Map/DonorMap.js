import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  InfoWindow,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Box, ButtonGroup, Container, IconButton, Select,FormControl,MenuItem,InputLabel,Stack, TextField, Typography, Button, makeStyles} from '@mui/material';
import { useEffect } from 'react';
import { Add, CenterFocusStrong, LocationCity, Phone, Refresh } from '@mui/icons-material';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';

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
  const [activeMarker,setActiveMarker] = useState(null);
  const [locations,setLocations] = useState([]);
  const [searchedBloodType,setBloodType] = useState('N-');

  const [selectedMarker, setSelectedMarker] = useState(null);

  const {openSnackbar, closeSnackbar} = useSnackbar();

  const handleChangeBloodType = (event) => {
    setBloodType(event.target.value);
  };

useEffect(() => {

setForceRerender(!forceRerender);

}, []);

useEffect(()=>{

Axios.get(`user/getdonorslocation?bloodType=${searchedBloodType}`).then(r=>{

  console.log(r);
  setLocations(r.data);

  if(r.data.length==0){

    openSnackbar({
      message: `No available locations`,
      color:'red',
  
})
  }
  else{
    openSnackbar({
      message: `Locations available`,
      color:'green',
  
})
  }

}).catch(er=>{



})

},[searchedBloodType])

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

const handleMarkerClick = (marker) => {
  setSelectedMarker(marker)
  //map.panTo({lat:parseFloat(marker.location.latitude),lng:parseFloat(marker.location.longitude)})
};


return (

      
  <Stack direction={{sm:"column",md:"row"}} sx={{backgroundColor:'white'}}>
      {/* Google Map Box */}
  
      <GoogleMap
      
        center={center}
        zoom={8}
          mapContainerStyle={ {width:'100%',height:'auto'}}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          
          
        }}

        
        onLoad={map => setMap(map)}
      >

      

    {locations.map((marker, index) => (
          <Marker
            key={index}
            position={{lat:parseFloat(marker.location.latitude),lng:parseFloat(marker.location.longitude)}}
            onClick={() => handleMarkerClick(locations[index])}
          />
        ))}
        {selectedMarker !== null && (
          <InfoWindow
            position={{lat:parseFloat(selectedMarker.location.latitude),lng:parseFloat(selectedMarker.location.longitude)}}
            onCloseClick={() => handleMarkerClick(null)}
          >
            <div>
              <h2>Information</h2>
              <p>Username: {selectedMarker.name}</p>
              <p>Phone Number: {selectedMarker.phone}</p>
              <p>age: {selectedMarker.age}</p>
              <p>address: {selectedMarker?.location.name}</p>
            </div>
          </InfoWindow>
        )}
         
          
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
     
          <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Blood Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchedBloodType}
              label="Blood Type"
              onChange={handleChangeBloodType}
            >
              <MenuItem value={0}>A+</MenuItem>
              <MenuItem value={1}>A-</MenuItem>
              <MenuItem value={2}>B+</MenuItem>
              <MenuItem value={3}>B-</MenuItem>
              <MenuItem value={4}>AB+</MenuItem>
              <MenuItem value={5}>AB-</MenuItem>
              <MenuItem value={6}>O+</MenuItem>
              <MenuItem value={7}>O-</MenuItem>
              <MenuItem value={8}>All</MenuItem>
            </Select>
         
          </FormControl>
          {locations.length>0?<></>:<Typography sx={{color:'red'}}>No available locations</Typography>}
        </Box>

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

  