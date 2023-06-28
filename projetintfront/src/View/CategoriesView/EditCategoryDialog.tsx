import React, { useContext } from 'react'
import { Category } from '../../Interfaces/Interface';
import { Dialog, DialogTitle } from '@mui/material';
import { CategoriesService } from '../../services/CategoriesService';
import { AuthContext } from '../../contexts/AuthContext';
import "./CategoryDialog.css"


interface CategoryDialogProps {
    open: boolean;
    selectedCategory: Category;
    setSelectedCategory: (category: any) => void;
    onClose: (value: Category) => void;
    fetchCategories: () => void;
  }

export default function EditCategoryDialog(props: CategoryDialogProps){
    const { onClose, selectedCategory, setSelectedCategory, open, fetchCategories } = props;
    const { setAlert } = useContext(AuthContext);
    
    React.useEffect(() => {
        console.log("Dialog: ", selectedCategory)
      })
    const handleClose = () => {
    onClose(selectedCategory);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();      
      const categoryService = new CategoriesService();
      const { id, ...requestBody } = selectedCategory;

      if(requestBody.ageMin < 0)
      {
        setAlert({open:true, type:"error", description:"Age Min should be equal or bigger than 0"});
        return;
      }
      if(requestBody.ageMin > 100)
      {
        setAlert({open:true, type:"error", description:"Age Min should be equal or smaller than 100"});
        return;
      }

      if(requestBody.ageMax < 0)
      {
        setAlert({open:true, type:"error", description:"Age Max should be equal or bigger than 0"});
        return;
      }
      if(requestBody.ageMax > 100)
      {
        setAlert({open:true, type:"error", description:"Age Max should be equal or smaller than 100"});
        return;
      }     
      setAlert({ type: "success", description: "Category updated successfully!", open: true });
      handleClose();
      await categoryService.UpdateCategory(requestBody, id);
      await fetchCategories();
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedCategory((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };    
      
    
    return (
        <Dialog onClose={handleClose} open={open} >
        <DialogTitle className="dialog-title">Edit Category</DialogTitle>
        <div className='dialogCategory'>
        <form onSubmit={handleSubmit}  className="dialog-form">         
          
          <label htmlFor="name">Name :</label>
          <input type="text" id="name" name="name" value={selectedCategory?.name} onChange={handleChange} required /><br />

          <label htmlFor="ageMin">Age Min :</label>
          <input type="number" id="ageMin" name="ageMin" value={selectedCategory?.ageMin} onChange={handleChange} required /><br />

          <label htmlFor="ageMax">Age Max :</label>
          <input type="number" id="ageMax" name="ageMax" value={selectedCategory?.ageMax} onChange={handleChange} required /><br />          
          
          <div className="inputDiv">
            <input className="buttonSubmit" type="submit" value="Update" />
            <input className ="buttonCancel" type="button" value="Cancel" onClick={handleClose} />
          </div>
          
        </form>
        </div>
        </Dialog>
  );
}
