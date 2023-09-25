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
} from "@mui/material";
import react, { useState } from "react";
import frmBack from "../../CommonComponents/images/Don req.jpg";
import Axios from "../../api/axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Bloodtype } from "@mui/icons-material";

{
  /*styles*/
}
const TextBox = styled(TextField)({
  width: "60%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: (props) => props.borderColor,
    },
    "&:hover fieldset": {
      borderColor: (props) => props.HoverBorderColor,
    },

    "&.Mui-focused fieldset": {
      borderColor: (props) => props.HoverBorderColor,
    },
  },
  "& label": {
    color: (props) => props.borderColor,
  },
  "& label.Mui-focused": {
    color: (props) => props.borderColor,
  },
});

const fieldProp = {
  width: "90%",
  marginTop: "20px",
};

const btnprop = (props) => {
  return {
    width: "50%",
    height: "50px",
    backgroundColor: props.color,
    borderRadius: "40px",
    marginBottom: "10px",
    color: "white",
    "&:hover": {
      border: "1px solid " + props.hover,
      color: props.color,
      backgroundColor: "white",
      fontWeight: "bolder",
    },
  };
};

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

{
  /*component*/
}
export default function DonationRequestTab(props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const anchorOrigin = isSmallScreen
    ? { vertical: "bottom", horizontal: "center" } // for small screens
    : { vertical: "bottom", horizontal: "left" };

  var isBloodTypeNull = false;

  const [desc, setDesc] = useState("");
  const [sccMSG, setsccMSG] = useState("");
  const [severity, setSeverity] = useState("");
  const [sccColor, setsccColor] = useState("");
  const [descErr, setDescErr] = useState("");
  const [donationType, setDonationType] = useState(0);

  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });

  const handleOptionChange = (event) => {
    setDonationType(event.target.value);
  };
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
  const valueList = [desc, donationType];

  const handleSignUp = (arr) => {
    const post = async (arr) => {
      const data = {
        description: arr[0],
        donationType: arr[1],
      };

      setsccMSG("Sending....");
      setSeverity("warning");
      setsccColor("#EE9322");

      await Axios.post("/user/makeDonationRequest", data)
        .then((res) => {
          console.log(res);
          setsccMSG("request has been made");
          setSeverity("success");
          setsccColor("#03C988");
        })
        .catch((err) => {
          console.log(err);
          setsccMSG("could");
          setSeverity("error");
          setsccColor("#F24C3D");
        });
    };

    if (arr[1] === "") {
      isBloodTypeNull = true;
      console.log("hello");
      setDescErr("donation type not provided");
    } else {
      isBloodTypeNull = false;
      console.log("set to null");
      setDescErr("");
    }

    console.log(isBloodTypeNull);

    if (!isBloodTypeNull) {
      post(arr);
    } else {
      setsccMSG("couldnt make request");
      setsccColor("#F24C3D");
      setSeverity("error");
    }
  };

  return (
    <>
      {/*form holder*/}

      <Card sx={{ width: "100%", height: "90%", overflowY: "auto" }}>
        <CardMedia sx={{ height: 180 }} image={frmBack}></CardMedia>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormControl sx={{ m: 1, width: "60%" }}>
            <InputLabel id="demo-simple-select-error-label">
              Donation Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              value={donationType}
              label="Donation Type"
              onChange={handleOptionChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Plasma"> Plasma</MenuItem>
              <MenuItem value="Plattlates">Plattlates</MenuItem>
              <MenuItem value="WholeBlood">WholeBlood</MenuItem>
              <MenuItem value="PowerRed">PowerRed</MenuItem>
            </Select>
            <FormHelperText sx={{ color: props.hover }}>
              Choose your donation type
            </FormHelperText>
          </FormControl>
          {isBloodTypeNull != true ? (
            <Typography
              variant="body2"
              sx={{ color: "red", marginTop: "10px" }}
            >
              {descErr}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{}}>
              {descErr}
            </Typography>
          )}

          <TextBox
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={10}
            borderColor="red"
            HoverBorderColor={props.hover}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
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
            sx={btnprop(props)}
            onClick={() => {
              handleSignUp(valueList);
              handleClick(SlideTransition);
            }}
          >
            Confirm Donation
          </Button>
        </CardActions>
      </Card>

      {/**
       * popup
       */}
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
    </>
  );
}
