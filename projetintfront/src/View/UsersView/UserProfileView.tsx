import * as React from 'react';
import { useState } from 'react';
import "./UserProfileView.css"
import { AuthContext } from '../../contexts/AuthContext';
import Button from '@mui/material/Button';
import KeyIcon from '@mui/icons-material/Key';
import { CategoriesService } from '../../services/CategoriesService';
import ComboBox from '../../components/ComboBox';
import { Helper } from '../../Helpers/Helper';
import { UserService } from '../../services/UserService';
import { User } from '../../Interfaces/Interface';
import { useNavigate } from 'react-router-dom';
import EditPasswordDialog from './EditPasswordDialog';

export default function UserProfileView() {
  // Accessing user, isLoading, setIsLoading, and setAlert from AuthContext
  const { user, isLoading, setIsLoading, setAlert } = React.useContext(AuthContext);
  
  // State for category names
  const [categoryNames, setCategoryNames] = useState([]);
  
  // State for opening and closing the edit password dialog
  const [openEdit, setOpenEdit] = React.useState(false);
  
  // State for current user details
  const [currentUser, setCurrentUser] = useState<User>({
    affiliationNumber: "",
    lastName: "",
    firstName: "",
    gender: "",
    ranking: "",
    dateOfBirth: "",
    mobile: "",
    email: "",
    status: "",
    street: "",
    postalCode: "",
    locality: "",
    password: "",
    categoryName: "",
    isAdmin: false,
    hasPaidDues: false
  });
  
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Fetch category names and populate the ComboBox options
      const categoriesService = new CategoriesService();
      const _categoryNames = await categoriesService.FetchCategories();
      let nameList = [];
      _categoryNames.map((category) => {
        nameList.push(category.name);
      });
      setCategoryNames(nameList);
      
      await FetchUser();
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
  
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  
  const FetchUser = async () => {
    const userService = new UserService();
    const u = await userService.FetchUsersById(user.id);
    setCurrentUser(u);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleCategoryChange = async (categoryName: string) => {
    const categoryId = await Helper.ConvertCategoryNameToId(categoryName);
    console.log('Category Name: ', categoryName, ' CategoryID: ', categoryId);
    setCurrentUser((prevUser) => {
      return {
        ...prevUser,
        categoryId: [categoryId] // Update the categories with the new categoryId
      };
    });
  };
  
  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      gender: selectedGender,
    }));
  };
  
  const handleHasPaidDuesChange = () => {
    setCurrentUser((prevState) => ({
      ...prevState,
      hasPaidDues: !prevState.hasPaidDues
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userService = new UserService();
    const { id, ...requestBody } = currentUser;
    console.log('Submitted: ', requestBody);
    
    setAlert({ open: true, type: 'success', description: 'Account Successfully Updated' });
    userService.UpdateUser(requestBody, id);
    navigate("/");
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="editUserForm">
          <div className="left">
            <div>
              <img src="assets/png1.png" alt="Avatar" />
            </div>
            <div className='divDescription'>
              <h3>{currentUser.firstName} {currentUser.lastName.toUpperCase()}</h3>
              <p>Affiliation Number: {currentUser.affiliationNumber}</p>
              <p>Category: {currentUser.categoryName}</p>
              <Button
                variant='contained'
                color={user.isAdmin ? "secondary" : 'primary'}
                onClick={handleOpenEdit}>
                <KeyIcon /> &#8205; &#8205; {"Change Password"}
              </Button>
            </div>
          </div>
          
          <div className="middle">
            <h2>Edit Profile</h2>
            
            <label htmlFor="dateOfBirth">Birthday:</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={currentUser?.dateOfBirth} onChange={handleChange} required /><br /><br />
            
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={currentUser?.email} onChange={handleChange} required /><br /><br />
            
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={currentUser?.gender} onChange={handleGenderChange} required>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select><br /><br />
            
            <label htmlFor="locality">Locality:</label>
            <input type="text" id="locality" name="locality" value={currentUser?.locality} onChange={handleChange} required /><br /><br />
            
            <label htmlFor="mobile">Mobile:</label>
            <input type="tel" id="mobile" name="mobile" value={currentUser?.mobile} onChange={handleChange} required /><br /><br />
            
            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" id="postalCode" name="postalCode" value={currentUser?.postalCode} onChange={handleChange} required /><br /><br />
            
            <label htmlFor="categoryName">Category:</label>
            <ComboBox options={categoryNames} currentValue={currentUser?.categoryName} onChange={handleCategoryChange} /><br /><br />
            
            <label htmlFor="street">Street:</label>
            <input type="text" id="street" name="street" value={currentUser?.street} onChange={handleChange} required /><br /><br />
            
            <Button type="submit" className={`buttonUpdate ${user.isAdmin ? 'secondary' : 'primary'}`} variant='contained'>Update</Button>
          </div>
        </div>
      </form>
      
      <EditPasswordDialog
        user={currentUser}
        open={openEdit}
        onClose={handleCloseEdit}
      />
    </>
  );
}
