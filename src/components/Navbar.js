import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const { isLoggedIn, username, logout } = useAuth();
  const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); // Call logout function
    navigate('/'); // Redirect to the homepage after logging out
  };

  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {isLoggedIn ? (
          <li style={{ display: 'inline', marginRight: 10 }}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        ) : (
          <li style={{ display: 'inline', marginRight: 10 }}>
            <Link to="/">Home</Link>
          </li>
        )}
        <li style={{ display: 'inline', marginRight: 10 }}>
          <Link to="/classes">Classes</Link>
        </li>
        <li style={{ display: 'inline' }}>
          {isLoggedIn ? (
            <>
              <span>Welcome, {formattedUsername}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;