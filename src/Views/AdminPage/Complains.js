import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Axios from '../../api/axios';
import MainTab from "../../CommonComponents/TabComponent";
import { MyContext } from '../..';
import { LoadSubSpinner } from '../../CommonComponents/SpinFunction';
import LoadingSpinner from '../../CommonComponents/LoadingSpinner';
import { CardActions, IconButton,Button } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';


function ComplaintList() {

  const [complaints, setComplaints] = useState([]);
  const [isLoaded,setLoaded] = useState(false);

  useEffect(() => {

    // Make a GET request to your backend API to fetch complaints
    Axios.get('complain/findallcomplaints')
      .then((response) => {
        setComplaints(response.data);
        console.log(response)
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
        setLoaded(false);
      });

  }, []);

  const {darkColor} = useContext(MyContext);
  const {openSnackbar, closeSnackbar} = useSnackbar();

  const onDelete = (complainID)=>{

   
    console.log(complainID);

        Axios.put('complain/checkcomplaint',{complainID}).then(r=>{

            const newArry = complaints.filter((item)=>item._id!==complainID);
            
            setComplaints(newArry);
            openSnackbar({
                message: 'Complaint Checked',
                color:'green',
              })

        }).catch(er=>{

            openSnackbar({
                message: 'Failed To Check Complaint',
                color:'red',
                
              })

        })

  }

  return (
    <MainTab
    title="Complaints"
    fontSize="h4"
    fontColor="white"
    titleBackColor={darkColor}
    renderContent={
        <div style={{marginTop:'50px',width:'80%'}}>
        {complaints.length>0?complaints.map((complaint) => (
          <Card key={complaint.id}  elevation={1} style={{ marginBottom: '10px',width:'100%', }}>
            <CardContent sx={{display:'flex',alignItems:'flex-start',flexDirection:'column',gap:1}}>
              <Typography variant="body1" color="text.secondary" component="div">
                <b>Sender :</b>{complaint.sender}
              </Typography>
              <Typography >
              <b>Complaint :</b>{complaint.description}
              </Typography>
            </CardContent>
            <CardActions>
          <Button variant='outlined' onClick={()=>onDelete(complaint._id)} sx={{'&:hover':{backgroundColor:'#186F65',borderColor:'transparent',color:'white'}}} endIcon={<Check />}></Button>
        </CardActions>
          </Card>
        )):LoadSubSpinner(isLoaded,setLoaded,"No Complaints Yet")}
      </div>
    }
  ></MainTab>

  );
}

export default ComplaintList;