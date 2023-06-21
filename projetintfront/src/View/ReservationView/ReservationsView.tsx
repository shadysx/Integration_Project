import React, { useEffect } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { UserService } from '../../services/UserService';
import { Reservation, User } from '../../Interfaces/Interface';
import { ReservationService } from '../../services/ReservationService';

function ReservationsView() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState<Reservation>();
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };



  const FetchReservations = async () => {
    const reservationsService = new ReservationService();
    const reservations: Reservation[] = await reservationsService.FetchReservations();
    setReservations(reservations);
    //alert(JSON.stringify(users, null, 4));
  }

  useEffect(() => {
    FetchReservations();
  },[])

  const handleSetUser = (reservation) => {
    setReservations(reservation);  
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
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
          const userService = new UserService();
          await userService.DeleteUser(params.row.id)
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
      <DataTable/>
      {/* <EditUserDialog 
        selectedUser={selectedUser}
        setSelectedUser={handleSetUser}
        open={openEdit}
        onClose={handleCloseEdit}
        fetchUsers={FetchUsers}
      />
      <CreateUserDialog 
        selectedUser={{} as User}
        setSelectedUser={handleSetUser}
        open={openCreate}
        onClose={handleCloseCreate}
        fetchUsers={FetchUsers}
      /> */}
    </>
  )
}

export default ReservationsView


