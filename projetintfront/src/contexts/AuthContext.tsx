import React, { createContext, useEffect, useState } from 'react';
import { Alert, User } from '../Interfaces/Interface';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/UserService';
import AlertPopup from '../components/ErrorPopup/AlertPopup';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

type AuthContextType = {
  login: any,
  logout: any,
  register: any,
  isAuthenticated: boolean,
  isLoading: boolean,
  token: string,
  user: User,
  setAlert: (alert: Alert) => void 
  setIsLoading: (value: boolean) => void
}

export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert>({open: false, description: '', type: ''});
  
  const navigate = useNavigate();


  const login = async (affiliationNumber: string, password: string) => {
  
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ affiliationNumber, password })
    });
  
    if (response.ok) {
      setIsLoading(true); // Set loading to true before making the API request
      const data = await response.json();
  
      setToken(data.token);
      setUser(data.user);

      setTimeout(() => {
        setAlert({ open: true, description: data.message, type: "success" });
        setIsAuthenticated(true);
        setIsLoading(false); // Set loading to false after API request is complete
        navigate('/');
      }, 700);
    } else {
      const data = await response.json();
      setAlert({ open: true, description: data.message, type: "error" });
    }
  
  };
  

  const register = async (user: User) : Promise<boolean> => {
    const response = await fetch("http://localhost:8000/api/auth/register", 
    {method: 'POST', 
    headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })     
    if(response.ok)
    {
      setTimeout(() => {
        login(user.affiliationNumber, user.password)
      }, 700)
      setAlert({open: true, description: 'Successfull registration!', type: "success"})
      return true
    }  
    else {
      let res = await response.json();
      let firstError = res.errors[Object.keys(res.errors)[0]]
      setAlert({open: true, description: firstError, type: "error"})
    }
  }

  const logout = () => {    
    setIsLoading(true); // Set loading to true before making the API request
    setTimeout(() => {
      navigate("/")
      setIsAuthenticated(false);
      setIsLoading(false); // Set loading to false after API request is complete
    }, 800)

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token, isLoading, setIsLoading, register, setAlert}}>    
    {isLoading && 
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    }  
    {children}
    {alert.open && (
      <AlertPopup error={alert.description} type={alert.type} onClose={() => setAlert(prevAlert => ({ ...prevAlert, open: false }))} />
    )}
  </AuthContext.Provider>
  );
};

