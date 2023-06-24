import React, { useContext, useState } from 'react';
import './LoginView.css'; // Import the CSS file
import { AuthContext } from '../../contexts/AuthContext';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import AlertPopup from '../../components/ErrorPopup/AlertPopup';

const LoginView = () => {
  const [affiliationNumber, setAffiliationNumber] = useState('2300001');
  const [password, setPassword] = useState('password');


  const { login } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // Prevent refresh
    event.preventDefault();

    // Perform login logic here, such as sending the username and password to a server
    login(affiliationNumber, password)
    // Reset the form fields
    setAffiliationNumber('');
    setPassword('');

  };

  return (
    <>

      <form onSubmit={handleSubmit} className='container'>
          <div>
            <label htmlFor="email">Affiliation Number:</label>
            <input
              type="text"
              id="affiliationNumber"
              value={affiliationNumber}
              onChange={(event) => setAffiliationNumber(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        <button type="submit">Login</button>
        <h5 style={{cursor: "pointer"}} onClick={() => navigate('/register')}>Don't have an account yet?</h5>
      </form>
  </>
  );
};

export default LoginView;
