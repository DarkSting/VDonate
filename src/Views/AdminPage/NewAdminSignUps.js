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

  import { Card } from "react-bootstrap";
  import Tab from "../../CommonComponents/TabComponent";
  import { MyContext } from "../..";

  
  
    /**card object */

  const CardObject = ({
    state,
    color,
    name,
    phone,
    id,
    role,
    lisence,
    email,
    resetArry,
    array,
    mongoID,
  }) => {
    const sendApprove = (approvedVal) => {
      const data = {
        approval: approvedVal,
        usermail: email,
      };
      axios
        .post("admin/updatepassword", data)
        .then((r) => {
          setSent(true);
          console.log(userId);
          const newArray = array.filter((item) => item.id !== userId);
          resetArry(newArray);
        })
        .catch((err) => {
          setSent(false);
        });
    };
  
    const userId = id;
    const [isSent, setSent] = useState(false);
  
    return (
      <Card>
        <CardContent sx={{ backgroundColor: "#F5F5F5", borderRadius: "3px" }}>
          <Typography variant="h5" component="div">
            Name : {name}
          </Typography>
          <Typography variant="body1">{id}</Typography>
          <Typography variant="body1">Phone : {phone}</Typography>
          <Typography variant="body1">Role : {role}</Typography>
          <Typography variant="body1">Lisence Number : {lisence}</Typography>
          <Typography variant="body1">Email : {email}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          {!isSent ? (
            LoadSubSpinner(isSent, setSent, "red")
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                sendApprove(true);
              }}
            >
              Approve
            </Button>
          )}
        </CardActions>
      </Card>
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
  
    const loadApprovals = () => {
      return (
        <Stack spacing={1} sx={{ width: "50%", marginTop: "10px" }}>
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
  
    
      /**use context */
    
    const {  darkColor } = useContext(MyContext);
  
    return (
      <>
        {approvals.length === 0 ? (
          LoadSubSpinner(isLoaded, setLoaded, "No Approvals Yet")
        ) : (
          <Tab
            title="Admin Signup Approvals"
            fontSize="h4"
            fontColor="white"
            titleBackColor={darkColor}
            renderContent={loadApprovals()}
          ></Tab>
        )}
      </>
    );
  }
  
  
    /**loader function to get data */
  
  export function UserApprovalLoader() {
    var result = null;
  
    return result;
  }
  