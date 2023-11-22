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
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import logo from "../../../CommonComponents/images/logo.png";
import "./text.css";
import frmBack from "../../../CommonComponents/images/formbackimage.jpg";
import { useState } from "react";
import Axios from "../../../api/axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import CustomLinkButton from "../../../CommonComponents/LinkButton";
import { FormControl } from "react-bootstrap";
import Footer from "../../../CommonComponents/Footer";

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

export default function Form({ fontColor }) {
  textprop.color = fontColor;

  let navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const anchorOrigin = isSmallScreen
    ? { vertical: "bottom", horizontal: "center" } // for small screens
    : { vertical: "bottom", horizontal: "left" };

  const handleSignUp = (arr) => {
    
    let convertedDOB = ConvertToDOB(year, month, day);
    const post = async (arr, yr) => {
      const data = {
        name: arr[0].toLowerCase(),
        age: yr,
        nic: arr[2],
        gender: arr[3],
        email: arr[1],
        phone: arr[4],
        licenseNumber: arr[5],
        role:arr[6]
      };

      await Axios.post("/admin/addadmin", data)
        .then((res) => {
          console.log(res);
          setsccMSG("Sign Up Success");
          setSeverity("success");
          setsccColor("#03C988");
          handleClick(SlideTransition);
          navigate(`/success?user=${'admin'}`);
        })
        .catch((err) => {

          
          const er = err.response.data?.msg
          
          let arr = er.split(",");


          for(let current of arr){

              let splits = current.split(':');

       

              if(splits[1].trim()==="email"){
                setEmailErr("Enter an valid email");
              }

              if(splits[0].trim()==="phone"){
                setPhoneErr("Enter a valid phone number");
              }

          }


            setsccMSG("Sign Up Failed");
            setSeverity("error");
            setsccColor("#F24C3D");
            handleClick(SlideTransition);

        
          
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
      setNameErr("username is not provided");
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

    if (arr[5] === "") {
      setLicenseErr("Lisence id not provided");
      isLicenseNull = true;
    } else {
        setLicenseErr("");
      isLicenseNull = false;
    }
    if(arr[6]==="None"){

        setRoleErr("Role not defined");
    }
    else{
        setRoleErr("")
    }

    if (age < 18) {
      setAgeErr("age should be above 18");
    } else {
      setAgeErr("");
    }

    if (
      !isAddresNull &&
      !isEmailNull &&
      !isNICNull &&
      !isNameNull &&
      !isPhoneNull &&
      !isLicenseNull &&
      arr[6] !=="None" &&
      age > 18 &&
      dob !== "invalid date" &&
      !isLicenseNull
    ) {
      post(arr, age);
    } else {
      setsccMSG("Sign Up Failed");
      setsccColor("#F24C3D");
      setSeverity("error");
    }
  };

  var isNameNull,
    isEmailNull,
    isAddresNull,
    isNICNull,
    isAgeNull,
    isPhoneNull,
    isDOBvalid,
    isLicenseNull = false;

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
  const [license, setLicense] = useState("");
  const [licenseErr, setLicenseErr] = useState("");

  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });
  const [role, setRole] = useState("None");
  const [roleErr, setRoleErr] = useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const valueList = [name, email, nic, gender, phonenum, license, role];

  const handleClick = (Transition) => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const ConvertToDOB = (yy, mm, dd) => {
    let y = yy.trim();
    let m = mm.trim();
    let d = dd.trim();

    return y + "-" + m + "-" + dd;
  };

  const UserButton = styled(CustomLinkButton)({
    "&:hover": {
      backgroundColor: "#7C9D96", // Change to desired hover color
      color: "white", // Change to desired hover text color
    },

    borderColor: "#7C9D96", // Change to desired hover border color
    borderWidth: 1, // Change to desired hover border width
    borderStyle: "solid",
    color: "#7C9D96",
  });

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
                <Stack spacing={2}>
                  <Typography sx={textprop}>
                    Lets be a part of<br></br>donating journey
                  </Typography>
                  <UserButton to="/signup">Back To User Sign Up</UserButton>
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
                      Admin Sign In
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

                    <TextBox
                      label="MEDICAL LICENSE ID"
                      variant="outlined"
                      onChange={(e) => {
                        setLicense(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isLicenseNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {licenseErr}
                      </Typography>
                    )}
                    {isLicenseNull === true && (
                      <Typography variant="body2" sx={{}}>
                        {licenseErr}
                      </Typography>
                    )}

                    <InputLabel id="select-label" sx={{ color: "#11009E" }}>
                      Role
                    </InputLabel>
                    <Select
                      value={role}
                      onChange={handleChange}
                      labelId="select-label"
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Doctor"}>Doctor</MenuItem>
                      <MenuItem value={"Nurse"}>Nurse</MenuItem>
                      <MenuItem value={"BloodBankOfficer"}>
                        BloodBankOfficer
                      </MenuItem>
                    </Select>

                    {roleErr === "" ? (
                      <Typography
                        variant="body2"
                        sx={{ color: "red" }}
                      ></Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        please insert a role
                      </Typography>
                    )}

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
                      handleSignUp(valueList);
                      console.log("hello");
                    }}
                  >
                    Sign In
                  </Button>
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
        <Footer backColor={fontColor} marginTop='100px'/>
      </div>
    </>
  );
}
