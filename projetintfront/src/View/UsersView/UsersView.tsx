import React, { useEffect } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import EditUserDialog from './EditUserDialog';
import { UserService } from '../../services/UserService';
import { User } from '../../Interfaces/Interface';
import CreateUserDialog from './CreateUserDialog';
import { CategoriesService } from '../../services/CategoriesService';

function UserView() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const [users, setUsers] = React.useState<User[]>([]);
  
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };



  const FetchUsers = async () => {
    const userService = new UserService();
    const users: User[] = await userService.FetchUsers();
    setUsers(users);
    //alert(JSON.stringify(users, null, 4));
  }

  useEffect(() => {
    FetchUsers();
    console.log('main', selectedUser)
  },[])

  useEffect(() => {
    console.log('main', selectedUser)
  })

  const handleSetUser = (user) => {
    setSelectedUser(user);  
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'dateOfBirth', headerName: 'Birthday', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 130 },
    { field: 'isAdmin', headerName: 'IsAdmin', width: 130 },
    { field: 'ranking', headerName: 'Rank', width: 130 },
    { field: 'categoryName', headerName: 'Category', width: 130 },
    
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
          setOpenEdit(true);
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
      />
    </>
  )
}

export default UserView


