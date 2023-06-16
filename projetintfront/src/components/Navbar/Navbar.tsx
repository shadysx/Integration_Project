import React, { useContext } from 'react'

// MUI

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
const { logout} = useContext(AuthContext)
const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar style={{justifyContent: "space-between"}}>
        <div>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
            <MenuIcon />
            </IconButton>
            <Button 
                color="inherit"
                onClick={() => navigate("/")} 
                >Home</Button>
            <Button 
                color="inherit"
                onClick={() => navigate("/users")} 
                >Users</Button>
            <Button 
                color="inherit"
                onClick={() => navigate("/categories")} 
                >Categories</Button>
        </div>
        <Button 
            style={{}}
            color="inherit"
            onClick={() => logout()} 
            >Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar