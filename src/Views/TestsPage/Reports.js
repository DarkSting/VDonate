import React, { useContext, useState } from 'react';
import fileaxios from '../../api/fileapi';
import axios from 'axios';
import { Button, Stack, TextField, Typography } from '@mui/material';
import MainTab from '../../CommonComponents/TabComponent'
import { MyContext } from '../..';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { Refresh } from '@mui/icons-material';

//displays content
function UploadTest() {
 
  const { darkColor } = useContext(MyContext);

  return (
      
    <MainTab
            title="Reports"
            fontSize="h4"
            fontColor="white"
            titleBackColor={darkColor}
            renderContent={<Content />}
          ></MainTab>
    

  );
}

//data body
function Content(){


  const {openSnackbar} = useSnackbar();


  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState('');


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {

    openSnackbar({
      message: 'This is a custom Snackbar message.',
      severity: 'success', // 'success', 'error', 'warning', 'info', or 'default'
      icon: <Refresh />, 
    })

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log(formData);


      axios.post('http://localhost:8080/sendfilename',{filename:filename},{"Content-Type":"application/json"}).then(r=>{
        fileaxios.post('/upload', formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });

      }).catch(error=>{
        console.log(error.response.data.message)
      })
      
    }
  };

  return(

<Stack spacing={1}>
     {/* File Upload Form */}

     <Typography variant='h5'>File Input Example</Typography>
      <TextField
        type="file"
        placeholder='Click here to choose a file'
      onChange={handleFileChange} />
      {selectedFile && (
        <Typography variant="body1">Selected file: {selectedFile.name}</Typography>
      )}
      <TextField 
      type="text"
      placeholder="Enter custom filename"
      value={filename}
      onChange={(e)=>{setFilename(e.target.value)}}></TextField>

      <Button variant="contained" onClick={handleUpload}>Upload File</Button>
    </Stack>
  );

}

export default UploadTest;
