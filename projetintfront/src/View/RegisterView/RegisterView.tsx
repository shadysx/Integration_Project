import React, { useContext, useState } from 'react';
import './RegisterView.css'; // Import the CSS file
import { AuthContext } from '../../contexts/AuthContext';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { User } from '../../Interfaces/Interface';
import { UserService } from '../../services/UserService';
import ComboBox from '../../components/ComboBox';
import { CategoriesService } from '../../services/CategoriesService';
import { Helper } from '../../Helpers/Helper';

const RegisterView = () => {
  const [email, setEmail] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('password');

  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    lastName: 'Laurent',
    firstName: 'Klein',
    dateOfBirth: '1996-06-16',
    email: 'john.doe@email.com',
    gender: 'M',
    locality: 'Verviers',
    mobile: '0498843317',
    postalCode: '4800',
    street: 'Rue Raymond',
    password: 'password',
    affiliationNumber: '',
    isAdmin: false,
    ranking: "Beginner",
    hasPaidDues: false,
    status: "Active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const [categoryNames, setCategoryNames] = useState([]);

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

  const handleCategoryChange = async (categoryName: string) => {
    const categoryId = await Helper.ConvertCategoryNameToId(categoryName)
    console.log('Category Name: ', categoryName, ' CategoryID: ', categoryId)
    setFormData((prevUser) => {
      return {
        ...prevUser,
        categoryId: [categoryId] // Update the categories with the new categoryId
      };
    });
  }

  const generateAffiliationNumber = async (): Promise<string> => {
    const userService = new UserService()
    const users = await userService.FetchUsers()

    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0) + 1 ;

    const formattedId = maxId.toString().padStart(5, '0');

    return "23" + formattedId;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    if(formData.password != confirmationPassword){
      alert("Passwords dont match")
      return
    }
    
    const affiliationNumber = await generateAffiliationNumber()

    formData.affiliationNumber = affiliationNumber;
    console.log(formData);
    let isSuccess = await register(formData);

    if(!isSuccess){
      alert('Email already in use')
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="birthday">Birthday:</label>
        <input type="date" id="birthday" name="birthday" value={formData.dateOfBirth} onChange={handleChange} required /><br /><br />
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select><br /><br />
        <br />
        <label>
          Locality:
          <input type="text" name="locality" value={formData.locality} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mobile:
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
        </label>
        <br />
        <label>
          Postal Code:
          <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
        </label>
        <br />
        <label>
          Street:
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Password confirmation:
          <input type="password" name="passwordConfirmation" value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} />
        </label>
        <br />

        <label htmlFor="categoryName">Categorie:</label>
        <ComboBox options={categoryNames} currentValue={formData?.categoryName} onChange={handleCategoryChange}/>
        <button type="submit">Register</button>
        <h5 style={{cursor: "pointer"}} onClick={() => navigate('/')}>Already have an account?</h5>
      </form>
    </div>
  );
};

export default RegisterView;
