import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function HomeView() {
    const { user, logout } = useContext(AuthContext);
  return (
    <>
        <div>Welcome {user.email}</div>
    </>
     )
}

export default HomeView