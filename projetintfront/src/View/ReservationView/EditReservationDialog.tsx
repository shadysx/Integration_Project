import React, { useContext } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Court, Reservation, User } from '../../Interfaces/Interface';
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
  handleClose: () => void;
  fetchReservations: () => void;
  IsReservationLegit: () => boolean
  handleSelectedMembersChange: (event: SelectChangeEvent) => void
  users: User[]
  courts: Court[]
  selectedMembersId: string[],
  defaultReservation: Reservation
}

export default function EditReservationDialog(props: SimpleDialogProps) {
  const { 
    handleClose,
    selectedReservation,
    setSelectedReservation,
    open,
    fetchReservations,
    IsReservationLegit,
    users,
    courts,
    selectedMembersId,
    handleSelectedMembersChange,
  } = props;

  const { setAlert } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedReservation((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCourtChange = (event: SelectChangeEvent<typeof selectedReservation.court_id>) => {
    setSelectedReservation(prevReservation => ({...prevReservation, court_id: event.target.value}));
    console.log('changed court', event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!IsReservationLegit())
      return

    const reservationsService = new ReservationService();
    const response = await reservationsService.UpdateReservation(selectedReservation, selectedReservation.id);

    if(response !== null) {
      let data;

      try {
        data = await response;
      } catch (error) {
        console.log('Error parsing response:', error);
      }

      if (data) {
        setAlert({ type: "success", description: "Reservation updated successfully!", open: true });
        handleClose();
      } else {
        setAlert({ type: "error", description: "Failed to update reservation!", open: true });
      }
  
      await fetchReservations();
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle className="dialog-title">Edit Reservation</DialogTitle>
      <div className='dialog'>
        <form onSubmit={handleSubmit} className="dialog-form">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={selectedReservation?.date} onChange={handleChange} required /><br /><br />
          <label htmlFor="starting_hour">Starting Hour:</label>
          <input type="time" id="starting_hour" name="starting_hour" value={selectedReservation?.starting_hour} onChange={handleChange} required /><br /><br />
          <label htmlFor="ending_hour">Ending Hour:</label>
          <input type="time" id="ending_hour" name="ending_hour" value={selectedReservation?.ending_hour} onChange={handleChange} required /><br /><br />
          <SelectCourtsComboBox courtsList={courts} handleChange={handleCourtChange} />
          <SelectMembersComboBox membersList={users} handleChange={handleSelectedMembersChange} membersSelected={selectedMembersId} />
          <input type="submit" value="Update" />
        </form>
      </div>
    </Dialog>
  );
}
