import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate, redirect, useNavigate } from 'react-router-dom';

function HomeView() {
    const { user, logout } = useContext(AuthContext);
       
    const navigate = useNavigate();

  return (
    <>
        <div>HomeView</div>
        <div>{user.lastName} {user.dateOfBirth.toLocaleString()}</div>
        <button onClick={logout}>Logout</button>
        <button onClick={() => navigate("/user")}>User</button>
    </>
     )
}

export default HomeView