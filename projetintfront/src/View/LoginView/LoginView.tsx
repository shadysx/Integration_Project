import React, { useState } from 'react';
import './LoginView.css'; // Import the CSS file

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    // Prevent refresh
    event.preventDefault();
    console.log(username, password)

    // Perform login logic here, such as sending the username and password to a server

    // Reset the form fields
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className='container'>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
    </form>
  );
};

export default LoginView;
