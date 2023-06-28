import { Button, Dialog, DialogTitle, Snackbar, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { User } from '../../Interfaces/Interface';
import "./EditPasswordDialog.css"
import bcrypt from 'bcryptjs';
import { UserService } from '../../services/UserService';
import { AuthContext } from '../../contexts/AuthContext';

interface DialogProps{
    open: boolean;
    user: User;
    onClose: () => void;    
}

export default function EditPasswordDialog(props : DialogProps) {
    const {open, user, onClose} = props;
    const {setAlert} = useContext(AuthContext);
    
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
        setAlert({open: true, type: 'error', description:'Old password is wrong !' })        
        isCorrect = false;
        return;
      }

      if (newPassword !== confirmPassword) {
        setAlert({open: true, type: 'error', description:'New password aren\'t the same !' })           
        isCorrect = false;
        return;
      }      

      const egalOldPass = await bcrypt.compare(newPassword, user.password);      
    
      if (egalOldPass) {
        setAlert({open: true, type: 'error', description:'Old and new password are the same !' })   
        isCorrect = false;
        return;
      }      

      if(isCorrect)
      {
        user.password = await hash(newPassword);
        const userService = new UserService();
        await userService.UpdateUser(user, user.id);
      
        setAlert({open: true, type: 'success', description:'Password Successfully Updated !' })          

        //await new Promise((resolve) => setTimeout(resolve, 1500));        
      
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
            label="Old Password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
            />
            <br />
            <TextField
            type="password"
            label="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            />
            <br />
            <TextField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            />
            <br />
            <Button className={`buttonUpdate ${user.isAdmin ? 'secondary' : 'primary'}`} variant="contained" type="submit">
            Change Password
            </Button>            
        </form>
    </Dialog>
    );
};


