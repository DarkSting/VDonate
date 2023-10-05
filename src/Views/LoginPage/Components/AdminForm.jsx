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
  Icon,
} from "@mui/material";
import logo from "../../../CommonComponents/images/logo.png";
import "./text.css";
import frmBack from "../../../CommonComponents/images/login image.jpg";
import { useEffect, useState } from "react";
import Axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {

  Refresh

} from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Password } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import CustomLinkButton from "../../../CommonComponents/LinkButton";
import Footer from "../../../CommonComponents/Footer";

const TextBox = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#9681EB", // Set background color to "#9681EB"
    },
    "&:hover fieldset": {
      borderColor: "#4B3FBF", // Set hover color to the dark color of "#9681EB"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4B3FBF",
    },
  },
  "& label": {
    color: "#9681EB",
  },
  "& label.Mui-focused": {
    color: "#9681EB",
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
  backgroundColor: "#6527BE",
  borderRadius: "40px",
  marginBottom: "10px",
  color: "white",
  "&:hover": {
    border: "1px solid #6527BE",
    color: "#6527BE",
    backgroundColor: "white",
    fontWeight: "bolder",
  },
};

const textprop = {
  marginLeft: "10px",
  alignContent: "center",
  color: "black",
  flexWrap: "wrap",
  color: "#6527BE",
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



function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function AdminLoginForm() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const anchorOrigin = isSmallScreen
    ? { vertical: "bottom", horizontal: "center" } // for small screens
    : { vertical: "bottom", horizontal: "left" };

  const handleSignUp = (arr) => {
    const post = async (arr) => {
      const data = {
        licenseNumber: arr[0],
        password: arr[1],
      };

      console.log(data.email);
      console.log(data.password);

      await axios
        .post("/admin/loginadmin", data)
        .then((res) => {
          console.log(res);
          setsccMSG("Login succeed");
          setSeverity("success");
          setsccColor("#03C988");
          navigate("/admindashboard/campaign");
        })
        .catch((err) => {
          console.log(err);
          setsccMSG("Login Failed");
          setSeverity("error");
          setsccColor("#F24C3D");
        });
    };

    if (arr[0] === "") {
      isNameNull = true;
      setNameErr("license is not provided");
    } else {
      isNameNull = false;
      setNameErr("");
    }

    if (arr[1] === "") {
      setPasswordErr("Password is not provided");
      isPasswordNull = true;
    } else {
      setPasswordErr("");
      isPasswordNull = false;
    }

    if (!isNameNull && !isPasswordNull) {
      post(arr);
      setsccMSG("Loading..");
      setSeverity("warning");
      setsccColor("#FFCC70");
    } else {
      setsccMSG("Login Failed");
      setsccColor("#F24C3D");
      setSeverity("error");
    }
  };

  var isNameNull,
    isPasswordNull = false;
  let navigate = useNavigate();
  const [license,setLicenseId] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [sccColor, setsccColor] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [sccMSG, setsccMSG] = useState("");
  const [severity, setSeverity] = useState("error");
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

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const valueList = [license, password];

  const UserButton = styled(CustomLinkButton)({
    "&:hover": {
      backgroundColor: "#9681EB", // Change to desired hover color
      color: "white", // Change to desired hover text color
    },

    borderColor: "#9681EB", // Change to desired hover border color
    borderWidth: 1, // Change to desired hover border width
    borderStyle: "solid",
    color: "#9681EB",
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
                      color: "#6527BE",
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
                  <UserButton to="/userlogin">Back To User Login</UserButton>
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
                        color: "#6527BE",
                      }}
                    >
                      Login
                    </Typography>

                    <TextBox
                      label="LISENCE ID"
                      variant="outlined"
                      onChange={(e) => {
                    setLicenseId(e.target.value);
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
                      label="PASSWORD"
                      type="password"
                      variant="outlined"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isPasswordNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {passwordErr}
                      </Typography>
                    )}
                    {isPasswordNull === true && (
                      <Typography variant="body2" sx={{}}>
                        {passwordErr}
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
                      handleClick(SlideTransition);
                    }}
                  >
                    Login
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
          onMouseMove={handleClose}
          anchorOrigin={anchorOrigin}
          TransitionComponent={state.Transition}
          message={sccMSG}
          key={state.Transition.license}
          autoHideDuration={5000}
          sx={{ width: { sm: "auto", lg: "30%" } }}
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
        <Footer backColor="#9681EB" marginTop='100px'/>
      </div>
    </>
  );
}
