import React, { createContext, useState } from 'react';
import { User } from '../Interfaces/Interface';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/UserService';

type AuthContextType = {
  login: any,
  logout: any,
  register: any,
  isAuthenticated: boolean,
  isLoading: boolean,
  token: string,
  user: User,
  error: string
}

export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  
  const navigate = useNavigate();
  let userService = new UserService();

  const checkIfEmailExist = async (email): Promise<boolean> => {
    const users = await userService.FetchUsers();

    const emailExists = users.some(user => user.email === email);

    return emailExists;
  }

  const login = async (email: string, password: string) => {   
    const response = await fetch("http://localhost:8000/api/auth/login", 
      {method: 'POST', 
      headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })    

    if(response.ok)
    {
      const data = await response.json()
      setToken(data.token);      
      setUser(data.user);      
      setIsAuthenticated(true);
      navigate('/')
    }    

  };

  const register = async (user: User) => {
    if (await checkIfEmailExist(user.email)){
      console.log('email already exist')
      return false;
    }
    console.log('first')
    const response = await fetch("http://localhost:8000/api/auth/register", 
    {method: 'POST', 
    headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })     
    if(response.ok)
    {
      setTimeout(() => {
        login(user.email, user.password)
      }, 1000)
      console.log("Created success")
      return true
    }  
  }

  const logout = () => {
    // Perform logout logic, e.g., clear authentication token
    navigate("/")
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token, error, isLoading, register}}>
      {children}
    </AuthContext.Provider>
  );
};