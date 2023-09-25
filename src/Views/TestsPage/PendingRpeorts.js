import React, { useState, useEffect, useContext } from 'react';
import fileaxios from '../../api/fileapi';
import nameaxios from '../../api/nameaxios';
import { MyContext } from '../..';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button ,TableHead} from '@mui/material';
import { Link } from 'react-router-dom';

const backendUrl = 'http://localhost:8080';

const DownloadLink = ({ file }) => {
    const handleDownload = () => {
      // Create a Blob with the file content
      const blob = new Blob([file.content], { type: file.contentType });
  
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = `${backendUrl}/download/${file.fileName}`;
      downloadLink.download = file.fileName;
  
      // Simulate a click on the download link
      downloadLink.click();
    };
  
    return (
      <Button varinat="contained" onClick={handleDownload}>Download</Button>
    );
  };

function FileList({ files }) {


  

  return (
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
                <DownloadLink file={file} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




function PendingFilesTab() {
  const [files, setFiles] = useState([]);
  const {name} = useContext(MyContext);

  const {openSnackbar} = useSnackbar();

  useEffect(() => {

    openSnackbar({
        message: 'Loading Files',
        color:'#000000'
      })
    // Fetch the list of file names from your server

    nameaxios.get(`/getfiles/${name}`)

      .then((response) => {
        openSnackbar({
            message: 'Files Loaded',
            color:'green'
          })

        console.log(response.data);
        setFiles(response.data);
      })
      .catch((error) => {
        openSnackbar({
            message: 'Files Loading Failed',
            color:'red'
          })
        console.error(error);
      });

  }, []);

  return (
    <div>
      <h1>File Management</h1>
      <FileList files={files} />
    </div>
  );
}

export default PendingFilesTab;


