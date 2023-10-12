import styled from "@emotion/styled";
import {
  Box,
  Grid,
  TextField,
  Stack,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  Button,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import logo from "../../../CommonComponents/images/logo.png";
import "./text.css";
import frmBack from "../../../CommonComponents/images/formbackimage.jpg";
import { useEffect, useRef, useState } from "react";
import Axios from "../../../api/axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import CustomLinkButton from "../../../CommonComponents/LinkButton";
import googleUrl from "axios";
import Footer from "../../../CommonComponents/Footer";
import './alert.css'
import { ErrorOutline, LocationCity } from "@mui/icons-material";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  InfoWindow,
  DirectionsRenderer,
} from '@react-google-maps/api'
import CustomAutoComplete from "../../Map/AutoComplete";
const TextBox = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "11009E",
    },
    "&:hover fieldset": {
      borderColor: "#4942E4",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#11009E",
    },
  },
  "& label": {
    color: "#11009E",
  },
  "& label.Mui-focused": {
    color: "#11009E",
  },
});

const Image = styled("img")({
  objectFit: "fill",
});

const fieldProp = {
  width: "90%",
  marginTop: "20px",
};

const btnprop = {
  width: "20%",
  height: "50px",
  backgroundColor: "#11009E",
  borderRadius: "40px",
  marginBottom: "10px",
  color: "white",
  "&:hover": {
    border: "1px solid #11009E",
    color: "#11009E",
    backgroundColor: "white",
    fontWeight: "bolder",
  },
};

const textprop = {
  marginLeft: "10px",
  alignContent: "center",
  color: "black",
  flexWrap: "wrap",
  color: "#11009E",
  fontSize: "1.5rem",
  fontFamily: "'Delius', cursive",
};

const descboxprop = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: "10px",
  color: "white",
  flexDirection: "column",
  flexWrap: "wrap",
  padding: "10px",
};

const signupbtn = {
  width: "80%",
  borderColor: "#11009E",
  color: "#11009E",
  "&:hover": {
    backgroundColor: "#11009E",
    color: "white",
    borderColor: "transparent",
  },
};

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const AdminButton = styled(CustomLinkButton)({
  "&:hover": {
    backgroundColor: "blue",
    color: "white",
  },

  borderColor: "blue",
  borderWidth: 1,
  borderStyle: "solid",
  color: "blue",
});

const libraries = ['places'];


