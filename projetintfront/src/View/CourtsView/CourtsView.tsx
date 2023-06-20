import React, { useEffect } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { UserService } from '../../services/UserService';
import { Court } from '../../Interfaces/Interface';
import { CategoriesService } from '../../services/CategoriesService';
import { CourtsService } from '../../services/CourtsService';
import EditCourtDialog from './EditCourtDialog';
import CreateCourtDialog from './CreateCourtDialog';

function CourtsView() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedCourt, setSelectedCourt] = React.useState<Court>();
  const [courts, setCourts] = React.useState<Court[]>([]);
  
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };



  const FetchCourts = async () => {
    const courtsService = new CourtsService();
    const courtsList: Court[] = await courtsService.FetchCourts();
    setCourts(courtsList);

    //alert(JSON.stringify(users, null, 4));
  }

  useEffect(() => {
    FetchCourts();
  },[])

const handleSetCourt = (court) => {
    setSelectedCourt(court);  
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'number', headerName: 'Number', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      
      renderCell: (params) => {
        const handleClickEdit = (e) => {
          setOpenEdit(true);
          setSelectedCourt(params.row)
        };
        const handleClickDelete = async (e) => {
          const courtsService = new CourtsService();
            await courtsService.DeleteCourt(params.row.id)
            await FetchCourts()

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
          rows={courts}
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
       <Button onClick={() => setOpenCreate(true)}>Add</Button>
      <DataTable/>
      <EditCourtDialog 
        selectedCourt={selectedCourt}
        setSelectedCourt={handleSetCourt}
        open={openEdit}
        onClose={handleCloseEdit}
        fetchCourts={FetchCourts}
      />
      <CreateCourtDialog 
        open={openCreate}
        onClose={handleCloseCreate}
        fetchCourts={FetchCourts}
      />
    </>
  )
}

export default CourtsView


