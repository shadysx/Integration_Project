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
}

export default function CreateReservationDialog(props: SimpleDialogProps) {
  const [courts, setCourts] = React.useState<Court[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const [membersSelected, setMembersSelected] = React.useState<string[]>([]);
  const { onClose, selectedReservation, setSelectedReservation, open, fetchReservations} = props;

  const { setAlert } = useContext(AuthContext);

  // This function resets the reservation fields
  // Call this on closeDialog
  const resetReservationFields = () => {
    setSelectedReservation({
      starting_hour: "09:00:00",
      ending_hour: "11:00:00",
      date: "2023-06-22",
      court_id: null,
      user1_id: null,
      user2_id: null,
      user3_id: null,
      user4_id: null,
      user1_name: "",
      user2_name: "",
      court_number: 0
    });
    setMembersSelected([]);
  }

  // Fetch the list of courts from the server
  const fetchCourts = async () => {
    const courtsService = new CourtsService();
    const courtsList: Court[] = await courtsService.FetchCourts();
    setCourts(courtsList);
  }

  const FetchReservations = async () => {
    const reservationsService = new ReservationService();
    const reservations: Reservation[] = await reservationsService.FetchReservations();
    setReservations(reservations);
  }

  // Fetch the list of users from the server
  const fetchUsers = async () => {
    const userService = new UserService();
    const users: User[] = await userService.FetchUsers();
    setUsers(users);
  }

  // Fetch courts and users when the component mounts
  useEffect(() => {
    fetchCourts();
    fetchUsers();
    FetchReservations()
  }, []);

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

  // Count the number of users in the reservation
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

  const IsReservationLegit = () => {
  

    if (UsersInReservationCount() !== 2 && UsersInReservationCount() !== 4) {
      setAlert({ type: "error", description: "Numbers of players incorrect (2,4)", open: true });
      return false;
    }
  
    const startingHour = parseInt(selectedReservation.starting_hour.slice(0, 2));
    const endingHour = parseInt(selectedReservation.ending_hour.slice(0, 2));
    const durationInMinutes = (endingHour - startingHour) * 60; // Convert to minutes
  
    if (startingHour < 9 || endingHour > 22) {
      setAlert({ type: "error", description: "Reservation time should be between 9:00 and 22:00", open: true });
      return false;
    }
  
    if (UsersInReservationCount() === 2 && durationInMinutes > 60) {
      setAlert({ type: "error", description: "Reservation duration cannot exceed 1 hour with 2 members", open: true });
      return false;
    }
  
    if (UsersInReservationCount() === 4 && durationInMinutes > 120) {
      setAlert({ type: "error", description: "Reservation duration cannot exceed 2 hours with 4 members", open: true });
      return false;
    }
    const selectedDate = new Date(selectedReservation.date);
    const dayOfWeek = selectedDate.getDay();
  
    // Check if the selected date is a weekday (Monday to Friday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setAlert({ type: "error", description: "Reservations can only be made on weekdays", open: true });
      return false;
    }
    
    const reservationUsers = [
      selectedReservation.user1_id,
      selectedReservation.user2_id,
      selectedReservation.user3_id,
      selectedReservation.user4_id
    ].filter((userId) => userId !== null);
  
    let unpaidUsers = [];
  
    for (let userId of reservationUsers) {
      let user = users.find(user => user.id === userId);
      if (user && !user.hasPaidDues) {
        unpaidUsers.push(user.fullName);
      }
    }
  
    if (unpaidUsers.length > 0) {
      setAlert({ type: "error", description: `These members have not paid their dues: ${unpaidUsers.join(", ")}`, open: true });
      return false;
    }



    // Check if there is already a reservation for the selected court and time
    const existingReservation = reservations.find(
    (reservation) =>
      reservation.court_id === selectedReservation.court_id &&
      reservation.date === selectedReservation.date &&
      (
        (reservation.starting_hour <= selectedReservation.starting_hour && selectedReservation.starting_hour < reservation.ending_hour) ||
        (reservation.starting_hour < selectedReservation.ending_hour && selectedReservation.ending_hour <= reservation.ending_hour)
      )
  );

  if (existingReservation) {
    setAlert({ type: "error", description: "There is already a reservation for this court and time", open: true });
    return false;
  }
  
    return true;
  }
  

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
