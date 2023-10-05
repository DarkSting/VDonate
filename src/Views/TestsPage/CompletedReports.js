import React, { useContext, useEffect, useState } from 'react';
import {Card ,
CardContent ,
Typography,
Box,
Stack,
Autocomplete,
TextField} from '@mui/material';

import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { LoadSubSpinner } from '../../CommonComponents/SpinFunction';
import NotAvailableContent from '../../CommonComponents/ContentNotAvailableText';
import nameaxios from '../../api/nameaxios';
import { MyContext } from '../..';
import Axios from '../../api/axios';

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

    const[users,setUsers] = useState([])
    const[selectedUser,setSelectedUser] = useState({
    name: "all",
    phone:"",
    userUD:""
    });


    useEffect(()=>{

        nameaxios.get(`/getcheckedfiles/${selectedUser.name}`).then(r=>{
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

    },[selectedUser])

    
  
    useEffect(()=>{
  
      Axios.get('user/findAllUsers').then(r=>{
  
        setUsers(r.data.users);
        console.log(r.data.users);
  
      }).catch(er=>{
  
        console.log(er);
      })
  
    },[])

   


    return(
        <Box>
          <h2>Checked Files</h2>
           <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        onChange={(e)=>{setSelectedUser(users[e.target.value]?.name?users[e.target.value]:{
          name: "all",
          phone:"",
          userUD:""
        });
        console.log(selectedUser)
        }}
        disableClearable
        options={users.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search user"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}

           sx={{margin:'0px 10px 5px 0px'}}
          />
        )}
      />
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