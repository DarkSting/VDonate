import {

    CardActions,
    CardContent,
    Typography,
    Button,
    Stack,

  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import axios from "../../api/axios";
  import {
    LoadSubSpinner,
  } from "../../CommonComponents/SpinFunction";

  import { Card } from "@mui/material";
  import Tab from "../../CommonComponents/TabComponent";
  import { MyContext } from "../..";
import { useSnackbar } from "../../CommonComponents/SnackBarContext";

  
  
    /**card object */

  const CardObject = ({
    name,
    phone,
    id,
    role,
    lisence,
    email,
    resetArry,
    array,
    mongoID
    
  }) => {

    const {openSnackbar, closeSnackbar} = useSnackbar();

    const sendApprove = (approvedVal) => {
      const data = {
        approval: approvedVal,
        usermail: email,
      };
      axios
        .post("admin/updatepassword", data)
        .then((r) => {

          const newArray = array.filter((item) => item._id !== mongoID);
          resetArry(newArray);
          openSnackbar({
            message: `${name} approved`,
            color:'green',
            
          })
          
        })
        .catch((err) => {
          openSnackbar({
            message: `${name} failed to approve`,
            color:'red',
            
          })
        });
    };
  

  
    return (
      <Card >
        <CardContent sx={{ backgroundColor: "white", borderRadius: "3px" }}>
          <Typography variant="h5" component="div">
            Name : {name}
          </Typography>
          <Typography variant="body1">{id}</Typography>
          <Typography variant="body1">Phone : {phone}</Typography>
          <Typography variant="body1">Role : {role}</Typography>
          <Typography variant="body1">Lisence Number : {lisence}</Typography>
          <Typography variant="body1">Email : {email}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center",backgroundColor: "#F5F5F5" }}>
         
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                openSnackbar({
                  message: `${name} approving`,
                  color:'black',
                  
                })
                sendApprove(true)
              }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                openSnackbar({
                  message: `${name} request deleted`,
                  color:'green',
                  
                })
                const newArray = array.filter((item) => item._id !== mongoID);
                resetArry(newArray);
              }}
            >
              Reject
            </Button>
          
        </CardActions>
      </Card>
    );
  };
  
  
  const LoadApprovals = ({approvals,setApprovals}) => {
    return (
      <Stack spacing={1} sx={{ width: "50%", marginTop: "30px" }}>
        {approvals.map((value) => (
          <CardObject
            width="100%"
            state={value.isActive}
            name={value.userName}
            phone={value.phone}
            id={value.id}
            role={value.role}
            mongoID={value._id}
            email={value.email}
            lisence={value.licenseNumber}
            resetArry={setApprovals}
            array={approvals}
          />
        ))}
      </Stack>
    );
  };
  
    /**getting approvals from the backend */
  
  export default function NewAdminSignUps() {
    
    useEffect(() => {
      axios
        .get("/admin/getnewadmins")
        .then((r) => {
          setApprovals(r.data);
        })
        .catch((err) => {
          setApprovals([]);
        });
    }, []);
  
    const [approvals, setApprovals] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
  
    console.log(approvals);
  
      /**use context */
    const {  darkColor } = useContext(MyContext);
  
    return (
      <>

          <Tab
            title="Admin Signup Approvals"
            fontSize="h4"
            fontColor="white"
            titleBackColor={darkColor}
            renderContent={approvals.length === 0 ? (
              LoadSubSpinner(isLoaded, setLoaded, "No Approvals Yet")
            ) : ( <LoadApprovals setApprovals={setApprovals} approvals={approvals} />)
             
            }
          ></Tab>
       
      </>
    );
  }
  
  
    /**loader function to get data */
  
  export function UserApprovalLoader() {
    var result = null;
  
    return result;
  }
  