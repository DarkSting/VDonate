import React, { useContext, useEffect, useState } from 'react';
import {Card ,
CardContent ,
Typography,
Box,
Stack} from '@mui/material';

import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { LoadSubSpinner } from '../../CommonComponents/SpinFunction';
import NotAvailableContent from '../../CommonComponents/ContentNotAvailableText';
import nameaxios from '../../api/nameaxios';
import { MyContext } from '../..';

const FileCard = ({ file}) => {


  return (
    <Card>
      <CardContent>
        <Typography variant="body1">User: {file.userName}</Typography>
        <Typography variant="body1">FileName: {file.fileName}</Typography>
        <Typography variant="body1">Created Date: {file.createdDate}</Typography>
      </CardContent>
    </Card>
  );
};


export default function CheckedReportsTab(){

    const[files,setFiles] = useState([]);

    const[isLoaded,setLoaded] = useState(false);
   
    const {openSnackbar, closeSnackbar} = useSnackbar();

    const{name} = useContext(MyContext);

    useEffect(()=>{

        nameaxios.get(`/getcheckedfiles/${name}`).then(r=>{
            console.log(r);
            openSnackbar({
                message: 'Data Loaded',
                color:'green',
                
              })
              console.log(r.data)
              setLoaded(true);
              setFiles(r.data);

        }).catch(error=>{
            openSnackbar({
                message: 'Data Loading Failed',
                color:'red',
                
              })
        })

    },[])

   


    return(
        <Box>
        {
        !isLoaded?LoadSubSpinner(isLoaded, setLoaded, "No Files Found") :
          (<Stack spacing={1} direction='column' sx={{marginTop:'20px'}}>
            {files.length>0?files.map((value)=>
                (<FileCard key={value._id} file={value}/>) ):(<NotAvailableContent text="No Files Found" />)
            }
          </Stack>)}
        </Box>

    )

}