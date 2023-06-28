//#region Imports
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, SelectChangeEvent, Stack } from '@mui/material';
import { UserService } from '../../services/UserService';
import { BlockedCourt, Court, Reservation, User } from '../../Interfaces/Interface';
import { ReservationService } from '../../services/ReservationService';
import EditReservationDialog from './EditReservationDialog';
import CreateReservationDialog from './CreateReservationDialog';
import { AuthContext } from '../../contexts/AuthContext';
import { CourtsService } from '../../services/CourtsService';
import moment from 'moment';
import { BlockedsService } from '../../services/BlockedsService';
//#endregion

function ReservationsView() {

  //#region States/Constants
  const defaultReservation: Reservation = {
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
  };

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation>(defaultReservation);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [usersFullNames, setUsersFullNames] = useState<string[]>([]);
  const [selectedMembersId, setSelectedMembersId] = useState<string[]>([]);
  const [blockedCourts, setBlockedCourts] = useState<BlockedCourt[]>([]);

  const { setAlert, user } = useContext(AuthContext);
  //#endregion

  //#region UseEffects
  useEffect(() => {
    //Keep the users reservation user list up to date
    fillReservationMembersFromSelectedMembersIds()
  },[selectedMembersId])
  //#endregion 

  //#region Methods
  const handleCloseEdit = () => {
    setOpenEdit(false);
    // Reset the fields to avoid errors
    setSelectedReservation(defaultReservation);
    setSelectedMembersId([])
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    // Reset the fields to avoid errors
    setSelectedReservation(defaultReservation);
    setSelectedMembersId([])
  };

  // Handle members selection change
  const handleSelectedMembersChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelectedMembersId(
      typeof value === 'string' ? value.split(',') : value
    );
    console.log('changed members', event.target.value);
  };

  
    // Fill the reservation members based on the selected members 
    const fillReservationMembersFromSelectedMembersIds = () => {
      setSelectedReservation((prevReservation) => ({
        ...prevReservation,
        user1_id: null,
        user2_id: null,
        user3_id: null,
        user4_id: null,
      }));
    
      if (selectedMembersId.length === 2) {
        setSelectedReservation((prevReservation) => ({
          ...prevReservation,
          user1_id: parseInt(selectedMembersId[0], 10),
          user2_id: parseInt(selectedMembersId[1], 10)
        }));
      } else if (selectedMembersId.length === 4) {
        setSelectedReservation((prevReservation) => ({
          ...prevReservation,
          user1_id: parseInt(selectedMembersId[0], 10),
          user2_id: parseInt(selectedMembersId[1], 10),
          user3_id: parseInt(selectedMembersId[2], 10),
          user4_id: parseInt(selectedMembersId[3], 10)
        }));
      }
    }
  //#endregion

  //#region Fetching 
  const fetchUsers = async () => {
    const userService = new UserService();
    const users: User[] = await userService.FetchUsers();
    const usersFullNamesTemp: string[] = users.map((user) => user.fullName);
    setUsersFullNames(usersFullNamesTemp);
    setUsers(users);
  };

  const fetchReservations = async () => {
    const reservationsService = new ReservationService();
    const reservations: Reservation[] = await reservationsService.FetchReservations();
    setReservations(reservations);
  };

  const fetchCourts = async () => {
    const courtsService = new CourtsService();
    const courts: Court[] = await courtsService.FetchCourts();
    setCourts(courts);
  };

  const fetchBlockedCourts = async () => {
    const blockedsService = new BlockedsService();
    const blockedCourts: BlockedCourt[] = await blockedsService.FetchBlockeds();
    setBlockedCourts(blockedCourts)
  }

  useEffect(() => {
    fetchReservations();
    fetchUsers();
    fetchCourts();
    fetchBlockedCourts()
  }, []);
  //#endregion

  //#region Check Constraints
    // Count the number of users in the reservation
    const usersInReservationCount = () => {
      const userIDs = [
        selectedReservation.user1_id,
        selectedReservation.user2_id,
        selectedReservation.user3_id,
        selectedReservation.user4_id
      ];
  
      const count = userIDs.filter((userID) => userID !== null).length;
  
      return count;
    }
    const isReservationTimeExceeded = (isUpdate): boolean => {
      // Checking if the user will exceed the maximum reservation hours for the week
    
      // Filter the reservations for the given user ID
      const concernedReservationsForUser = reservations.filter(
        (reservation) =>
          (reservation.user1_id === user.id ||
          reservation.user2_id === user.id ||
          reservation.user3_id === user.id ||
          reservation.user4_id === user.id) && 
          (!isUpdate || reservation.id !== selectedReservation.id) // Exclude the reservation being updated if it's an update operation
      );
    

      const selectedReservationDate = new Date(selectedReservation.date);
      // Get the current date and time at the start of the week (Sunday at 00:00:00)
      const startOfWeek = new Date(Date.UTC(selectedReservationDate.getUTCFullYear(), selectedReservationDate.getUTCMonth(), selectedReservationDate.getUTCDate() - (selectedReservationDate.getUTCDay() -1)));
    
      // Filter the reservations to only include those from the current week
      const concernedReservationsForUserForTheSelectedWeek = concernedReservationsForUser.filter(
        (reservation) => {
          const reservationDate = new Date(reservation.date);
          const startOfReservationDate = new Date(Date.UTC(reservationDate.getFullYear(), reservationDate.getMonth(), reservationDate.getDate()));

          console.log("startOfReservationDate", startOfReservationDate, "startOfweek", startOfWeek)
          return startOfReservationDate >= startOfWeek;
        }
      );
    
      console.log('MyResOfTheWeek: ', concernedReservationsForUserForTheSelectedWeek)
    
      // Calculate the total reservation hours for singles and doubles
      let totalHoursSingles = 0;
      let totalHoursDoubles = 0;
    
      for (const reservation of concernedReservationsForUserForTheSelectedWeek) {
        // Calculate the reservation duration
        const duration = moment.duration(moment(reservation.ending_hour, 'HH:mm:ss').diff(moment(reservation.starting_hour, 'HH:mm:ss'))).asHours();
    
        if (reservation.user3_id || reservation.user4_id) {
          // This is a doubles reservation
          totalHoursDoubles += duration;
        } else {
          // This is a singles reservation
          totalHoursSingles += duration;
        }
      }
    
      // Calculate the proposed reservation duration
      const proposedDuration = moment.duration(moment(selectedReservation.ending_hour, 'HH:mm:ss').diff(moment(selectedReservation.starting_hour, 'HH:mm:ss'))).asHours();
    
      // Check if this is a doubles or singles reservation
      if (selectedReservation.user3_id || selectedReservation.user4_id) {
        // This is a proposed doubles reservation
        if (totalHoursDoubles + proposedDuration > 4) {
          return false; // Exceeds maximum doubles reservation hours per week
        }
      } else {
        // This is a proposed singles reservation
        if (totalHoursSingles + proposedDuration > 2) {
          return false; // Exceeds maximum singles reservation hours per week
        }
      }
    
      // If none of the checks fail, the user will not exceed their reservation time for this week
      return true;
    };
    
    const isReservationLegit = (isUpdate: boolean): boolean => {
      if (usersInReservationCount() !== 2 && usersInReservationCount() !== 4) {
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
    
      if (usersInReservationCount() === 2 && durationInMinutes > 60) {
        setAlert({ type: "error", description: "Reservation duration cannot exceed 1 hour with 2 members", open: true });
        return false;
      }
    
      if (usersInReservationCount() === 4 && durationInMinutes > 120) {
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
    
      // Get all the users on the reservation
      const reservationUsers = [
        selectedReservation.user1_id,
        selectedReservation.user2_id,
        selectedReservation.user3_id,
        selectedReservation.user4_id,
      ].filter((userId) => userId !== null);

      // Ensure that the user creating the reservation is in the reservation
      if (!reservationUsers.includes(user.id) && !user.isAdmin) {
      setAlert({ type: "error", description: "You must be a participant in the reservation you are creating.", open: true });
        return false;
      }
    
      const unpaidUsers = [];
    
      for (const userId of reservationUsers) {
        const user = users.find((user) => user.id === userId);
        if (user && !user.hasPaidDues) {
          unpaidUsers.push(user.fullName);
        }
      }
    
      if (unpaidUsers.length > 0) {
        setAlert({ type: "error", description: `These members have not paid their dues: ${unpaidUsers.join(", ")}`, open: true });
        return false;
      }
    
      // Check if there is already a reservation for the selected court and time
        const existingReservation = reservations.find((reservation) =>
        (!isUpdate || (isUpdate && reservation.id !== selectedReservation.id)) &&
        reservation.court_id === selectedReservation.court_id &&
        reservation.date === selectedReservation.date &&
        (
          (reservation.starting_hour < selectedReservation.starting_hour && selectedReservation.starting_hour < reservation.ending_hour) ||
          (reservation.starting_hour < selectedReservation.ending_hour && selectedReservation.ending_hour < reservation.ending_hour)
        )
      );

      if (existingReservation) {
        console.log('Existing reservation: ', existingReservation)
        setAlert({ type: "error", description: "There is already a reservation for this court and time", open: true });
        return false;
      }
    
      // Check if the current user will exceed reservation time
      if (!isReservationTimeExceeded(isUpdate) && !user.isAdmin) {
        setAlert({ open: true, description: "You have reached your maximum reservation hours for the week.", type: "error" });
        return false;
      }

      // Check if there is the court is blocked
      const isBlocked = blockedCourts.some(blockedCourt => 
      blockedCourt.date === selectedReservation.date && blockedCourt.court_id === selectedReservation.court_id)

      if (isBlocked){
        setAlert({ open: true, description: "The court is blocked this day", type: "error" });
        return false;
      }
    
      return true;
    };

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
              await fetchReservations()
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
        handleClose={handleCloseEdit}
        fetchReservations={fetchReservations}
        IsReservationLegit={() => isReservationLegit(true)}
        users={users}
        courts={courts}
        defaultReservation={defaultReservation}
        handleSelectedMembersChange={handleSelectedMembersChange}
        selectedMembersId={selectedMembersId}
      />
      <CreateReservationDialog 
        selectedReservation={selectedReservation}
        setSelectedReservation={setSelectedReservation}
        open={openCreate}
        handleClose={handleCloseCreate}
        fetchReservations={fetchReservations}
        IsReservationLegit={() => isReservationLegit(false)}
        users={users}
        courts={courts}
        defaultReservation={defaultReservation}
        handleSelectedMembersChange={handleSelectedMembersChange}
        selectedMembersId={selectedMembersId}
      />
    </>
  )
  //#endregion
}

export default ReservationsView


