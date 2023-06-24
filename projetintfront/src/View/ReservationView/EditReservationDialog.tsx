import * as React from 'react';
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
import { SelectChangeEvent } from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  selectedReservation: Reservation;
  setSelectedReservation: (reservation: any) => void;
  onClose: (value: Reservation) => void;
  fetchReservations: () => void;
  usersFullNames: string[]
}

export default function EditReservationDialog(props: SimpleDialogProps) {
  const { onClose, selectedReservation, setSelectedReservation, open, fetchReservations } = props;

  const { setAlert } = React.useContext(AuthContext);

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

  const handleCourtChange = (event: SelectChangeEvent<typeof selectedReservation.court_id>) => {
    setSelectedReservation(prevReservation => ({...prevReservation, court_id: event.target.value}));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    // Add your logic to handle the form submission here
    if(UsersInReservationCount() != 2 || UsersInReservationCount() != 4)
      setAlert({type: "error", description: "Can only be even number of players", open: true})

    const reservationsService = new ReservationService();
    const { id, ...requestBody } = selectedReservation;
    
    await reservationsService.UpdateReservation(requestBody, id);
    await fetchReservations();
  };

  const UsersInReservationCount = () => {
    const userIDs = [
      selectedReservation.user1_id,
      selectedReservation.user2_id,
      selectedReservation.user3_id,
      selectedReservation.user4_id
    ];
  
    const count = userIDs.filter((userID) => userID !== null).length;
  
    return count;
  }

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
    </form>
    </div>
  </Dialog>
  );
}