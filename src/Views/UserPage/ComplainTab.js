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
import react, { useContext, useState } from "react";
import frmBack from "../../CommonComponents/images/Man shouting on woman working on laptop.jpg";
import Axios from "../../api/axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MyContext } from "../..";

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
    width: { xs: "80%", lg: "30%", md: "40%" },
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
export default function UserComplainTab(props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const anchorOrigin = isSmallScreen
    ? { vertical: "bottom", horizontal: "center" } // for small screens
    : { vertical: "bottom", horizontal: "left" };

  var isDescNull = false;

  const [desc, setDesc] = useState("");
  const [sccMSG, setsccMSG] = useState("");
  const [severity, setSeverity] = useState("");
  const [sccColor, setsccColor] = useState("");
  const [descErr, setDescErr] = useState("");

  const{name,userID} = useContext(MyContext);

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
  const valueList = [desc];

  const handleSignUp = (arr) => {
    const post = async (arr) => {
      const data = {
        description: arr[0],
        User:userID
      };

      await Axios.post("/user/makeComplain", data)
        .then((res) => {
          console.log(res);
          setsccMSG("complain has been made");
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

    if (arr[0] === "") {
      isDescNull = true;
      console.log("hello");
      setDescErr("description is not provided");
    } else {
      isDescNull = false;
      console.log("set to null");
      setDescErr("");
    }

    console.log(isDescNull);

    if (!isDescNull) {
      post(arr);
    } else {
      setsccMSG("couldnt make complain");
      setsccColor("#F24C3D");
      setSeverity("error");
    }
  };

  return (
    <>
      {/*form holder*/}

      <Card sx={{ width: "100%", height: "90%" }}>
        <CardMedia sx={{ height: 180 }} image={frmBack}></CardMedia>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
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
          {isDescNull != true ? (
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
            Send Complain
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
