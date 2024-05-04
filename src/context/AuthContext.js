import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // On component mount, check if the user's auth information is stored in local storage
    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('userRole');

    if (storedToken && storedUsername && storedRole) {
      login(storedUsername, storedToken, storedRole);
    }
  }, []);

  const login = (username, token, role) => {
    setIsLoggedIn(true);
    setUsername(username);
    setAuthToken(token);
    setUserRole(role);
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setAuthToken('');
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, authToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}