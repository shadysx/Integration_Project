import React, { useEffect } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import EditUserDialog from './EditUserDialog';
import { UserService } from '../../services/UserService';
import { User } from '../../Interfaces/Interface';

function UserView() {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const [users, setUsers] = React.useState<User[]>([]);
  
  const handleClose = () => {
    setOpen(false);
  };

  const FetchUsers = async () => {
    const userService = new UserService();
    const users: User[] = await userService.FetchUsers();
    setUsers(users);
    //alert(JSON.stringify(users, null, 4));
  }

  useEffect(() => {
    FetchUsers();
  },[])

  const handleSetUser = (user) => {
    setSelectedUser(user);
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      
      renderCell: (params) => {
        const handleClickEdit = (e) => {
          setOpen(true);
          setSelectedUser(params.row)
        };
        const handleClickDelete = async (e) => {
          alert(params.row);
          const userService = new UserService();
          await userService.DeleteUser(params.row.id)
          await FetchUsers()

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
          rows={users}
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
      <EditUserDialog 
        selectedUser={selectedUser}
        setSelectedUser={handleSetUser}
        open={open}
        onClose={handleClose}
        fetchUsers={FetchUsers}
      />
    </>
  )
}

export default UserView


