import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { User } from '../../Interfaces/Interface';
import { useState } from 'react';
import "./EditUserDialog.css"
import { VariableLikeDeclaration } from 'typescript';
import { UserService } from '../../services/UserService';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedUser: User;
  setSelectedUser: (user: any) => void;
  onClose: (value: User) => void;
  fetchUsers: () => void;
}

export default function EditUserDialog(props: SimpleDialogProps) {
  const { onClose, selectedUser, setSelectedUser, open, fetchUsers } = props;

  React.useEffect(() => {
    console.log("Dialog: ", selectedUser)
  })

  const handleClose = () => {
    onClose(selectedUser);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    // Add your logic to handle the form submission here
    const userService = new UserService();
    const { id, ...requestBody } = selectedUser;
    console.log("updated: ", requestBody);
    userService.UpdateUser(requestBody, id);

    setTimeout(() => {
      fetchUsers()
    }, 1000)
  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Edit User</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" name="lastName" value={selectedUser?.lastName} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" value={selectedUser?.firstName} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="affiliationNumber">Affiliation Number:</label>
      <input type="text" id="affiliationNumber" name="affiliationNumber" value={selectedUser?.affiliationNumber} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={selectedUser?.email} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={selectedUser?.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select><br /><br />
      
      <label htmlFor="isAdmin">Admin:</label>
      <input type="checkbox" id="isAdmin" name="isAdmin" checked={selectedUser?.isAdmin} onChange={handleChange} /><br /><br />
      
      <label htmlFor="locality">Locality:</label>
      <input type="text" id="locality" name="locality" value={selectedUser?.locality} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="mobile">Mobile:</label>
      <input type="tel" id="mobile" name="mobile" value={selectedUser?.mobile} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="postalCode">Postal Code:</label>
      <input type="text" id="postalCode" name="postalCode" value={selectedUser?.postalCode} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="ranking">Ranking:</label>
      <input type="text" id="ranking" name="ranking" value={selectedUser?.ranking} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="status">Status:</label>
      <input type="text" id="status" name="status" value={selectedUser?.status} onChange={handleChange} required /><br /><br />
      
      <label htmlFor="street">Street:</label>
      <input type="text" id="street" name="street" value={selectedUser?.street} onChange={handleChange} required /><br /><br />
      
      <input type="submit" value="Update" />
    </form>
    </div>
   
  </Dialog>
  );
}