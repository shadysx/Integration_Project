import React, { useContext, useEffect } from 'react'
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
import { BlockedsService } from '../../services/BlockedsService';
import { ReservationService } from '../../services/ReservationService';
import { AuthContext } from '../../contexts/AuthContext';

function CourtsView() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedCourt, setSelectedCourt] = React.useState<Court>();
  const [courts, setCourts] = React.useState<Court[]>([]);
  const { setAlert } = useContext(AuthContext);
  
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

          if (window.confirm("Are you sure you want to delete this court ?")) {       
            const courtsService = new CourtsService();
            const reservationService = new ReservationService();
            const blockedsService = new BlockedsService();

            const reservations = await reservationService.FetchReservations();
            const blockeds = await blockedsService.FetchBlockeds();    

            const blocked = blockeds.find(b => b.court_number == params.row.number)
            const reservation = reservations.find(r => r.court_number == params.row.number)
            
            if(reservation?.court_number == params.row.number)
            {
              setAlert({open: true, type: 'error', description:'Cannot delete, there is at least one reservation on this court' })
              return;
            }
            if(blocked?.court_number == params.row.number)
            {
              setAlert({open: true, type: 'error', description:'Cannot delete, this court have at least one blocked' })
              return;
            }

            setAlert({open: true, type: 'success', description:'Delete Court Successfully' })
            await courtsService.DeleteCourt(params.row.id);
            await FetchCourts()
          } 

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


