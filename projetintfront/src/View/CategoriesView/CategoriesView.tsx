import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import "./CategoriesView.css"
import { CategoriesService } from '../../services/CategoriesService';
import { Category } from '../../Interfaces/Interface';
import EditCategoryDialog from './EditCategoryDialog';
import CreateCategoryDialog from './CreateCategoryDialog';

function CategoriesView() {
  const categoriesService = new CategoriesService();
  const[categories, setCategories] = useState<Category[]>([]);  
  const [selectedCategory, setSelectedCategory] = React.useState<Category>();
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  
     
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const FetchCategories = async () => {      
    const fetchedCategories: Category[] = await categoriesService.FetchCategories();
    console.log(fetchedCategories)
    setCategories(fetchedCategories);      
  }
  useEffect(() => {    
    FetchCategories();
  },[])    


  const handleSetCategory = (category) => {
    setSelectedCategory(category);  
  }
    
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
          const handleClickDelete = async (e) => {
            const currentRow = params.row;            
            //return alert(JSON.stringify(currentRow, null, 4));
            await categoriesService.DeleteCategory(currentRow.id);
            await FetchCategories()
          };

          const handleClickEdit = (e) => {
            setOpenEdit(true);
            setSelectedCategory(params.row)
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
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 20 },
  //   { id: 6, lastName: 'Melisandre', firstName: 'Test', age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  
  // ];
  
  
  function DataTable() {
    return (
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={categories}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5,10,20]}          
        />
      </div>
    );
  }

  const handleCreate = () => {
    setOpenCreate(true);
  }
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  return (
    <>
      <Button onClick={() => setOpenCreate(true)}>Add</Button>
      
      <div className='main'>
        <DataTable/>
      </div>      
      <EditCategoryDialog 
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSetCategory}
        open={openEdit}
        onClose={handleCloseEdit}
        fetchCategories={FetchCategories}
      />
      <CreateCategoryDialog                 
        open={openCreate}
        onClose={handleCloseCreate}
        fetchCategories={FetchCategories}
      />
    </>
  )

}

export default CategoriesView

