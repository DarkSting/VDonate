import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Axios from "../../api/axios";
import { useSnackbar } from "../../CommonComponents/SnackBarContext";
import { Button, CardActionArea } from "@mui/material";
import { Delete, Update, UpdateDisabledRounded, UpdateRounded } from "@mui/icons-material";
import EditDonor from "./UpdateDonorDetails";


const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [currentsSelected,setCurrentSelected] = useState(null);
  const [update,setUpdate] = useState(false);

  const { openSnackbar, closeSnackbar } = useSnackbar();

  const [dialogProfileOpen, setDialogProfileOpen] = useState(false);
 

  const handleCloseProfileDialog = () => {
    setDialogProfileOpen(false);
  };

 

  useEffect(() => {
    Axios.get("user/findAllUsers")
      .then((r) => {
        console.log(r);
        setDonors(r.data.users);
        openSnackbar({
          message: `Users Loaded`,
          color: "green",
        });
      })
      .catch((er) => {
        console.log(er);
        openSnackbar({
          message: `Couldnt Load Users`,
          color: "red",
        });
      });
      setUpdate(false);
  }, [update]);

  function handleDelete (){ 

    console.log("deleted")
    setUpdate(true);
    
  }

  function handleUpdate (val){ 

    console.log("update")
    setDialogProfileOpen(true);

  }

  function handleSelect(donor){
      setCurrentSelected(donor)
      console.log(donor)
  }

  return (
    <div style={{ marginTop: "30px" }}>
      {donors.map((donor) => (
        <Card
          key={donor.userID}
          variant="outlined"
          style={{ marginBottom: "16px" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {donor.name}
            </Typography>
            <Typography color="text.secondary">
              User ID: {donor.userID}
            </Typography>
            <Typography color="text.secondary">Phone: {donor.phone}</Typography>
            <Typography color="text.secondary">Email: {donor.email}</Typography>
            <Typography color="text.secondary">NIC: {donor.nic}</Typography>
            <Typography color="text.secondary">
              Blood Type: {donor.bloodType}
            </Typography>
          </CardContent>
          <CardActionArea  sx={{justifyContent:'flex-end',display:'flex',gap:0.5,padding:'10px'}}>
            <Button variant="contained" onClick={()=>{
              handleDelete()
              handleSelect(donor);
              
              }} endIcon={<Delete />}></Button>
            <Button variant="contained" onClick={()=>{
              handleUpdate()
              handleSelect(donor);
              }} endIcon={<UpdateRounded />}></Button>
          </CardActionArea>
        </Card>
      ))}
  <EditDonor
        open={dialogProfileOpen}
        onClose={handleCloseProfileDialog}
        user={currentsSelected}
        onUpdateUser={handleSelect}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default DonorList;
