import { Box,CardActions,CardContent,Typography,Button,Stack, List, Paper } from "@mui/material";
import React,{useContext, useEffect, useState} from "react";
import axios from '../../api/axios'
import checkDataAvailability, { LoadSubSpinner } from "../../CommonComponents/SpinFunction";
import { useLoaderData } from "react-router-dom";
import { Card } from "react-bootstrap";
import Tab from "./TabComponent";
import { MyContext } from "../..";
import { ContactSupportOutlined } from "@mui/icons-material";

{/**card object */}
const CardObject = ({state , color, name,phone ,id,resetArry,array,mongoID})=>{

    const sendApprove = (approvedVal)=>{
        const data = {
            approval:approvedVal,
            objectId:objectID
        }
        axios.put('user/updateUserApproval',data).then(r=>{
            setSent(true);
            console.log(userId);
            const newArray = array.filter((item)=>item.id!==userId);
            resetArry(newArray);
            
        }).catch(err=>{
            setSent(false);
        })

     
        

    }

    const userId=id;
    const objectID=mongoID;
    const [isSent,setSent] = useState(false);

    return(
        <Card >
        <CardContent sx={{backgroundColor:'#F5F5F5',borderRadius:'3px'}}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1">
            {id}
          </Typography>
          <Typography variant="body1">
            {phone}
          </Typography>
        </CardContent>
        <CardActions sx={{display:'flex',justifyContent:'center'}}>
          {!isSent?LoadSubSpinner(isSent,setSent,"red"):<Button variant="outlined" size="small" onClick={()=>{
            sendApprove(true);
          }}>Approve</Button>}
        </CardActions>
        </Card>
        
    );
}

{/**getting approvals from the backend */}
export default function UserApprovals(){

    useEffect(()=>{
        axios.get('/admin/validateUsers').then(r=>{
            setApprovals(r.data);
        }).catch(err =>{
            setApprovals([]);
        })
    },[])

    const [approvals,setApprovals] = useState([]); 
    const [isLoaded,setLoaded] = useState(false);

    console.log(approvals);

    const loadApprovals = ()=>{
      

       return (<Stack spacing={1} sx={{width:'50%',marginTop:'10px'}}>
        {approvals.map(value=>
            (
            <CardObject width="100%" state={value.validate} name={value.name} phone={value.phone} id={value.id} mongoID={value.objectId} resetArry={setApprovals} array={approvals}/>
                
            )
        )}
        </Stack>)
    }

    {/**use context */}
    const{color,darkColor} = useContext(MyContext);

    return(
        <>
         {approvals.length===0?LoadSubSpinner(isLoaded,setLoaded):
            <Tab title="Approvals" fontSize="h4" fontColor="white" titleBackColor={darkColor} renderContent={loadApprovals()} ></Tab>
         } 
        </>

    );
       

}

{/**loader function to get data */}
export function UserApprovalLoader(){

    var result = null;

    
    return result;
}
