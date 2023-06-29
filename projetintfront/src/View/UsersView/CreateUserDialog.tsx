import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { User } from '../../Interfaces/Interface';
import { useState } from 'react';
import "./EditUserDialog.css"
import { UserService } from '../../services/UserService';

export interface SimpleDialogProps {
  open: boolean;
  selectedUser: User;
  setSelectedUser: (user: any) => void;
  onClose: (value: User) => void;
  fetchUsers: () => void;
}

export default function EditUserDialog(props: SimpleDialogProps) {
  const { onClose, selectedUser, setSelectedUser, open, fetchUsers } = props;

  // Set the initial state of selectedUser when the component mounts
  React.useEffect(() => {
    setSelectedUser({
      affiliationNumber: "001000999",
      lastName: "Doe",
      firstName: "John",
      gender: "M",
      ranking: "A+",
      dateOfBirth: "1990-01-01",
      mobile: "1234567890",
      email: "shady@email.com",
      status: "Active",
      street: "123 Main St",
      postalCode: "12345",
      locality: "City1",
      created_at: null,
      updated_at: null,
      password: "password"
    });
  }, []);

  // Handle the dialog close event
  const handleClose = () => {
    console.log("hey", selectedUser);
    onClose(selectedUser);
  };

  // Handle the change event of the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle the change event of the isAdmin checkbox
  const handleIsAdminChange = () => {
    setSelectedUser((prevState) => ({
      ...prevState,
      isAdmin: !prevState.isAdmin
    }));
  };

  // Handle the form submit event
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    const userService = new UserService();
    await userService.CreateUser(selectedUser);
    await fetchUsers();
  };

  // Render the component
  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle className="dialog-title">Create User</DialogTitle>
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
          
          <label htmlFor="birthday">Birthday:</label>
          <input type="date" id="birthday" name="birthday" value={selectedUser?.dateOfBirth} onChange={handleChange} required /><br /><br />

          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={selectedUser?.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select><br /><br />
          
          <label htmlFor="isAdmin">Admin:</label>
          <input type="checkbox" id="isAdmin" name="isAdmin" checked={selectedUser?.isAdmin} onChange={handleIsAdminChange} /><br /><br />
          
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
          
          <input type="submit" value="Create" />
        </form>
      </div>
    </Dialog>
  );
}
