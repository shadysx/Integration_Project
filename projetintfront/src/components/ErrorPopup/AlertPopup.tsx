import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';

function AlertPopup({ error, type, onClose }) {

  const handleClose = () => {
    onClose();
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}

export default AlertPopup;