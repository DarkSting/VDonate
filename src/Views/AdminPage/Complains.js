import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Axios from '../../api/axios';
import MainTab from "../../CommonComponents/TabComponent";
import { MyContext } from '../..';

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Make a GET request to your backend API to fetch complaints
    Axios.get('complain/findallcomplaints')
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
      });
  }, []);

  const {darkColor} = useContext(MyContext);

  return (
    <MainTab
    title="Campaigns"
    fontSize="h4"
    fontColor="white"
    titleBackColor={darkColor}
    renderContent={
        <div style={{marginTop:'50px'}}>
        {complaints.map((complaint) => (
          <Card key={complaint.id} variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {complaint.sender}
              </Typography>
              <Typography color="text.secondary">
                {complaint.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    }
  ></MainTab>

  );
}

export default ComplaintList;
