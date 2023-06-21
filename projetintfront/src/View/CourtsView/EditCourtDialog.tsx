import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Court, User } from '../../Interfaces/Interface';
import { useState } from 'react';
import "./EditCourtDialog.css"
import { UserService } from '../../services/UserService';
import ComboBox from '../../components/ComboBox';
import { CategoriesService } from '../../services/CategoriesService';
import { Helper } from '../../Helpers/Helper';
import { CourtsService } from '../../services/CourtsService';

export interface SimpleDialogProps {
  open: boolean;
  selectedCourt: Court;
  setSelectedCourt: (court: any) => void;
  onClose: (value: Court) => void;
  fetchCourts: () => void;
}

export default function EditCourtDialog(props: SimpleDialogProps) {
  const { onClose, selectedCourt, setSelectedCourt, open, fetchCourts } = props;

  const handleClose = () => {
    onClose(selectedCourt);
  };

  React.useEffect(() => {
    console.log(selectedCourt)
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourt((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    // Add your logic to handle the form submission here
    const courtsService = new CourtsService();
    const { id, ...requestBody } = selectedCourt;
    await courtsService.UpdateCourt(requestBody, id);
    await fetchCourts();
  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Edit Court</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="lastName">Number:</label>
      <input type="number" id="number" name="number" value={selectedCourt?.number} onChange={handleChange} required /><br /><br />
      
      <input type="submit" value="Update" />
    </form>
    </div>
  </Dialog>
  );
}