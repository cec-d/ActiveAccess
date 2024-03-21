import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import fetchClassesEndpoint from './fetchClassesEndpoint';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ClassesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const data = await fetchClassesEndpoint(); // Call the fetch function
        console.log('classes', data);
        setClasses(data); // Update state with fetched classes
        setFilteredClasses(data); // Initialize filtered classes with all classes
      } catch (error) {
        console.error('Error fetching classes:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []); // Fetch classes when component mounts

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query); // Update searchQuery state as user types

    // Filter classes based on search query (title or instructor)
    const filtered = classes.filter((classItem) =>
      classItem.title.toLowerCase().includes(query) || 
      classItem.instructor.toLowerCase().includes(query) ||
      classItem.schedule.toLowerCase().includes(query)
    );
    setFilteredClasses(filtered);
  };

  const handleBookClass = async (classId) => {
    try {
      if (!isLoggedIn) {
        // If the user is not logged in, redirect to the login screen
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ classId }), 
      });

      if (!response.ok) {
        throw new Error('Failed to book class');
      }

      console.log('Class booked successfully');
    } catch (error) {
      console.error('Error booking class:', error);
      // Handle error
    }
  };

  const currentTime = new Date();
  const upcomingClasses = classes.filter((classItem) => {
    const scheduleTime = new Date(classItem.schedule);
    return scheduleTime > currentTime && scheduleTime <= new Date(currentTime.getTime() + 30 * 60000);
  });

  return (
    <div>
      <Navbar />
      <div>
        <h1>Classes</h1>
        <input
          type="text"
          placeholder="Search classes..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {classes.map((classItem) => (
                <li key={classItem._id}>
                  <h2>{classItem.title}</h2>
                  <p>{classItem.description}</p>
                  <p><strong>Instructor:</strong> {classItem.instructor}</p>
                  <p><strong>Schedule:</strong> {classItem.schedule}</p>
                  <button onClick={() => handleBookClass(classItem._id)}>Book Now</button>
                </li>
              ))}
            </ul>
            {upcomingClasses.length > 0 && (
              <div>
                <h2>Classes Starting Soon</h2>
                <ul>
                  {upcomingClasses.map((classItem) => (
                    <li key={classItem._id}>
                      <h3>{classItem.title}</h3>
                      <p>{classItem.instructor}</p>
                      <p>{classItem.schedule}</p>
                      <button onClick={() => handleBookClass(classItem._id)}>Book Now</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};



export default ClassesPage;