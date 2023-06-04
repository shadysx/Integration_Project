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

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedUser: User;
  onClose: (value: User) => void;
}

export default function EditUserDialog(props: SimpleDialogProps) {
  const { onClose, selectedUser, open } = props;
  const [user, setUser] = useState({
    id: selectedUser?.id,
    lastName: selectedUser?.lastName,
    firstName: selectedUser?.firstName,
    affiliationNumber: selectedUser?.affiliationNumber,
    dateOfBirth: selectedUser?.dateOfBirth,
    email: selectedUser?.email,
    gender: selectedUser?.gender,
    isAdmin: selectedUser?.isAdmin,
    locality: selectedUser?.locality,
    mobile: selectedUser?.mobile,
    postalCode: selectedUser?.postalCode,
    ranking: selectedUser?.ranking,
    status: selectedUser?.status,
    street: selectedUser?.street,
  });


  React.useEffect(() => {
    console.log(selectedUser)
  })

  const handleClose = () => {
    onClose(selectedUser);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle the form submission here
    console.log(selectedUser);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Edit User</DialogTitle>
      <form onSubmit={handleSubmit}>
      <label htmlFor="id">ID:</label>
      <input type="number" id="id" name="id" value={user.id} onChange={handleChange} required /><br /><br />

      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} required /><br /><br />

      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} required /><br /><br />

      <label htmlFor="affiliationNumber">Affiliation Number:</label>
      <input type="text" id="affiliationNumber" name="affiliationNumber" value={user.affiliationNumber} onChange={handleChange} required /><br /><br />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required /><br /><br />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={user.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select><br /><br />

      <label htmlFor="isAdmin">Admin:</label>
      <input type="checkbox" id="isAdmin" name="isAdmin" checked={user.isAdmin} onChange={handleChange} /><br /><br />

      <label htmlFor="locality">Locality:</label>
      <input type="text" id="locality" name="locality" value={user.locality} onChange={handleChange} required /><br /><br />

      <label htmlFor="mobile">Mobile:</label>
      <input type="tel" id="mobile" name="mobile" value={user.mobile} onChange={handleChange} required /><br /><br />

      <label htmlFor="postalCode">Postal Code:</label>
      <input type="text" id="postalCode" name="postalCode" value={user.postalCode} onChange={handleChange} required /><br /><br />

      <label htmlFor="ranking">Ranking:</label>
      <input type="text" id="ranking" name="ranking" value={user.ranking} onChange={handleChange} required /><br /><br />

      <label htmlFor="status">Status:</label>
      <input type="text" id="status" name="status" value={user.status} onChange={handleChange} required /><br /><br />

      <label htmlFor="street">Street:</label>
      <input type="text" id="street" name="street" value={user.street} onChange={handleChange} required /><br /><br />

      <input type="submit" value="Update" />
    </form>
    </Dialog>
  );
}