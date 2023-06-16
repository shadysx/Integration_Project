import React, { useContext, useState } from 'react';
import './LoginView.css'; // Import the CSS file
import { AuthContext } from '../../contexts/AuthContext';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const LoginView = () => {
  const [email, setEmail] = useState('shady@email.com');
  const [password, setPassword] = useState('password');

  const { login } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // Prevent refresh
    event.preventDefault();
    console.log(email, password)
    login(email, password);    

    // Perform login logic here, such as sending the username and password to a server

    // Reset the form fields
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='container'>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