export default function Form({ fontColor }) {
  textprop.color = fontColor;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const anchorOrigin = isSmallScreen
    ? { vertical: "bottom", horizontal: "center" } // for small screens
    : { vertical: "bottom", horizontal: "left" };

    const [forceRerender, setForceRerender] = useState(false);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
       
    /** @type React.MutableRefObject<HTMLInputElement> */
       const destiantionRef = useRef()
  
    useEffect(() => {
    
    setForceRerender(!forceRerender);
  
    }, []);
  
  
    const onPlaceChanged = () => {
  
      setAddress(destiantionRef)
      console.log(destiantionRef.current.children[0]);

      if (address) {
        // Use the Geocoding Service to retrieve coordinates
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === 'OK' && results[0]) {
            setAddress(results[0].formatted_address);
            setCoordinates({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
            console.log(coordinates)
          } else {
            console.error('Geocode was not successful for the following reason: ', status);
            
          }
        });
      }
    

    };
    
  
 
    
    
      const { isLoaded } = useJsApiLoader({
          googleMapsApiKey: "AIzaSyDKv4-KCDZuUgtvKNHq-DKKlFRiFhzpvdY",
          libraries:libraries,
        })
    
    
 

  const handleLogin = (arr) => {
    if (!longitude || !latitude) {
      setsccMSG("Fail to set the location cannot proceed the sign up");
      return;
    }

    let convertedDOB = ConvertToDOB(year, month, day);
    const post = async (arr, yr) => {
      const data = {
        name: arr[0].toLowerCase(),
        age: yr,
        nic: arr[2],
        gender: arr[3],
        email: arr[1],
        phone: arr[4],
        password: arr[5],
        latitude: latitude,
        longitude: longitude,
      };

      await Axios.post("user/addUser", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);

          setSeverity("success");
          setsccColor("#03C988");
          setsccMSG("Sign Up Success");
        })
        .catch((err) => {
          console.log(err);

          setSeverity("error");
          setsccColor("#F24C3D");
          setsccMSG("Sign Up Failed");
        });

    };

    function calculateAge(dateOfBirth) {
      let dob = new Date(dateOfBirth);
      let now = new Date();

      // Calculates the difference in milliseconds between the current date and the date of birth
      let diffInMs = now - dob;

      // Calculates the difference in years by dividing the difference in milliseconds by the number of milliseconds in a year
      let age = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

      return age;
    }

    // Example usage
    let age = calculateAge(convertedDOB);

    let valid = isNaN(new Date(convertedDOB));

    console.log(valid);

    if (!valid) {
      setDOB("");
      isDOBvalid = true;
      console.log(convertedDOB);
    } else {
      isDOBvalid = false;
      setDOB("Invalid date");
    }

    if (arr[0] === "") {
      isNameNull = true;
      setNameErr("name is not provided");
    } else {
      isNameNull = false;
      setNameErr("");
    }

    if (arr[4] === "") {
      setPhoneErr("phone number not provided");
      isPhoneNull = true;
    } else {
      setPhoneErr("");
      isPhoneNull = false;
    }
    if (arr[2] === "") {
      setNICErr("NIC is not provided");
      isNICNull = true;
    } else {
      setNICErr("");
      isNICNull = false;
    }
    if (arr[1] === "") {
      setEmailErr("Email is not provided");
      isEmailNull = true;
    } else {
      setEmailErr("");
      isEmailNull = false;
    }
    if (age < 18) {
      setAgeErr("age should be above 18");
    } else {
      setAgeErr("");
    }

    console.log(`email ${isEmailNull} nic${isNICNull} name${isNameNull} phone${isPhoneNull} age${age} dob:${dob}`)

    if (
      !isEmailNull &&
      !isNICNull &&
      !isNameNull &&
      !isPhoneNull &&
      age > 18 &&
      dob !== "invalid date"
    ) {
      post(arr, age);
    } else {
      setsccMSG("Sign Up Failed");
      setsccColor("#F24C3D");
      setSeverity("error");
    }
  };

  var isSent = false;

  var isNameNull,
    isEmailNull,
    isAddresNull,
    isNICNull,
    isAgeNull,
    isPhoneNull,
    isDOBvalid = false;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [sccColor, setsccColor] = useState("");
  const [nicErr, setNICErr] = useState("");
  const [ageErr, setAgeErr] = useState(0);
  const [dob, setDOB] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phonenum, setPhone] = useState("");
  const [gender, setGender] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [sccMSG, setsccMSG] = useState("");
  const [severity, setSeverity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });

  const handleClick = (Transition) => {
    setState({
      open: true,
      Transition,
    });
  };

  useEffect(() => {

    if (!latitude && !isBlocked) {
      getLocation();
    }

  }, [latitude, isBlocked]);

  //getting the location
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        function (error) {
          setError("Error getting location: " + error.message);
          setIsBlocked(true);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const valueList = [name, email, nic, gender, phonenum, latitude, longitude];

  const ConvertToDOB = (yy, mm, dd) => {
    let y = yy.trim();
    let m = mm.trim();
    let d = dd.trim();

    return y + "-" + m + "-" + dd;
  };


  const openLocationSettings = () => {

    const browserUrls = {
      chrome: 'chrome://settings/content/location',
      firefox: 'about:preferences#privacy',
      safari: 'preferences://Privacy',
      edge: 'edge://settings/content/location',
      brave: 'brave://settings/content/siteDetails?site=https%3A%2F%2Fexample.com',
    };

    const browser = getBrowserName();

    if (browserUrls[browser]) {
      window.location.href = browserUrls[browser];
    } else {

      console.log('Browser not supported');
    }
  };


  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'chrome';
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Safari')) return 'safari';
    if (userAgent.includes('Edg')) return 'edge';
    if (userAgent.includes('Brave')) return 'brave';
    return 'unknown'; 
  };


 

  const textBoxStyle = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "11009E",
      },
      "&:hover fieldset": {
        borderColor: "#4942E4",
      },
  
      "&.Mui-focused fieldset": {
        borderColor: "#11009E",
      },
    },
    "& label": {
      color: "#11009E",
    },
    "& label.Mui-focused": {
      color: "#11009E",
    },
  }

  return (
    <>
      {/*parent box*/}
      <Box component="div" sx={{ marginTop: "30px" }}>
        {/*grid container*/}
        <Grid container spacing={2} sx={{ height: "100%", width: "auto" }}>
          {/*grid items*/}
          <Grid item xs={12} lg={5.5}>
            {/*form holder to align the form horizontally and vertically*/}
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "auto",
              }}
            >
              {/*stacking the form controls*/}
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {/*image holder*/}
                <Box sx={descboxprop}>
                  <Image src={logo} width={"auto"} height="100px"></Image>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "'Courier Prime', monospace",
                      color: fontColor,
                    }}
                  >
                    VDONATE
                  </Typography>
                </Box>

                {/*desc*/}
                <Stack
                  spacing={2}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography sx={textprop}>
                    Lets be a part of<br></br> donating journey
                  </Typography>
                  <AdminButton variant="outlined" to="/adminSignup">
                    Be An Admin
                  </AdminButton>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/*grid item*/}
          <Grid
            item
            xs={12}
            lg={6.5}
            sx={{
              height: "100%",
              width: "auto",
              marginTop: { xs: "80px", lg: "0px" },
            }}
          >
            {/*form holder*/}
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 30px",
                marginRight: { lg: "50px", sm: "0px" },
              }}
            >
              <Card sx={{ width: "100%", height: "90%" }}>
                <CardMedia sx={{ height: 140 }} image={frmBack}></CardMedia>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/*aligning the controls*/}
                  <Stack spacing={2} direction="column" sx={fieldProp}>
                    <Typography
                      variant="h4"
                      sx={{
                        marginLeft: "10px",
                        alignContent: "center",
                        color: "#11009E",
                      }}
                    >
                      Sign In
                    </Typography>

                    <TextBox
                      label="USERNAME"
                      variant="outlined"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isNameNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {nameErr}
                      </Typography>
                    )}
                    {isNameNull === true && (
                      <Typography variant="body2" sx={{}}>
                        {nameErr}
                      </Typography>
                    )}

                    <TextBox
                      label="EMAIL"
                      variant="outlined"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isEmailNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {emailErr}
                      </Typography>
                    )}
                    {isEmailNull === true && (
                      <Typography variant="body2" sx={{}}>
                        {emailErr}
                      </Typography>
                    )}

                    <TextBox
                      label="PHONE"
                      variant="outlined"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isPhoneNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {phoneErr}
                      </Typography>
                    )}
                    {isPhoneNull === true && (
                      <Typography variant="body2" sx={{}}>
                        {phoneErr}
                      </Typography>
                    )}

                    <TextBox
                      label="NIC"
                      variant="outlined"
                      onChange={(e) => {
                        setNIC(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isNICNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {nicErr}
                      </Typography>
                    )}
                    {isNICNull === true && (
                      <Typography variant="body2" sx={{}}>
                        {nicErr}
                      </Typography>
                    )}

  
                     {isLoaded?
                     <Autocomplete onPlaceChanged={onPlaceChanged}>
                            <TextField fullWidth
                              type='text'
                              label="Destination"
                              ref={destiantionRef}
                              sx={textBoxStyle}
                              onChange={(e)=>{
                                
                                console.log(e.target.value);
                                setAddress(e.target.value)

                              }
                              }
                            />
                          </Autocomplete>
                       :<CircularProgress sx={{color:'Blue'}}  />}
                        
                    <Stack direction="row" spacing={2}>
                      <TextBox
                        label="Year"
                        variant="outlined"
                        onChange={(e) => {
                          setYear(e.target.value);
                        }}
                      >
                        {" "}
                      </TextBox>
                      <TextBox
                        label="Month"
                        variant="outlined"
                        onChange={(e) => {
                          setMonth(e.target.value);
                        }}
                      >
                        {" "}
                      </TextBox>
                      <TextBox
                        label="Day"
                        variant="outlined"
                        onChange={(e) => {
                          setDay(e.target.value);
                        }}
                      >
                        {" "}
                      </TextBox>
                    </Stack>
                    {isDOBvalid === true && (
                      <Typography variant="body2" sx={{}}>
                        {dob}
                      </Typography>
                    )}
                    {isDOBvalid !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {dob}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    size="Large"
                    sx={btnprop}
                    onClick={() => {
                      handleLogin(valueList);
                      handleClick(SlideTransition);
                    }}
                  >
                    Sign In
                  </Button>

                  {
                    isBlocked&& (
                      <div className="alert-bar">
                        <Typography variant="body1">Your location permission is blocked. Enable it to use this feature.</Typography>
                        <ErrorOutline sx={{fontSize:'30px',marginLeft:'5px'}} />
                      </div>
                    )
                  }
                </CardActions>
              </Card>
            </Box>

            {/*feedback pop for a success action */}
          </Grid>
        </Grid>
      </Box>
      <div>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          anchorOrigin={anchorOrigin}
          TransitionComponent={state.Transition}
          message={sccMSG}
          key={state.Transition.name}
          autoHideDuration={5000}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{
              width: "100%",
              backgroundColor: sccColor,
              color: "white",
              borderRadius: "15px",
            }}
          >
            {sccMSG}
          </Alert>
        </Snackbar>
        <Footer backColor={fontColor} marginTop="100px" />
      </div>
    </>
  );
}
