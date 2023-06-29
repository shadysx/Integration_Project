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
import { Menu, MenuItem, Tab, Tabs } from '@mui/material';

function Navbar({ isAdmin }) {
const { logout, user} = useContext(AuthContext)
const navigate = useNavigate();

const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState('one');
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

  const handleHomeButton = () => {
    setValue("one");
    navigate("/");  
  }

  

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color={isAdmin ? "secondary" : 'primary'}>
      <Toolbar style={{justifyContent: "space-between"}}>
        <div>            
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >             
              <Tab sx={{width: '10%'}} value="one" label= "" disableTouchRipple disabled disableFocusRipple aria-disabled />

              <IconButton
                sx={{marginLeft: '-65px', mr: 2}}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"                
                onClick={handleHomeButton}                 
                >
                <HomeIcon />
              </IconButton>
              
                         
              <Tab value="two" label="Members" onClick={() => navigate("/users")} />
              <Tab value="three" label="Reservations" onClick={() => navigate("/reservations")} />
              <Tab value="four" label="Blocked Courts" onClick={() => navigate("/blockedCourts")} />
              {isAdmin && (                
                  <Tab value="five" label="Categories" onClick={() => navigate("/categories")} />                                 
              )}
              {isAdmin && (                
                  <Tab value="six" label="Courts" onClick={() => navigate("/courts")} />                               
              )}
            </Tabs>

            {/* <Button 
                  color="inherit"
                  onClick={() => navigate("/users")} 
                  >Members</Button>
            <Button 
                  color="inherit"
                  onClick={() => navigate("/reservations")} 
                  >Reservations</Button>
            <Button 
                  color="inherit"
                  onClick={() => navigate("/blockedCourts")} 
                  >Blocked Courts</Button> */}
            {/* {isAdmin == true && (
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
            )} */}

        </div>

        <div>          
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