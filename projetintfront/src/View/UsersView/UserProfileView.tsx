import * as React from 'react';
import { useState } from 'react';
import "./UserProfileView.css"
import { AuthContext } from '../../contexts/AuthContext';
import Button from '@mui/material/Button';
import KeyIcon from '@mui/icons-material/Key';


export default function UserProfileView() {

  const { user } = React.useContext(AuthContext);
  const [ currentUser , setCurrentUser ] = useState(user)
  

  console.log(currentUser)
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (        
      <form action="/modifier" method="post">
        <div className="editUserForm">
          <div className="left">
            <div>
              <img src="assets/png1.png" alt="Avatar"/>
            </div>
            <div className='divDescription'>
              <h3>{currentUser.firstName} {currentUser.lastName.toUpperCase()}</h3>
              <p>Numéro d'affiliation : {currentUser.affiliationNumber}</p>
              <p>Classement : {currentUser.ranking}</p>
              <Button variant='contained'> <KeyIcon/> Modifier Mot de passe</Button>
            </div>
              
            </div>

            <div className="middle">
              <h2>Edit Profile</h2>
              
              <label htmlFor="dateOfBirth">Date de naissance :</label>
              <input type="date" id="dateOfBirth" name="dateOfBirth" required/><br/>

              <label htmlFor="email">Email :</label>
              <input type="email" id="email" name="email" required/><br/>

              <label htmlFor="gender">Genre :</label>
              <select id="gender" name="gender" required>
                <option value="male">Masculin</option>
                <option value="female">Féminin</option>
                <option value="other">Autre</option>
              </select>

              <label htmlFor="isAdmin">Est administrateur :</label>
              <input type="checkbox" id="isAdmin" name="isAdmin"/><br/>

              <label htmlFor="locality">Localité :</label>
              <input type="text" id="locality" name="locality" required/><br/>

              <label htmlFor="mobile">Numéro de téléphone mobile :</label>
              <input type="text" id="mobile" name="mobile" required/><br/>

              <label htmlFor="postalCode">Code postal :</label>
              <input type="text" id="postalCode" name="postalCode" required/><br/>

              <label htmlFor="ranking">Classement :</label>
              <input type="text" id="ranking" name="ranking" required/><br/>

              <label htmlFor="status">Statut :</label>
              <input type="text" id="status" name="status" required/><br/>

              <label htmlFor="street">Rue :</label>
              <input type="text" id="street" name="street" required/><br/>

              <label htmlFor="password">Mot de passe :</label>
              <input type="password" id="password" name="password" required/><br/>

              <label htmlFor="categories">Catégories :</label>
              <select id="categories" name="categoryId" multiple>
                {/* <!-- Remplacez les options par vos propres catégories --> */}
                <option value="1">Catégorie 1</option>
                <option value="2">Catégorie 2</option>
                <option value="3">Catégorie 3</option>
              </select>

              <label htmlFor="hasPaidDues">Cotisations payées :</label>
              <input type="checkbox" id="hasPaidDues" name="hasPaidDues"/><br/>

              <button type="submit">Enregistrer</button>    
          </div>    
        </div>
          

        
      </form>    
  );
}

