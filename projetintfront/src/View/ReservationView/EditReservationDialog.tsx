import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Court, Reservation, User } from '../../Interfaces/Interface';
import { useState } from 'react';
import "./EditCourtDialog.css"
import { UserService } from '../../services/UserService';
import ComboBox from '../../components/ComboBox';
import { CategoriesService } from '../../services/CategoriesService';
import { Helper } from '../../Helpers/Helper';
import { CourtsService } from '../../services/CourtsService';
import { ReservationService } from '../../services/ReservationService';

export interface SimpleDialogProps {
  open: boolean;
  selectedReservation: Reservation;
  setSelectedReservation: (reservation: any) => void;
  onClose: (value: Reservation) => void;
  fetchReservations: () => void;
}

export default function EditReservationDialog(props: SimpleDialogProps) {
  const { onClose, selectedReservation, setSelectedReservation, open, fetchReservations } = props;

  const handleClose = () => {
    onClose(selectedReservation);
  };

  React.useEffect(() => {
    console.log(selectedReservation)
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedReservation((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    // Add your logic to handle the form submission here
    const reservationsService = new ReservationService();
    const { id, ...requestBody } = selectedReservation;
    await reservationsService.UpdateReservation(requestBody, id);
    await fetchReservations();
  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Edit Reservation</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="lastName">Number:</label>
      <input type="number" id="number" name="number" value={selectedReservation?.id} onChange={handleChange} required /><br /><br />
      
      <input type="submit" value="Update" />
    </form>
    </div>
  </Dialog>
  );
}