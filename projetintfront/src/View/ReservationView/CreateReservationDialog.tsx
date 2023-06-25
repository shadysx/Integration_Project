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
import SelectMembersComboBox from '../../components/SelectMembersComboBox';
import SelectCourtsComboBox from '../../components/SelectCourtsComboBox';
import { SelectChangeEvent } from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  selectedReservation: Reservation;
  setSelectedReservation: (reservation: any) => void;
  onClose: (value: Reservation) => void;
  fetchReservations: () => void;
  IsReservationLegit: () => boolean
  users: User[]
  courts: Court[]
  defaultReservation: Reservation
}

export default function CreateReservationDialog(props: SimpleDialogProps) {
  const [membersSelected, setMembersSelected] = React.useState<string[]>([]);
  const { onClose, selectedReservation, setSelectedReservation, open, fetchReservations, IsReservationLegit, users, courts, defaultReservation} = props;

  const { setAlert } = useContext(AuthContext);

  // This function resets the reservation fields
  // Call this on closeDialog
  const resetReservationFields = () => {
    setSelectedReservation(defaultReservation);
    setMembersSelected([]);
  }

  // Close the dialog and reset the reservation fields
  const handleClose = () => {
    onClose(selectedReservation);
    resetReservationFields();
  };

  // Update the selected reservation when members are selected
  useEffect(() => {
    fillReservationMembersFromSelectedMembersIds();
    console.log("selectedReservation after filled by combobox", selectedReservation);
  }, [membersSelected]);

  // Fill the reservation members based on the selected members
  const fillReservationMembersFromSelectedMembersIds = () => {
    console.log('selected amount', membersSelected.length);
    console.log("useeffect", membersSelected);
    setSelectedReservation((prevReservation) => ({
      ...prevReservation,
      user1_id: null,
      user2_id: null,
      user3_id: null,
      user4_id: null,
    }));
    
    if (membersSelected.length === 2) {
      setSelectedReservation((prevReservation) => ({
        ...prevReservation,
        user1_id: membersSelected[0],
        user2_id: membersSelected[1]
      }));
    } else if (membersSelected.length === 4) {
      setSelectedReservation((prevReservation) => ({
        ...prevReservation,
        user1_id: membersSelected[0],
        user2_id: membersSelected[1],
        user3_id: membersSelected[2],
        user4_id: membersSelected[3]
      }));
    }
  }

  // Handle input change for reservation fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedReservation((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };



  // Handle court selection change
  const handleCourtChange = (event: SelectChangeEvent<typeof selectedReservation.court_id>) => {
    setSelectedReservation(prevReservation => ({...prevReservation, court_id: event.target.value}));
    console.log('changed court', event.target.value);
  };

  // Handle members selection change
  const handleMembersChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setMembersSelected(
      typeof value === 'string' ? value.split(',') : value
    );
    console.log('changed members', event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!IsReservationLegit())
      return


    // Add your logic to handle the form submission here
    const reservationsService = new ReservationService();
    const { id, ...requestBody } = selectedReservation;

    const response = await reservationsService.CreateReservation(requestBody, setAlert);

    if(response !== null) {
      let data;

      try {
        data = await response.json();
      } catch (error) {
        console.log('Error parsing response:', error);
      }
  
      if (response.ok) {
        setAlert({ type: "success", description: data.message, open: true });
        handleClose();
      } else {
        let firstError = data.errors[Object.keys(data.errors)[0]];
        setAlert({ type: "error", description: firstError, open: true });
      }
  
      await fetchReservations();
    }

  };


  

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle className="dialog-title">Create Reservation</DialogTitle>
      <div className='dialog'>
        <form onSubmit={handleSubmit} className="dialog-form">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={selectedReservation?.date} onChange={handleChange} required /><br /><br />
          <label htmlFor="starting_hour">Starting Hour:</label>
          <input type="time" id="starting_hour" name="starting_hour" value={selectedReservation?.starting_hour} onChange={handleChange} required /><br /><br />
          <label htmlFor="ending_hour">Ending Hour:</label>
          <input type="time" id="ending_hour" name="ending_hour" value={selectedReservation?.ending_hour} onChange={handleChange} required /><br /><br />
          <SelectCourtsComboBox courtsList={courts} handleChange={handleCourtChange} />
          <SelectMembersComboBox membersList={users} handleChange={handleMembersChange} membersSelected={membersSelected} />
          <input type="submit" value="Create" />
        </form>
      </div>
    </Dialog>
  );
}
