import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';

function AlertPopup({ error, type, onClose }) {

  // Gère la fermeture de l'alerte
  const handleClose = () => {
    onClose();
  };

  return (
    <Snackbar
      open={true} // Définit l'état d'ouverture de la Snackbar à true
      autoHideDuration={5000} // Définit la durée d'affichage automatique de la Snackbar en millisecondes (5000 = 5 secondes)
      onClose={handleClose} // Appelle la fonction handleClose lors de la fermeture de la Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Définit l'origine de l'ancre de la Snackbar (en bas à droite)
    >
      {/* Affiche l'alerte avec le type spécifié */}
      <Alert severity={type} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}

export default AlertPopup;