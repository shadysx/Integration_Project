import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, SelectChangeEvent, Stack } from '@mui/material';
import { UserService } from '../../services/UserService';
import { Court, Reservation, User } from '../../Interfaces/Interface';
import { ReservationService } from '../../services/ReservationService';
import EditReservationDialog from './EditReservationDialog';
import CreateReservationDialog from './CreateReservationDialog';
import { AuthContext } from '../../contexts/AuthContext';
import { CourtsService } from '../../services/CourtsService';

function ReservationsView() {

  //#region States/Constants
  const defaultReservation = {
    starting_hour: "09:00:00",
    ending_hour: "10:00:00",
    date: "2023-06-22",
    court_id: null,
    user1_id: null,
    user2_id: null,
    user3_id: null,
    user4_id: null,
    user1_name: "",
    user2_name: "",
    court_number: 0,
    duration: "01:00:00"
  }

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedReservation, setSelectedReservation] = React.useState<Reservation>(defaultReservation);
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const [usersFullNames, setUsersFullNames] = useState<string[]>([]);
  const [forceUpdate, setForceUpdate] = useState<boolean>(false)

  const { setAlert, user } = useContext(AuthContext);
  //#endregion


  //#region Methods
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    // Reset the ids to avoid errors
    setSelectedReservation(defaultReservation)
  };
  //#endregion


  //#region Fetching 
  const FetchUsers = async () => {
    const userService = new UserService();
    const users: User[] = await userService.FetchUsers();
    //alert(JSON.stringify(users, null, 4));
    const usersFullNamesTemp: string[] = users.map((user) => user.fullName);
    setUsersFullNames(usersFullNamesTemp)
    setUsers(users)
  }

  const FetchReservations = async () => {
    const reservationsService = new ReservationService();
    const reservations: Reservation[] = await reservationsService.FetchReservations();
    setReservations(reservations);
  }

  const FetchCourts = async () => {
    const courtsService = new CourtsService();
    const courts: Court[] = await courtsService.FetchCourts()
    setCourts(courts)
  }

  useEffect(() => {
    FetchReservations();
    FetchUsers();
    FetchCourts()
  },[])

  //#endregion 

  //#region Check Constraints
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

  const IsReservationLegit = (isUpdate) => {
  

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

    if(!isUpdate){
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
    }
 
  
    return true;
  }

  //#endregion

  //#region GridView
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'starting_hour', headerName: 'Starting Hour', width: 120 },
    { field: 'ending_hour', headerName: 'Ending Hour', width: 120 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'court_number', headerName: 'Court Number', width: 120 },
    { field: 'user1_name', headerName: 'Player 1', width: 120 },
    { field: 'user2_name', headerName: 'Player 2', width: 120 },
    { field: 'user3_name', headerName: 'Player 3', width: 120 },
    { field: 'user4_name', headerName: 'Player 4', width: 120 },

    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      renderCell: (params) => {
        const isUserPartOfReservation = params.row.user1_id === user.id || params.row.user2_id === user.id || params.row.user3_id === user.id || params.row.user4_id === user.id;
    
        const handleClickEdit = (e) => {
          setOpenEdit(true);
          setSelectedReservation(params.row)
        };
    
        const handleClickDelete = async (e) => {
          if (window.confirm("Are you sure you want to delete this reservation?")) {
            try {
              const reservationService = new ReservationService();
              await reservationService.DeleteReservation(params.row.id)
              await FetchReservations()
            } catch (error) {
              console.log('Error deleting reservation:', error);
            }
          }
        };
    
        // Render the buttons if the user is an admin or if the user is part of the reservation
        if (user.isAdmin || isUserPartOfReservation) {
          return (
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="primary" size="small" onClick={handleClickEdit}>Edit</Button>
              <Button variant="outlined" color="error" size="small" onClick={handleClickDelete}>Delete</Button>
            </Stack>
          );
        }
    
        // Don't render any buttons if the user is not an admin and is not part of the reservation
        return null;
      },
    }
  ];
  
  function DataTable() {
    return (
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={reservations}
          columns={columns}
          editMode='row'
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    );
  }
  //#endregion

  //#region TSX
  return (
    <>
      <Button onClick={() => setOpenCreate(true)}>Add</Button>
      <DataTable/>
      <EditReservationDialog 
        selectedReservation={selectedReservation}
        setSelectedReservation={setSelectedReservation}
        open={openEdit}
        onClose={handleCloseEdit}
        fetchReservations={FetchReservations}
        usersFullNames={usersFullNames}
      />
      <CreateReservationDialog 
        selectedReservation={selectedReservation}
        setSelectedReservation={setSelectedReservation}
        open={openCreate}
        onClose={handleCloseCreate}
        fetchReservations={FetchReservations}
        IsReservationLegit={() => IsReservationLegit(false)}
        users={users}
        courts={courts}
        defaultReservation={defaultReservation}
      />
    </>
  )
  //#endregion
}

export default ReservationsView


