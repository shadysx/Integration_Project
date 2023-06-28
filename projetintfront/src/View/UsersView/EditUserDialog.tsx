import React, { useContext } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { User } from '../../Interfaces/Interface';
import { useState } from 'react';
import "./EditUserDialog.css"
import { UserService } from '../../services/UserService';
import ComboBox from '../../components/ComboBox';
import { CategoriesService } from '../../services/CategoriesService';
import { Helper } from '../../Helpers/Helper';
import { AuthContext } from '../../contexts/AuthContext';

export interface SimpleDialogProps {
  open: boolean;
  selectedUser: User;
  setSelectedUser: (user: any) => void;
  onClose: (value: User) => void;
  fetchUsers: () => void;
}

export default function EditUserDialog(props: SimpleDialogProps) {
  const { onClose, selectedUser, setSelectedUser, open, fetchUsers } = props;
  const [categoryNames, setCategoryNames] = useState([]);

  const { setAlert } = useContext(AuthContext);

  React.useEffect(() => {
    const FetchCategoryNames = async () => {
      const categoriesService = new CategoriesService()
      const _categoryNames = await categoriesService.FetchCategories()
      let nameList = [];
      _categoryNames.map(category => {
        nameList.push(category.name)
      })
      setCategoryNames(nameList)
    }
    FetchCategoryNames()
  },[])

  React.useEffect(() => {

  })

  const handleClose = () => {
    onClose(selectedUser);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoryChange = async (categoryName: string) => {
    const categoryId = await Helper.ConvertCategoryNameToId(categoryName)
    console.log('Category Name: ', categoryName, ' CategoryID: ', categoryId)
    setSelectedUser((prevUser) => {
      return {
        ...prevUser,
        categoryId: [categoryId] // Update the categories with the new categoryId
      };
    });
  }

  const handleHasPaidDuesChange = () => {
    setSelectedUser((prevState) => ({
      ...prevState,
      hasPaidDues: !prevState.hasPaidDues
    }));
  }
  const handleSubmit = async (event) => {
    event.preventDefault();    

    
    
    const userService = new UserService();
    const { id, ...requestBody } = selectedUser;    

    if (requestBody.mobile && /[a-zA-Z~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/\\]/.test(requestBody.mobile)) {
      setAlert({ open: true, type: 'error', description: 'Mobile cannot contains letter or special char' });
      return;
    }

    handleClose();
    setAlert({open: true, type: 'success', description:'Member Updated Successfully !' })

    console.log('Submited: ', requestBody)
    await userService.UpdateUser(requestBody, id);
    await fetchUsers();
    
    
    

    
  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Edit User</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="lastName">Last Name:
      <input type="text" id="lastName" name="lastName" value={selectedUser?.lastName} onChange={handleChange} required />
      </label>  
      <label htmlFor="firstName">First Name:
      <input type="text" id="firstName" name="firstName" value={selectedUser?.firstName} onChange={handleChange} required />
      </label>  
      <label htmlFor="email">Email:
      <input type="email" id="email" name="email" value={selectedUser?.email} onChange={handleChange} required />
      </label>  
      <label htmlFor="dateOfBirth">Birthday:    
      <input type="date" id="dateOfBirth" name="dateOfBirth" value={selectedUser?.dateOfBirth} onChange={handleChange} required />
      </label>  
      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={selectedUser?.gender} onChange={handleChange} required>        
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select>
      
      <label htmlFor="locality">Locality :
      <input type="text" id="locality" name="locality" value={selectedUser?.locality} onChange={handleChange} required />
      </label>  
      <label htmlFor="mobile">Mobile :
      <input type="tel" id="mobile" name="mobile" value={selectedUser?.mobile} onChange={handleChange} required />
      </label>  
      <label htmlFor="postalCode">Postal Code :
      <input type="text" id="postalCode" name="postalCode" value={selectedUser?.postalCode} onChange={handleChange} required />
      </label>      
      <label htmlFor="status">Status :
      <input type="text" id="status" name="status" value={selectedUser?.status} onChange={handleChange} required />
      </label>  
      <label htmlFor="street">Street :
      <input type="text" id="street" name="street" value={selectedUser?.street} onChange={handleChange} required />
      </label>  
      <label htmlFor="hasPaidDues">Has paid : 
      <input type="checkbox" id="hasPaidDues" name="hasPaidDues" checked={selectedUser?.hasPaidDues} onChange={handleHasPaidDuesChange} />
      </label>  
      <label htmlFor="categoryName">Category :</label>
      <ComboBox options={categoryNames} currentValue={selectedUser?.categoryName} onChange={handleCategoryChange}/>
      
      <input type="submit" value="Update" />
    </form>
    </div>
  </Dialog>
  );
}