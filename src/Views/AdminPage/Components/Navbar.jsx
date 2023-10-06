import { Mail, Notifications, Pets,Search as Srch, ArrowRight ,Settings,Lock,DarkMode, Person} from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Button,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate, useNavigate } from "react-router-dom";
import Axios from "../../../api/axios";
import LoadingSpinner from "../../../CommonComponents/LoadingSpinner";
import checkDataAvailability, { checkDataAvailabilityWithoutSetter } from "../../../CommonComponents/SpinFunction";


{/*properties of elements */}
const StyledToolbar = styled(Toolbar)(({theme})=>({
  display: "flex",
  justifyContent: "space-between",
  alignItems:'center',
  [theme.breakpoints.down('md')]:{
    justifyContent: "space-evenly",
  },
  margin:0
}));

const LogoBox = styled(Stack)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
 
  
}));

const ButtonBox = styled(Stack)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  
}));


const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  display:'flex',
  direction:'row',
  alignItems:'center',
  gap:2,
  border: "3px solid white",
  backgroundColor:"transparent",
  '&:hover':{
    backgroundColor:"#146C94",
    color:"black"
  },

  
  '& .MuiInputBase-input' :{
    color:"white",
  },

  '& .MuiInputBase-input:focus' :{
    color:"white",
  },

}));




const NavBar = styled(AppBar)(({ theme }) => ({
  display: "flex",
  margin:0,
  justifyContent:'center',
  backgroundColor:"#AC5B5B",
  borderRadius:'0px',
  height:'70px',
  border:'none',
  [theme.breakpoints.down("sm")]: {
    alignItems:'space-between'
  }
  
}));

const NavButton = styled(Button)(({ theme }) => ({
  display: "flex",
  margin:0,
  justifyContent:'center',
  backgroundColor:"transparent",
  height:'70px',
  color:"white",
  marginLeft:'0px',
  borderRadius:'0',
  padding:'0 20px',
  boxShadow:'none',
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  


'&:hover':{
  
  fontWeight:'bold'
}

}));

const MenuButtonprops = (color)=>{
  let value = '50px'

  return {display:'flex',

  
  '&:hover':{
    backgroundColor:color,
    
    
  }}


}

const TextBox = styled(TextField)({

  width:'100%',
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#BFDCE5',
      },
      '&:hover fieldset': {
        borderColor: '#146C94',
      }
  }

});


const NavComponent = ({setLoggedOut,props})=>{

  {/*navigation hook */}
  const navigate = useNavigate();

  {/*dialogbox usestate props */}
  const [text,setText] = useState(props.color);
  const [opendialog, setOpenDialog] = useState(false);
  const changeText =(event)=>{
    let value = event.target.value;
    if(value.length>7 || value.length<7 || value.substring(0,1)!=="#" || value =="" ){
     setText("#1F8A70");
    }
    else{
      setText(value);
    }
  
  }
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  
  {/*menu functions*/}
  const[anchorEl,setAnchorEl,] = useState(null);

  const open = Boolean(anchorEl);
  
  const [openLogout, setOpenLogout] = useState(false);

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogoutConfirm = () => {
    setOpenLogout(false);
  };

  const handleClick = (event)=>{
    setAnchorEl(event.currentTarget);
  }

  const handleMouse =()=>{

  };

  const handleClose = () =>{
    setAnchorEl(null);
    setOpenDialog(false);
    
  }

  const handleLogout=()=>{
    setAnchorEl(null);
    setOpenDialog(false);
    Axios.get('/remove-cookie').then(r=>{
      console.log('cookie removed');

    }).catch(err=>{

    })
    navigate('/adminlogin');
  }

 

  return (

    <>
    <NavBar position="fixed" props={props} sx={{marginTop:'0px',backgroundColor:props.color}}>

      {/*navigation toolbar where the components are attached inside this box*/}
      <StyledToolbar props={props}>

        {/*logo box holder*/}
          <LogoBox direction="row">
         
              <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } ,fontFamily: "'Courier Prime', monospace"}}>
                VDONATE
              </Typography>
              <Typography variant="h6" sx={{ display: { xs: "block", sm: "none" } ,fontFamily: "'Courier Prime', monospace"}}>
                VD
              </Typography>
          <Search sx={{'&:hover':{backgroundColor:props.hoverColor}}}>
            <InputBase  placeholder="Search" sx={{paddingRight:{sm:'0px',lg:'50px'}}
            }/>
            <Box sx={{display:'flex',justifyContent:'center'}}>
              <Srch />
            </Box>
          </Search>
        </LogoBox>

       <Stack direction="row" sx={{justifyContent:'space-between',alignItems:'center'}}>
       <Typography variant="body1" sx={{marginRight:'10px'}}>{props.name}</Typography>
       {/*dropdown menu*/}
       <IconButton  id="menu-button" 
                    aria-controls={open?'menu':undefined} 
                    aria-haspopup="true"
                    aria-expanded={open?'true':undefined}
                    onClick={handleClick}
                    sx={MenuButtonprops(props.hoverColor)}
       >
          <Avatar />
       </IconButton>
       </Stack>
       
      <Menu 
        id="menu"
        aria-labelledby="menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{verticle:'bottom',horizontal:'left'}}
        transformOrigin={{verticle:'top',horizontal:'left'}}
            sx ={{}}
      >

        <MenuItem onClick={handleClose}  onMouseEnter={handleMouse} onMouseLeave={handleMouse}  sx={{width:'200px','&:hover':{backgroundColor:props.color,color:'white'}}}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>
              Settings
            </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClickOpen} onMouseEnter={handleMouse} onMouseLeave={handleMouse} sx={{'&:hover':{backgroundColor:props.color,color:'white'}}}>
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText>
              Theme
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClickOpen} onMouseEnter={handleMouse} onMouseLeave={handleMouse} sx={{'&:hover':{backgroundColor:props.color,color:'white'}}}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>
              Profile
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOpenLogout} onMouseEnter={handleMouse} onMouseLeave={handleMouse}  sx={{'&:hover':{backgroundColor:props.color,color:'white'}}}>
          <ListItemIcon>
            <Lock  />
          </ListItemIcon>
          <ListItemText>
              Logout
          </ListItemText>
        </MenuItem>
        
      </Menu>

  
      </StyledToolbar>
    </NavBar>
    <Dialog
        open={opendialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogTitle id="alert-dialog-title">
          {"Change the color"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{marginBottom:'10px'}}>
            Please provide a Hexcode color to change the theme
          </DialogContentText>
          <TextBox onChange={changeText}>HexColor</TextBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{props.setColor(text);handleClose();}}>Change</Button>
        </DialogActions>
      </Dialog>
      <div>
      <Dialog
        open={openLogout}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="red">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseLogoutConfirm} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}


{/*Navbar */}
const Navbar = (props) => {
  
  const[isLoggedOut,setLoggedOut] = useState(false);

    return(
   
      
        <NavComponent props={props}/>
 
       
          
      
    );

};

export default Navbar;
