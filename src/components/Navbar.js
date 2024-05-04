// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './navbar.css'; // Import the CSS file

const Navbar = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function
    navigate('/'); // Redirect to the homepage after logging out
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {isLoggedIn ? (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        ) : (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        <li>
          <Link to="/classes">Classes</Link>
        </li>
      </ul>
      {isLoggedIn && (
        <div className="navbar-user">
          <span>Welcome, {formattedUsername}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
