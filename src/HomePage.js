import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
 // Import the Navbar component

const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        {isLoggedIn ? (
          <h1>Welcome to the ActiveAccess App</h1>
        ) : (
          <>
            <h1>Welcome to the Fitness Class Booking App</h1>
            <p>Please log in or register to continue.</p>
            <div>
              <a href="/login">Login</a>
              <span> | </span>
              <a href="/register">Register</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HomePage;