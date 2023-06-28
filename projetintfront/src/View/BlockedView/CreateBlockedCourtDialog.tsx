import React, { useContext, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { BlockedCourt, Court, Reservation, User } from '../../Interfaces/Interface';
import { useState } from 'react';
import "./EditBlockedCourtDialog.css"
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
import { BlockedsService } from '../../services/BlockedsService';

export interface SimpleDialogProps {
  open: boolean;
  selectedBlockedCourt: BlockedCourt;
  setSelectedBlockedCourt: (blockedCourt: any) => void;
  handleClose: () => void;
  fetchBlockedCourts: () => void;
  isBlockedCourtLegit: () => boolean
  users: User[]
  courts: Court[]
  defaultBlockedCourt: BlockedCourt,
  handleSelectedMembersChange: (event: SelectChangeEvent) => void
  handleCourtChange: (event: SelectChangeEvent) => void
  handleChange: (event: SelectChangeEvent) => void
  selectedMembersId: string[]
}

export default function CreateBlockedCourtDialog(props: SimpleDialogProps) {

  const { 
    handleClose,
    selectedBlockedCourt,
    setSelectedBlockedCourt,
    open,
    users,
    courts,
    handleSelectedMembersChange,
    handleCourtChange,
    handleChange,
    selectedMembersId,
    isBlockedCourtLegit,
    fetchBlockedCourts
  } = props;

  const { setAlert } = useContext(AuthContext);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!isBlockedCourtLegit())
      return


    // Add your logic to handle the form submission here
    const blockedsService = new BlockedsService();
    const { id, ...requestBody } = selectedBlockedCourt;

    const response = await blockedsService.CreateBlocked(requestBody);
    if(response !== null) {
      let data;

      try {
        data = await response.json();
        console.log('data', data)
      } catch (error) {
        console.log('Error parsing response:', error);
      }

      console.log('firsaaaaat', response)
  
      if (response.ok) {
        setAlert({ type: "success", description: data.message, open: true });
        handleClose();
      } else {
        let firstError = data.errors[Object.keys(data.errors)[0]];
        setAlert({ type: "error", description: firstError, open: true });
      }
  
      await fetchBlockedCourts();
    }

  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle className="dialog-title">Create Reservation</DialogTitle>
      <div className='dialog'>
        <form onSubmit={handleSubmit} className="dialog-form">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={selectedBlockedCourt?.date} onChange={handleChange} required /><br /><br />
          <label htmlFor="duration">Duration (days):</label>
          <input type="number" id="duration" name="duration" value={selectedBlockedCourt?.duration} onChange={handleChange} required /><br /><br />
          <label htmlFor="reason">Reason:</label>
          <input type="text" id="reason" name="reason" value={selectedBlockedCourt?.reason} onChange={handleChange} required /><br /><br />
          <SelectCourtsComboBox courtsList={courts} handleChange={handleCourtChange} />
          <input type="submit" value="Create" />
        </form>
      </div>
    </Dialog>
  );
}