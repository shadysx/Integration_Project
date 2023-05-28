import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({name: "Laurent", age: 26})

  const login = () => {
    // Perform login logic, e.g., send request to authenticate user
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform logout logic, e.g., clear authentication token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  );
};