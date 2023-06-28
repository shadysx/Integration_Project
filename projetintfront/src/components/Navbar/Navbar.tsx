import React, { useContext } from 'react'

// MUI

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';

function Navbar({ isAdmin }) {
const { logout, user} = useContext(AuthContext)
const navigate = useNavigate();

const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickEditProfile = () => {
    handleClose();
    navigate("/profile");    
       
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color={isAdmin ? "secondary" : 'primary'}>
      <Toolbar style={{justifyContent: "space-between"}}>
        <div>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2, mr: 1 }}
            onClick={() => navigate("/")} 
            >
            <HomeIcon />
            </IconButton>
            {/* <Button 
                color="inherit"
                onClick={() => navigate("/")} 
                >Home</Button> */}
            <Button 
                  color="inherit"
                  onClick={() => navigate("/users")} 
                  >Members</Button>
            <Button 
                  color="inherit"
                  onClick={() => navigate("/reservations")} 
                  >Reservations</Button>
            {isAdmin == true && (
            <>

              <Button 
                  color="inherit"
                  onClick={() => navigate("/categories")} 
                  >Categories</Button>
              <Button 
                  color="inherit"
                  onClick={() => navigate("/courts")} 
                  >Courts</Button>

            </>
            )}

        </div>

        <div>
          {/* <Button 
              style={{}}
              color="inherit"
              onClick={() => logout()} 
              >Logout</Button> */}
          <Button
              size="large"              
              color="inherit"                  
              sx={{ ml: 2, mr: 1 }}
              onClick={handleClick}
              >
              <AccountCircleIcon/>    
              <p> &nbsp; {user.firstName + " " + user.lastName}</p>          
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClickEditProfile} >Edit Profile </MenuItem>            
            <MenuItem onClick={() => logout()} >Logout</MenuItem>
          </Menu>
          
          
          <IconButton
              size="large"              
              color="inherit"                    
              onClick={() => logout()} 
              >
              <LogoutIcon />
          </IconButton>
        </div>

      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar