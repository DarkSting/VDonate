import {
  CardActions,
  CardContent,
  Typography,
  Button,
  Stack,
  Card,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { LoadSubSpinner } from "../../CommonComponents/SpinFunction";
import Tab from "../../CommonComponents/TabComponent";
import { MyContext } from "../..";
import { useSnackbar } from "../../CommonComponents/SnackBarContext";
import Axios from "../../api/axios";

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
  //sending approve
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
        openSnackbar({
          message: `${name} is approved`,
          color: "green",
        });
        const newArray = array.filter((item) => item.id !== userId);
        resetArry(newArray);
      })
      .catch((err) => {
        setSent(false);
        openSnackbar({
          message: `Failed to approve ${name}`,
          color: "red",
        });
      });
  };

  const deleteRequest = () => {
    Axios.delete(`user/deleteuser?user=${mongoID}`)
      .then((r) => {
        openSnackbar({
          message: `${name} deleted successfully`,
          color: "green",
        });
      })
      .catch((er) => {
        openSnackbar({
          message: `Failed to reject ${name}`,
          color: "red",
        });
      });
  };

  const { openSnackbar, closeSnackbar } = useSnackbar();

  const [userId, setUserID] = useState("");
  const [objectID, setObjectID] = useState("");
  const [isSent, setSent] = useState(false);

  useEffect(() => {
    setUserID(id);
    setObjectID(mongoID);
  }, []);

  return (
    <Card>
      <CardContent sx={{ backgroundColor: "white", borderRadius: "3px" }}>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1">
          <b>User id :</b>
          {id}
        </Typography>
        <Typography variant="body1">
          <b>User phone :</b>
          {phone}
        </Typography>
        <Typography variant="body1">
          <b>User mail :</b>
          {email}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            sendApprove(true);
          }}
          sx={{
            "&:hover": {
              backgroundColor: "green",
            },
          }}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            deleteRequest();
          }}
          sx={{
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "green",
            },
          }}
        >
          Reject
        </Button>
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
  }, []);

  const [approvals, setApprovals] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  console.log(approvals);

  const LoadApprovals = () => {
    return (
      <Stack spacing={1} sx={{ width: "100%", marginTop: "10px" }}>
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
    <div>
      {approvals.length > 0 ? (
        <LoadApprovals />
      ) : (
        LoadSubSpinner(isLoaded, setLoaded, "No User Signups Yet")
      )}
    </div>
  );
}

/**loader function to get data */

export function UserApprovalLoader() {
  var result = null;
  return result;
}
