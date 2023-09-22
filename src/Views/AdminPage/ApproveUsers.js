import {
  CardActions,
  CardContent,
  Typography,
  Button,
  Stack,

} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import{
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
  email,
  resetArry,
  array,
  mongoID,
}) => {
  const sendApprove = (approvedVal) => {
    const data = {
      approval: approvedVal,
      objectId: objectID,
    };
    axios
      .put("user/updateUserApproval", data)
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

  const [userId,setUserID] = useState('')
  const [objectID,setObjectID] = useState('')
  const [isSent, setSent] = useState(false);

  useEffect(()=>{

setUserID(id);
setObjectID(mongoID);


  },[])

  return (
    <Card>
      <CardContent sx={{ backgroundColor: "#F5F5F5", borderRadius: "3px" }}>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1"><b>User id :</b>{id}</Typography>
        <Typography variant="body1"><b>User phone :</b>{phone}</Typography>
        <Typography variant="body1"><b>User mail :</b>{email}</Typography>
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

export default function UserApprovals() {
  useEffect(() => {
    axios
      .get("/admin/validateUsers")
      .then((r) => {
        setApprovals(r.data);
      })
      .catch((err) => {
        setApprovals([]);
      });
  },[]);

  const [approvals, setApprovals] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  console.log(approvals);

  const LoadApprovals = () => {
    return (
      <Stack spacing={1} sx={{ width: "50%", marginTop: "10px" }}>
        {approvals.map((value) => (
          <CardObject
            width="100%"
            state={value.validate}
            name={value.name}
            phone={value.phone}
            id={value.id}
            email={value.email}
            mongoID={value.objectId}
            resetArry={setApprovals}
            array={approvals}
          />
        ))}
      </Stack>
    );
  };

  
    /**use context */
  

  const { color, darkColor } = useContext(MyContext);

  return (
    <>

        <Tab
          title="User SignUp Approvals"
          fontSize="h4"
          fontColor="white"
          titleBackColor={darkColor}
          renderContent={approvals.length === 0 ? (
            LoadSubSpinner(isLoaded, setLoaded,"No User Signups Yet")
          ) : (
            <LoadApprovals />
          )}
        ></Tab>
      {}
    </>
  );
}


  /**loader function to get data */

export function UserApprovalLoader() {
  var result = null;

  return result;
}
