import { Button, Dialog, DialogTitle, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react'
import { User } from '../../Interfaces/Interface';
import "./EditPasswordDialog.css"
import bcrypt from 'bcryptjs';
import { UserService } from '../../services/UserService';

interface DialogProps{
    open: boolean;
    user: User;
    onClose: () => void;    
}

export default function EditPasswordDialog(props : DialogProps) {
    const {open, user, onClose} = props;
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const bcrypt = require('bcryptjs');
    const saltRounds = 10;

    const hash = async (password) => {      
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = hashedPassword.toString();      
      return result;
    };   
  
    const handleCurrentPasswordChange = (event) => {
      setCurrentPassword(event.target.value);
    };
  
    const handleNewPasswordChange = (event) => {
      setNewPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();    
      let isCorrect = true;      

      const currentPassMatch = await bcrypt.compare(currentPassword, user.password);
      console.log("match : " + currentPassMatch)
      if(!currentPassMatch)
      {
        setSnackbarMessage("L'ancien mot de passe est érroné !");
        setSnackbarOpen(true);
        isCorrect = false;
        return;
      }

      if (newPassword !== confirmPassword) {
        setSnackbarMessage("Les nouveaux mot de passe ne correspondent pas !");
        setSnackbarOpen(true);
        isCorrect = false;
        return;
      }      

      const egalOldPass = await bcrypt.compare(newPassword, user.password);      
    
      if (egalOldPass) {
        setSnackbarMessage("L'ancien et le nouveau mot de passe sont identiques !");
        setSnackbarOpen(true);
        isCorrect = false;
        return;
      }      

      if(isCorrect)
      {
        user.password = await hash(newPassword);
        const userService = new UserService();
        await userService.UpdateUser(user, user.id);
      
        setSnackbarMessage('Le mot de passe a bien été changé');
        setSnackbarOpen(true);


        await new Promise((resolve) => setTimeout(resolve, 1500));        
      
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        handleClose();
      }
      
    };
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };

    const handleClose = () => {
        onClose();
    }
  
    return (
    <Dialog onClose={handleClose} open={open} >
        <DialogTitle>Edit Password</DialogTitle>
        <form className='passwordForm' onSubmit={handleSubmit}>
            <TextField
            type="password"
            label="Ancien Mot de passe"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
            />
            <br />
            <TextField
            type="password"
            label="Nouveau Mot de passe"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            />
            <br />
            <TextField
            type="password"
            label="Confirmation"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            />
            <br />
            <Button variant="contained" color={user.isAdmin ? 'secondary' : 'primary'} type="submit">
            Change Password
            </Button>
            <Snackbar
            open={snackbarOpen}
            message={snackbarMessage}
            autoHideDuration={1500}
            onClose={handleSnackbarClose}            
            />
        </form>
    </Dialog>
    );
};


