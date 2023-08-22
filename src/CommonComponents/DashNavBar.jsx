import { Mail, Notifications, Pets,Search as Srch, ArrowRight ,Settings,Lock,DarkMode} from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Button,
  Badge,
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
} from "@mui/material";
import React, { useState } from "react";
import { Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


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

const ItemIcon = styled(ListItemIcon)(({theme})=>({
  color:'black'
  ,
  '&:hover':{
    color:'white'
  }
}))

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

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Image = styled("img")(({theme})=>({

  display: "block",
  width: "auto",

}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
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
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  


'&:hover':{
  
  fontWeight:'bold'
}

}));

const MenuButton = styled(IconButton)(({theme})=>({
  
  display:'flex',
 
  
  '&:hover':{
    backgroundColor:'#6F1AB6',
    
  }

}));


{/*Navbar */}
const Navbar = (props) => {

  {/*menu functions*/}
  const[anchorEl,setAnchorEl,] = useState(null);
  const[isIn,setIsIn] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event)=>{
    setAnchorEl(event.currentTarget);
  }

  const handleMouse =()=>{

  };

  const handleClose = () =>{
    setAnchorEl(null);
  }



  const [hide, setHide] = useState('flex');
  

  return (


    //navigation bar
    <NavBar position="sticky" props={props} sx={{marginTop:'0px',backgroundColor:props.color}}>

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

        {/*button holder*/}
       <ButtonBox direction="row" props={props} >
            <NavButton sx={{'&:hover':{backgroundColor:props.hoverColor}}}>
              Home
            </NavButton>
            <NavButton sx={{'&:hover':{backgroundColor:props.hoverColor}}}>
              About
            </NavButton>
            <NavButton sx={{'&:hover':{backgroundColor:props.hoverColor}}}>
              Contact
            </NavButton>
            <NavButton sx={{'&:hover':{backgroundColor:props.hoverColor}}}> 
              Why give Blood  
            </NavButton>
       </ButtonBox>

       {/*dropdown menu*/}
       <MenuButton  id="menu-button" 
                    aria-controls={open?'menu':undefined} 
                    aria-haspopup="true"
                    aria-expanded={open?'true':undefined}
                    onClick={handleClick}
       >
          <Avatar />
       </MenuButton>
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
        <MenuItem onClick={handleClose} onMouseEnter={handleMouse} onMouseLeave={handleMouse} sx={{'&:hover':{backgroundColor:props.color,color:'white'}}}>
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText>
              Theme
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} onMouseEnter={handleMouse} onMouseLeave={handleMouse}  sx={{'&:hover':{backgroundColor:props.color,color:'white'}}}>
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText>
              Logout
          </ListItemText>
        </MenuItem>
        
      </Menu>

  
      </StyledToolbar>
    </NavBar>
  );
};

export default Navbar;
