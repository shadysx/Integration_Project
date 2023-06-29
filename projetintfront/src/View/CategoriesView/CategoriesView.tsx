import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import "./CategoriesView.css"
import { CategoriesService } from '../../services/CategoriesService';
import { Category } from '../../Interfaces/Interface';
import EditCategoryDialog from './EditCategoryDialog';
import CreateCategoryDialog from './CreateCategoryDialog';
import { AuthContext } from '../../contexts/AuthContext';

function CategoriesView() {
  const categoriesService = new CategoriesService();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>();
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const { setAlert } = useContext(AuthContext);

  // Close the Edit dialog
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // Fetch categories from the server
  const FetchCategories = async () => {
    const fetchedCategories: Category[] = await categoriesService.FetchCategories();
    console.log(fetchedCategories);
    setCategories(fetchedCategories);
  }

  useEffect(() => {
    FetchCategories();
  }, []);

  // Set the selected category
  const handleSetCategory = (category) => {
    setSelectedCategory(category);
  }

  // Columns configuration for the data grid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'ageMin', headerName: 'Age Min', width: 130 },
    { field: 'ageMax', headerName: 'Age Max', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      renderCell: (params) => {
        const handleClickDelete = async (e) => {
          if (window.confirm("Are you sure you want to delete this category?")) {
            const currentRow = params.row;
            await categoriesService.DeleteCategory(currentRow.id);
            setAlert({ type: "success", description: "Category deleted successfully!", open: true });
            await FetchCategories();
          }
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

  function DataTable() {
    return (
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={categories}
          columns={columns}
          sx={{height: '105.1%'}}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5 ,10, 25, 100]}
        />
      </div>
    );
  }

  // Open the Create dialog
  const handleCreate = () => {
    setOpenCreate(true);
  }

  // Close the Create dialog
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
