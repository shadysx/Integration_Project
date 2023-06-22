import React, { useContext, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Court, Reservation, User } from '../../Interfaces/Interface';
import { useState } from 'react';
import "./EditReservationDialog.css"
import { UserService } from '../../services/UserService';
import ComboBox from '../../components/ComboBox';
import { CategoriesService } from '../../services/CategoriesService';
import { Helper } from '../../Helpers/Helper';
import { CourtsService } from '../../services/CourtsService';
import { ReservationService } from '../../services/ReservationService';
import { AuthContext } from '../../contexts/AuthContext';

export interface SimpleDialogProps {
  open: boolean;
  selectedReservation: Reservation;
  setSelectedReservation: (reservation: any) => void;
  onClose: (value: Reservation) => void;
  fetchReservations: () => void;
  usersFullNames: string[]
}

export default function CreateReservationDialog(props: SimpleDialogProps) {
  const { onClose, selectedReservation, setSelectedReservation, open, fetchReservations, usersFullNames } = props;


  const { user } = useContext(AuthContext)
  


  const handleClose = () => {
    onClose(selectedReservation);
  };

  useEffect(() => {
  })

  const handleUser1Change = async (selectedValue: string) => {
    const userId = await Helper.ConvertUserFullNameToId(selectedValue)
    console.log(userId)
    setSelectedReservation((prevReservation) => {
      return {
        ...prevReservation,
        user1_id: userId, // Update the categories with the new
      };
    });
  }

  const handleUser2Change = async (selectedValue: string) => {
    const userId = await Helper.ConvertUserFullNameToId(selectedValue)
    console.log(userId)
    setSelectedReservation((prevReservation) => {
      return {
        ...prevReservation,
        user2_id: userId, // Update the categories with the new categoryId
      };
    });
  }

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
    await reservationsService.CreateReservation(requestBody);
    await fetchReservations();
  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Edit Reservation</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="starting_hour">Starting Hour:</label>
      <input type="time" id="starting_hour" name="starting_hour" value={selectedReservation?.starting_hour} onChange={handleChange} required /><br /><br />
      <label htmlFor="ending_hour">Ending Hour:</label>
      <input type="time" id="ending_hour" name="ending_hour" value={selectedReservation?.ending_hour} onChange={handleChange} required /><br /><br /> 
      <input type="submit" value="Update" />
      <label htmlFor="categoryName">User 1:</label>
      <ComboBox options={usersFullNames} currentValue={selectedReservation?.user1_id} onChange={handleUser1Change}/>
      <ComboBox options={usersFullNames} currentValue={selectedReservation?.user2_id} onChange={handleUser2Change}/>
    </form>
    </div>
  </Dialog>
  );
}