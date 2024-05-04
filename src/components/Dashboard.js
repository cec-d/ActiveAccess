// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css'; // Import CSS file

const Dashboard = () => {
  const { authToken, username, userRole } = useAuth(); // Assume userRole is available
  const isAdmin = userRole === 'admin'; // Check if the user is an admin
  const [bookedClasses, setBookedClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classDetails, setClassDetails] = useState({});
  const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);

  useEffect(() => {
    const fetchBookedClasses = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch booked classes');
        }
        const data = await response.json();
        setBookedClasses(data.bookedClasses);

        const classDetailsPromises = data.bookedClasses.map(classId =>
          fetch(`http://localhost:5000/api/classes/${classId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`, // Include the JWT token
            },
          }).then(res => res.json())
        );
        const classDetailsArray = await Promise.all(classDetailsPromises);

        const detailsObject = classDetailsArray.reduce((acc, classData, index) => {
          acc[data.bookedClasses[index]] = classData;
          return acc;
        }, {});
        setClassDetails(detailsObject); // Update state with detailed class info

      } catch (error) {
        console.error('Error fetching booked classes or details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!isAdmin) {
      fetchBookedClasses(); // Regular users only fetch their booked classes
    }
  }, [isAdmin, authToken]);

  const handleRemoveClass = async (classId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove class');
      }
      const data = await response.json();
      setBookedClasses(data.bookedClasses);
    } catch (error) {
      console.error('Error removing class:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Welcome to the Dashboard, {formattedUsername}!</h1>
        {isAdmin && (
          <>
            <h2>Admin Options</h2>
            <button>
              <Link to="/admin/ClassForm">Add New Class</Link>
            </button>
            <button>
              <Link to="/admin/ClassList">Manage Classes</Link>
            </button>
          </>
        )}
        {!isAdmin && (
          <>
            <h2>Booked Classes</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="booked-classes-list">
                {[...new Set(bookedClasses)].map((classId) => (
                  <li key={classId} className="booked-class-item">
                    <h2>{classDetails[classId] ? classDetails[classId].title : 'Loading...'}</h2>
                    <p><strong>Instructor:</strong> {classDetails[classId] ? classDetails[classId].instructor : 'Loading...'}</p>
                    <p><strong>Schedule:</strong> {classDetails[classId] ? classDetails[classId].schedule : 'Loading...'}</p>
                    <button className="button-remove" onClick={() => handleRemoveClass(classId)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
