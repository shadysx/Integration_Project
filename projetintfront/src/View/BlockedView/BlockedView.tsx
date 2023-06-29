import { Stack, Button, SelectChangeEvent } from '@mui/material';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react'
import { ReservationService } from '../../services/ReservationService';
import { UserService } from '../../services/UserService';
import { BlockedCourt, Court, Reservation, User } from '../../Interfaces/Interface';
import { AuthContext } from '../../contexts/AuthContext';
import { BlockedsService } from '../../services/BlockedsService';
import CreateBlockedCourtDialog from './CreateBlockedCourtDialog';
import { CourtsService } from '../../services/CourtsService';
import { Block } from '@mui/icons-material';

function BlockedView() {

    //#region States/Constants
    const defaultBlockedCourt: BlockedCourt = {
        begin_hour: "09:00:00",
        date: "2023-06-22",
        court_id: null,
        user_id: null,
        duration: "1",
        court_number: 0
      };

    const [blockedCourts, setBlockedCourts] = useState<BlockedCourt[]>([]);
    const [selectedBlockedCourt, setSelectedBlockedCourt] = useState<BlockedCourt>(defaultBlockedCourt);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [courts, setCourts] = useState<Court[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedMembersId, setSelectedMembersId] = useState<string[]>([]);

    const { setAlert, user } = useContext(AuthContext);

  //#endregion

  //#region Fetching 
  const fetchBlockedCourts = async () => {
    const blockedService = new BlockedsService();
    const bloquedCourts: BlockedCourt[] = await blockedService.FetchBlockeds();
    setBlockedCourts(bloquedCourts);
  };

  const fetchUsers = async () => {
    const userService = new UserService();
    const users: User[] = await userService.FetchUsers();
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

  useEffect(() => {
    fetchBlockedCourts();
    fetchCourts();
    fetchReservations();
    fetchUsers();
    setSelectedBlockedCourt(prevBlocked => ({...prevBlocked, user_id: user.id}));
  }, []);

  // useEffect(() => {    
  //   console.log(first)
  //   setSelectedBlockedCourt(prevBlocked => ({...prevBlocked, user_id: user.id}));
  // }, [selectedBlockedCourt]);



  //#endregion

    //#region Methods


    // Handle input change for blockCourts fields
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedBlockedCourt((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        // Reset the fields to avoid errors
        setSelectedBlockedCourt(defaultBlockedCourt);
      };
    
      const handleCloseCreate = () => {
        setOpenCreate(false);
        // Reset the fields to avoid errors
        setSelectedBlockedCourt({...defaultBlockedCourt, user_id: user.id});       
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

      const handleCourtChange = (event: SelectChangeEvent) => {
        setSelectedBlockedCourt(prevBlocked => ({...prevBlocked, court_id: parseInt(event.target.value, 10)}));
        console.log('changed court', event.target.value);
      };
      

      //#endregion

    //#region Check Constraints

    const isBlockedCourtLegit = () => {
      for (const reservation of reservations) {
        // Only consider reservations for the same court
        if (reservation.court_id !== selectedBlockedCourt.court_id) {
            continue;
        }

        // Check if the blocked date is the same as the reservation date
        if (selectedBlockedCourt.date === reservation.date) {
            // The BlockedCourt is not legit because there is a reservation on the same date
            setAlert({open: true, description: 'There are reservations a this date, you cannot block this court', type: "error"})
            return false;
        }
    }
      return true
  }
  
    //#endregion

  //#region GridView
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'duration', headerName: 'Duration', width: 100 },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'user_id', headerName: 'User id', width: 120 },
    { field: 'court_number', headerName: 'Court Number', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      renderCell: (params) => {
        const isUserPartOfReservation = params.row.user1_id === user.id || params.row.user2_id === user.id || params.row.user3_id === user.id || params.row.user4_id === user.id;
    
        const handleClickEdit = (e) => {
        //   setOpenEdit(true);
        //   setSelectedReservation(params.row)
        };
    
        const handleClickDelete = async (e) => {
          if (window.confirm("Are you sure you want to delete this blocked ?")) {
            try {
              const blockedsService = new BlockedsService();
              await blockedsService.DeleteBlocked(params.row.id)
              setAlert({ type: "success", description: "Blocked Court deleted successfully!", open: true });
              await fetchBlockedCourts()
            } catch (error) {
              console.log('Error deleting blocked court:', error);
            }
          }
        };
    
        // Render the buttons if the user is an admin or if the user is part of the reservation
        if (user.isAdmin || isUserPartOfReservation) {
          return (
            <Stack direction="row" spacing={2}>
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
          rows={blockedCourts}
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

  return (
    <>
      <Button onClick={() => setOpenCreate(true)}>Add</Button>
    <DataTable/>
    <CreateBlockedCourtDialog 
        open={openCreate}
        selectedBlockedCourt={selectedBlockedCourt}
        setSelectedBlockedCourt={setSelectedBlockedCourt}
        courts={courts}
        users={users}
        defaultBlockedCourt={defaultBlockedCourt}
        isBlockedCourtLegit={isBlockedCourtLegit}
        handleClose={handleCloseCreate}
        fetchBlockedCourts={fetchBlockedCourts}
        handleSelectedMembersChange={handleSelectedMembersChange}
        handleCourtChange={handleCourtChange}
        handleChange={handleChange}
        selectedMembersId={selectedMembersId}
    />

    </>
     )
}

export default BlockedView