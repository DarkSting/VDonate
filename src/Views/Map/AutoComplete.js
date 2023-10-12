import {
    useJsApiLoader,
    Autocomplete,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
  import CircularProgress from '@mui/material/CircularProgress';
  import { Box, Stack, TextField, Typography, Button} from '@mui/material';
  import { useEffect } from 'react';

  
  const libraries = ['places'];
  
  
  export default function CustomAutoComplete ({style}){
  
    const [forceRerender, setForceRerender] = useState(false);
  
  useEffect(() => {
  
  setForceRerender(!forceRerender);

  }, []);

  const autocomplete = useRef(null);

  const onLoad = (autocomplete) => {
    autocomplete.current = autocomplete;
   
  };

  const onPlaceChanged = () => {

    if (autocomplete.current !== null) {
      const place = autocomplete.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log('Coordinates:', { lat, lng });
      }
    }
  };
  

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
  
  
  return (
  
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <TextField fullWidth
                type='text'
                label="Destination"
                ref={destiantionRef}
                sx={style}
                
              />
            </Autocomplete>
  
  );
  
  }
  
    