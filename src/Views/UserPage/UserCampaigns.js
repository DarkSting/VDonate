import React, { useContext, useEffect, useState } from "react";
import { Box, CardActions, CardContent, Typography ,Button,Card} from "@mui/material";
import Paper from "@mui/material/Paper";
import Axios from "../../api/axios";
import { MyContext } from "../..";
import { useSnackbar } from "../../CommonComponents/SnackBarContext";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { SubSpinner } from "../../CommonComponents/LoadingSpinner";
import { LoadSubSpinner } from "../../CommonComponents/SpinFunction";


const CampaignCard = ({ campaign }) => {
  const [expanded, setExpanded] = useState(false);
 
  console.log(campaign)

  const {openSnackbar, closeSnackbar} = useSnackbar();

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  function removeCard(){

    
    Axios.put('/',{}).then(r=>{

        openSnackbar({
            message: ` Campaign Cancelled`,
            color:'#000000',
        
    })

    }).catch(error=>{

        openSnackbar({
            message: ` Cannot Cancel the campaign`,
            color:'red',
        
    })

    })
    

  }

  return (
    <Card sx={{width:'100%'}}>
      <CardContent >
        <Typography variant="h6" sx={{marginBottom:'20px'}}><b>Location:</b> {campaign.location}</Typography>
        <Typography variant="h6" sx={{marginBottom:'20px'}}><b>Time Begin:</b> {new Date(campaign.timeBegin).toLocaleString()}</Typography>
        <Typography variant="h6" sx={{marginBottom:'20px'}}><b>Time End:</b> {new Date(campaign.timeEnd).toLocaleString()}</Typography>
        <Typography variant="h6" sx={{marginBottom:'20px'}}><b>Donors count:</b> {campaign.donors.length}</Typography>
      </CardContent>
      <CardActions>
      <Button
          size="small"
          variant='contained'
          onClick={toggleExpansion}
          style={{ marginLeft: 'auto' }}
          endIcon={(!   expanded?<ArrowDownward />:<ArrowUpward />)}
        >
          {expanded ? 'Collapse' : 'Donors List And Staff List'}
        </Button>
        <Button
          size="small"
          color="secondary"
          variant='contained'
          onClick={() => {
                removeCard()

          }}
          style={{ marginLeft: 'auto' }}

        >
          Cancell
        </Button>
      </CardActions>
      {/* <CardExpansion expanded={expanded}>
    
      </CardExpansion> */}
      
    </Card>
  );
};

export default function Users() {
 
  const[campaign,setCampaign] = useState(null);

  const{name} = useContext(MyContext);
  const{openSnackbar} = useSnackbar();

  useEffect(()=>{

    Axios.get(`user/getcampaigns?name=${name}`).then(r=>{

      console.log(r.data.msg);
      setCampaign(r.data.msg)
      openSnackbar({

        message: 'Data Loaded',
        color:'green',
        
      })

    }).catch(er=>{

      console.log(er);
      openSnackbar({

        message: 'Data Loading Failed',
        color:'red',
        
      })
      
    })

  },[])

  return(

  !campaign?LoadSubSpinner(campaign,(value)=>{},"No Pending Campaigns"):(<CampaignCard campaign={campaign} />)

  );
}
