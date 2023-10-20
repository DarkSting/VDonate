// SignUpSuccess.js
import React from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import { Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
//import './SignUpSuccess.css';

const SignUpSuccess = () => {
  const navigate = useNavigate();

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const userId = queryParams.get('user');

  const goToLoginPage = () => {

    if(userId==="admin"){
        navigate('/adminlogin');
    }
    else{
        navigate('/userlogin');
    }
     
  };

  return (
    <div className="container">
  
    <Container maxWidth="sm">
      <Paper
        elevation={2}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          marginTop: '100px',
          gap:'20px'
        }}
      >
        <CheckCircleOutline
          style={{ fontSize: 200, color: '#38E54D' }}
        />
        <Typography variant="h2">SUCCESSFUL..!</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={goToLoginPage}
          sx={{width:'100%'}}
        >
          Go to Login
        </Button>
      </Paper>
    </Container>
    </div>
  );
};

export default SignUpSuccess;
