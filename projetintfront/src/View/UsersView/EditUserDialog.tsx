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
import { useNavigate } from 'react-router';

export interface SimpleDialogProps {
  open: boolean;
  selectedUser: User;
  setSelectedUser: (user: any) => void;
  onClose: (value: User) => void;
  fetchUsers: () => void;
}

export default function EditUserDialog(props: SimpleDialogProps) {
  const { onClose, selectedUser, setSelectedUser, open, fetchUsers } = props;
  const [ categoryNames, setCategoryNames ] = useState([]);
  const { user } = useContext(AuthContext);

  const { setAlert } = useContext(AuthContext);

  const navigate = useNavigate();  

  React.useEffect(() => {
    // Fetch category names and populate the ComboBox options
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
  
  // Update the selected user object when input values change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle category change in the ComboBox
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

  // Toggle the hasPaidDues property of the selected user
  const handleHasPaidDuesChange = () => {
    setSelectedUser((prevState) => ({
      ...prevState,
      hasPaidDues: !prevState.hasPaidDues
    }));
  }

  // Toggle the isAdmin property of the selected user
  const handleIsAdminChange = () => {
    setSelectedUser((prevState) => ({
      ...prevState,
      isAdmin: !prevState.isAdmin
    }));
  }  

  const handleSubmit = async (event) => {
    event.preventDefault();       
       
    const userService = new UserService();
    const { id, ...requestBody } = selectedUser;    

    // Validate the mobile number
    if (requestBody.mobile && /[a-zA-Z~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/\\]/.test(requestBody.mobile)) {
      setAlert({ open: true, type: 'error', description: 'Mobile cannot contain letters or special characters' });
      return;
    }

    // Update user and navigate to home page if the current user's admin status is changed
    if(selectedUser.id == user.id && !requestBody.isAdmin)
    {
      console.log("True");
      user.isAdmin = false;
      await userService.UpdateUser(requestBody, id); 
      await fetchUsers();
      navigate("/");
    }
    else
    {
      await userService.UpdateUser(requestBody, id);
      await fetchUsers();
      handleClose();
    }
    
    setAlert({open: true, type: 'success', description:'Member Updated Successfully!' })

  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Edit User</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" name="lastName" value={selectedUser?.lastName} onChange={handleChange} required />
        
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" value={selectedUser?.firstName} onChange={handleChange} required />
        
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={selectedUser?.email} onChange={handleChange} required />
        
      <label htmlFor="dateOfBirth">Birthday:</label>
      <input type="date" id="dateOfBirth" name="dateOfBirth" value={selectedUser?.dateOfBirth} onChange={handleChange} required />
        
      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={selectedUser?.gender} onChange={handleChange} required>        
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select>
      
      <label htmlFor="locality">Locality:</label>
      <input type="text" id="locality" name="locality" value={selectedUser?.locality} onChange={handleChange} required />
        
      <label htmlFor="mobile">Mobile:</label>
      <input type="tel" id="mobile" name="mobile" value={selectedUser?.mobile} onChange={handleChange} required />
        
      <label htmlFor="postalCode">Postal Code:</label>
      <input type="text" id="postalCode" name="postalCode" value={selectedUser?.postalCode} onChange={handleChange} required />
        
      <label htmlFor="status">Status:</label>
      <input type="text" id="status" name="status" value={selectedUser?.status} onChange={handleChange} required />
        
      <label htmlFor="street">Street:</label>
      <input type="text" id="street" name="street" value={selectedUser?.street} onChange={handleChange} required />
        
      <label htmlFor="hasPaidDues">Has paid dues:</label>
      <input type="checkbox" id="hasPaidDues" name="hasPaidDues" checked={selectedUser?.hasPaidDues} onChange={handleHasPaidDuesChange} />
        
      <label htmlFor="isAdmin">Is Admin:</label>
      <input type="checkbox" id="isAdmin" name="isAdmin" checked={selectedUser?.isAdmin} onChange={handleIsAdminChange} />
        
      <label htmlFor="categoryName">Category:</label>
      <ComboBox options={categoryNames} currentValue={selectedUser?.categoryName} onChange={handleCategoryChange}/>
      
      <input type="submit" value="Update" />
    </form>
    </div>
  </Dialog>
  );
}
