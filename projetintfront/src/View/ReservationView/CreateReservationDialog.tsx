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
  usersFullNames: string[]
}

export default function CreateReservationDialog(props: SimpleDialogProps) {
  const [courts, setCourts] = React.useState<Court[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [membersSelected, setMembersSelected] = React.useState<string[]>([]);
  const { onClose, selectedReservation, setSelectedReservation, open, fetchReservations, usersFullNames } = props;


  const { setAlert } = useContext(AuthContext)

  // This prevent bugs 
  // Call this on closeDialog, 
  const ResetReservationFields = () => {
    setSelectedReservation({
      starting_hour: "09:00:00",
      ending_hour: "11:00:00",
      date: "2023-06-22",
      court_id: 1,
      user1_id: null,
      user2_id: null,
      user3_id: null,
      user4_id: null,
      user1_name: "",
      user2_name: "",
      court_number: 0
    })
    setMembersSelected([])
  } 
  
  const FetchCourts = async () => {
    const courtsService = new CourtsService();
    const courtsList: Court[] = await courtsService.FetchCourts();
    setCourts(courtsList);
  }

  const FetchUsers = async () => {
    const userService = new UserService();
    const users: User[] = await userService.FetchUsers();
    setUsers(users);
  }

  useEffect(() => {
    FetchCourts();
    FetchUsers();
  },[])

  const handleClose = () => {
    onClose(selectedReservation);
    ResetReservationFields()
  };

  useEffect(() => {
    FillReservationMembersFromSelectedMembersIds()
    console.log("selectedReservation after filled by combobox", selectedReservation)
  },[membersSelected])

  const FillReservationMembersFromSelectedMembersIds = () => {
    console.log('selected amound', membersSelected.length)
    console.log("useeffect", membersSelected)
    if(membersSelected.length == 2) {
      setSelectedReservation((prevReservation) => {
        return {
          ...prevReservation,
          user1_id: membersSelected[0], 
          user2_id: membersSelected[1]
        };
      });
    }
    else if (membersSelected.length == 4) {
      setSelectedReservation((prevReservation) => {
        return {
          ...prevReservation,
          user1_id: membersSelected[0], 
          user2_id: membersSelected[1],
          user3_id: membersSelected[2], 
          user4_id: membersSelected[3]
        };
      });
    }
  }

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

  const handleUser3Change = async (selectedValue: string) => {
    const userId = await Helper.ConvertUserFullNameToId(selectedValue)
    console.log(userId)
    setSelectedReservation((prevReservation) => {
      return {
        ...prevReservation,
        user3_id: userId, // Update the categories with the new categoryId
      };
    });
  }
  
  const handleUser4Change = async (selectedValue: string) => {
    const userId = await Helper.ConvertUserFullNameToId(selectedValue)
    console.log(userId)
    setSelectedReservation((prevReservation) => {
      return {
        ...prevReservation,
        user4_id: userId, // Update the categories with the new categoryId
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

  const handleCourtChange = (event: SelectChangeEvent<typeof selectedReservation.court_id>) => {
    setSelectedReservation(prevReservation => ({...prevReservation, court_id: event.target.value}));

    console.log('changed court', event.target.value)
  };

  const handleMembersChange = (event: SelectChangeEvent) => {
    //setSelectedReservation(prevReservation => ({...prevReservation, court_id: event.target.value}));
    const {
      target: { value },
    } = event;
    setMembersSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log('changed members', event.target.value)
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("submitres", selectedReservation)
    if(UsersInReservationCount() != 2 && UsersInReservationCount() != 4){
      console.log(UsersInReservationCount())
      setAlert({type: "error", description: "Can only be even number of players", open: true})
      return
    }
    handleClose();
    // Add your logic to handle the form submission here
    const reservationsService = new ReservationService();
    const { id, ...requestBody } = selectedReservation;

    const response = await reservationsService.CreateReservation(requestBody);

    console.log(response)

    let data; // Variable to store the response data

    try {
      data = await response.json();
    } catch (error) {
      console.log('Error parsing response:', error);
    }
  


    if(response.ok){
      setAlert({type: "success", description: data.message, open: true}) 
    }
    else {
      let firstError = data.errors[Object.keys(data.errors)[0]]
      setAlert({type: "error", description: firstError, open: true}) 
    }


    await fetchReservations();
  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Create Reservation</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="starting_hour">Starting Hour:</label>
      <input type="time" id="starting_hour" name="starting_hour" value={selectedReservation?.starting_hour} onChange={handleChange} required /><br /><br />
      <label htmlFor="ending_hour">Ending Hour:</label>
      <input type="time" id="ending_hour" name="ending_hour" value={selectedReservation?.ending_hour} onChange={handleChange} required /><br /><br /> 
      <SelectCourtsComboBox courtsList={courts} handleChange={handleCourtChange}/>
      <SelectMembersComboBox membersList={users} handleChange={handleMembersChange} membersSelected={membersSelected}/>
      <input type="submit" value="Create" />
    </form>
    </div>
  </Dialog>
  );
}