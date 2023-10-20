import React, { useState } from 'react';
import { Button } from '@mui/material';
import PasswordChangeDialog from './PasswordChangeDialog';

function Password() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Open Password Change Dialog
      </Button>
      <PasswordChangeDialog open={dialogOpen} onClose={handleCloseDialog} />
    </div>
  );
}

export default Password;
