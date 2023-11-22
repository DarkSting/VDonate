import React, { useState, useEffect, useContext } from 'react';
import fileaxios from '../../api/fileapi';
import nameaxios from '../../api/nameaxios';
import { MyContext } from '../..';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button ,TableHead, Stack, Autocomplete, TextField} from '@mui/material';
import Axios from '../../api/axios';

const backendUrl = 'http://localhost:8080';

const DownloadLink = ({ file,setFiles,currentArray }) => {


    const {openSnackbar} = useSnackbar();

    console.log(file.fileName)

    const handleDownload = () => {
      // Create a Blob with the file content
      
      openSnackbar({
        message:'Downloading',
        color:'#000000'
      })
      const blob = new Blob([file.content], { type: file.contentType });
  
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = `${backendUrl}/download/${file.fileName}`;
      downloadLink.download = file.fileName;
  
      // Simulate a click on the download link
      try{

        downloadLink.click();

      }catch(error){
        openSnackbar({
            message:'File Not Found',
            color:'red'
          })
      }
      

      openSnackbar({
        message:'File Downloaded',
        color:'#000000'
      })

    };



  
    return (
      <Stack spacing={1}>
        <Button variant="contained" onClick={handleDownload}>Download</Button>
      </Stack>
    );
  };

function FileList({ files ,setFiles,currentArray}) {


  return (
    <div style={{display:'flex',justifyContent:'center', flexDirection:'column'}}>
    
    <TableContainer component={Paper}>
    
      <Table>
      <TableHead>
          <TableRow>
            <TableCell><b>File Name</b></TableCell>
            <TableCell><b>User Name</b></TableCell>
            <TableCell><b>Date Created</b></TableCell>
            <TableCell><b>Action</b></TableCell> {/* Added a header for the action column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={index}>
              <TableCell>{file.fileName}</TableCell>
              <TableCell>{file.userName}</TableCell>
              <TableCell>{file.createdDate}</TableCell>
              <TableCell>
                <DownloadLink file={file} setFiles={setFiles} currentArray={currentArray} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}



function UserReportList() {
  const [files, setFiles] = useState([]);
  const {name} = useContext(MyContext);

  const {openSnackbar} = useSnackbar();


  useEffect(() => {

    openSnackbar({
        message: 'Loading Files',
        color:'#000000'
      })
    // Fetch the list of file names from your server

    
    nameaxios.get(`/getusercheckedfiles/${name}`)

      .then((response) => {
        openSnackbar({
            message: 'Files Loaded',
            color:'green'
          })

        console.log(response.data);
        setFiles(response.data);
      })
      .catch((error) => {
        setFiles([]);
        openSnackbar({
            message: 'Files Loading Failed',
            color:'red'
          })
        console.error(error);
      });

  }, []);

  return (
    <div>
      <FileList files={files} setFiles={setFiles} currentArray={files}/>
    </div>
  );
}

export default UserReportList;

