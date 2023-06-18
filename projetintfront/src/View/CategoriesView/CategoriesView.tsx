import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import "./CategoriesView.css"
import { CategoriesService } from '../../services/CategoriesService';
import { Category } from '../../Interfaces/Interface';

function CategoriesView() {
  const categoriesService = new CategoriesService();
  const[categories, setCategories] = useState<Category[]>([]);
     
  useEffect(() => {
    const FetchCategories = async () => {      
      const fetchedCategories: Category[] = await categoriesService.FetchCategories();
      console.log(fetchedCategories)
      setCategories(fetchedCategories);      
    }
    FetchCategories();
  },[])   
    
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'ageMin', headerName: 'Age Min', width: 130 },
    { field: 'ageMax', headerName: 'Age Max', width: 130 },
    
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      
      renderCell: (params) => {
          const onClick = (e) => {
            const currentRow = params.row;
            return alert(JSON.stringify(currentRow, null, 4));
          };
          
          return (
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="primary" size="small" onClick={onClick}>Edit</Button>
              <Button variant="outlined" color="error" size="small" onClick={onClick}>Delete</Button>
            </Stack>
          );
      },
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 20 },
    { id: 6, lastName: 'Melisandre', firstName: 'Test', age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  
  ];
  
  
  function DataTable() {
    return (
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={categories}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    );
  }

  return (
    <>
      {/* <p>
        {JSON.stringify(categories, null, 4)}
      </p> */}
      <div className='main'>
        <DataTable/>
      </div>
      
      {/* <EditUserDialog 
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      /> */}
    </>
  )

}

export default CategoriesView

