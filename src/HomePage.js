import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="home-container">
      <Navbar />
      <div>
        <h1>Welcome to the ActiveAccess App</h1>
        {isLoggedIn ? (
          <p>Explore our classes and manage your schedule.</p>
        ) : (
          <p>Please log in or register to continue.</p>
        )}
        {!isLoggedIn && (
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;