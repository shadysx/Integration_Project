import React from 'react'
import { Category } from '../../Interfaces/Interface';
import { Dialog, DialogTitle } from '@mui/material';


export interface EditCategoryDialogProps {
    open: boolean;
    selectedCategory: Category;
    setSelectedCategory: (category: any) => void;
    onClose: (value: Category) => void;
    fetchCategories: () => void;
  }

export default function EditCategoryDialog(props: EditCategoryDialogProps){
    const { onClose, selectedCategory, setSelectedCategory, open, fetchCategories } = props;
    
    React.useEffect(() => {
        console.log("Dialog: ", selectedCategory)
      })
    const handleClose = () => {
    onClose(selectedCategory);
    };
      
    
    return (
        <Dialog onClose={handleClose} open={open} >
        <DialogTitle className="dialog-title">Edit User</DialogTitle>
    
        </Dialog>
  );
}
