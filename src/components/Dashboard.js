import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { isLoggedIn, authToken, username } = useAuth();
  const [bookedClasses, setBookedClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classDetails, setClassDetails] = useState({});
  const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);

  useEffect(() => {
    const fetchBookedClasses = async () => {
        setLoading(true);
        try {
          // Fetch user's booked classes from the backend
          const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          });
          console.log('Response from Booking API:', response);
          if (!response.ok) {
            throw new Error('Failed to fetch booked classes');
          }
          const data = await response.json();
          console.log('booked classes data', data);
          setBookedClasses(data.bookedClasses);
        } catch (error) {
          console.error('Error fetching booked classes:', error);
          // Handle error
        } finally {
          setLoading(false);
        }
    };

    fetchBookedClasses();
  }, [authToken, username]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      setLoading(true);
      try {
        // Fetch details of each booked class
        const promises = bookedClasses.map(classId =>
          fetch(`http://localhost:5000/api/classes/${classId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`, // Include the JWT token
            },
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch class details');
            }
            return response.json();
          })
          .then(data => ({ [classId]: data })) // Store class details by classId
        );
        const classDetailsArray = await Promise.all(promises);
        const classDetailsObject = classDetailsArray.reduce((acc, obj) => ({ ...acc, ...obj }), {});
        setClassDetails(classDetailsObject);
      } catch (error) {
        console.error('Error fetching class details:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };
  
    fetchClassDetails();
  }, [bookedClasses, authToken]);

  const handleRemoveClass = async (classId) => {
    try {
      // Send a request to remove the class from the schedule
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
      console.log(data);
      setBookedClasses(data.bookedClasses);
    } catch (error) {
      console.error('Error removing class:', error);
      // Handle error
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>Welcome to the Dashboard, {formattedUsername}!</h1>
        <h2>Booked Classes</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {[...new Set(bookedClasses)].map((classId) => (
              <li key={classId}>
                <p>Class: {classDetails[classId] ? classDetails[classId].title : 'Loading...'}</p>
                <p>Instructor: {classDetails[classId] ? classDetails[classId].instructor : 'Loading...'}</p>
                <p>Schedule: {classDetails[classId] ? classDetails[classId].schedule : 'Loading...'}</p>
                <button onClick={() => handleRemoveClass(classId)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;