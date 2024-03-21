import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [authToken, setAuthToken] = useState('');

  const login = (username, token) => {
    setIsLoggedIn(true);
    console.log(username);
    setUsername(username);
    setAuthToken(token);
    console.log('Auth Token:', token);
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setAuthToken(''); // Clear username on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}