import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, SelectChangeEvent, Stack } from '@mui/material';
import { UserService } from '../../services/UserService';
import { Reservation, User } from '../../Interfaces/Interface';
import { ReservationService } from '../../services/ReservationService';
import EditReservationDialog from './EditReservationDialog';
import CreateReservationDialog from './CreateReservationDialog';
import { AuthContext } from '../../contexts/AuthContext';

function ReservationsView() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState<Reservation>({
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
    court_number: 0,
    duration: "01:00:00"
  });
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const [usersFullNames, setUsersFullNames] = useState<string[]>([]);
  const [forceUpdate, setForceUpdate] = useState<boolean>(false)

  const { setAlert, user } = useContext(AuthContext);
  
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    // Reset the ids to avoid errors
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
    })
  };



  const FetchUsers = async () => {
    const userService = new UserService();
    const users: User[] = await userService.FetchUsers();
    //alert(JSON.stringify(users, null, 4));
    const usersFullNamesTemp: string[] = users.map((user) => user.fullName);
    setUsersFullNames(usersFullNamesTemp)
  }

  const FetchReservations = async () => {
    const reservationsService = new ReservationService();
    const reservations: Reservation[] = await reservationsService.FetchReservations();
    setReservations(reservations);
  }

  useEffect(() => {
    FetchReservations();
    FetchUsers();


  },[])

  useEffect(() => {
    console.log("reservationView: ", reservations)
    setForceUpdate(!forceUpdate)

  },[reservations])

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

    user.isAdmin && {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      
      renderCell: (params) => {
        const handleClickEdit = (e) => {
          setOpenEdit(true);
          setSelectedReservation(params.row)
        };
        const handleClickDelete = async (e) => {
          alert(params.row);
          const reservationService = new ReservationService();
          await reservationService.DeleteReservation(params.row.id)
          await FetchReservations()

        };
          
          return (
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="primary" size="small" onClick={handleClickEdit}>Edit</Button>
              <Button variant="outlined" color="error" size="small" onClick={handleClickDelete}>Delete</Button>
            </Stack>
          );
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
      />
    </>
  )
}

export default ReservationsView


