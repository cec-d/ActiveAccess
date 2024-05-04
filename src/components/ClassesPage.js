// ClassesPage.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import fetchClassesEndpoint from './fetchClassesEndpoint';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ClassesPage.css'; // Import CSS file

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
        setClasses(data); // Update state with fetched classes
        setFilteredClasses(data); // Initialize filtered classes with all classes
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []); // Fetch classes when the component mounts

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query); // Update searchQuery state as the user types

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
        navigate('/login'); // Redirect to login if not logged in
        return;
      }

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ classId })
      });
      console.log(classId);
      if (!response.ok) {
        throw new Error('Failed to book class');
      }

    } catch (error) {
      console.error('Error booking class:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="classes-container">
        <h1>Classes</h1>
        <input
          type="text"
          placeholder="Search classes..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-box"
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="class-list">
            {filteredClasses && filteredClasses.length > 0 ? (
              filteredClasses.map((classItem) => (
                <li key={classItem._id} className="class-item">
                  <h2>{classItem.title}</h2>
                  <p>{classItem.description}</p>
                  <p><strong>Instructor:</strong> {classItem.instructor}</p>
                  <p><strong>Schedule:</strong> {classItem.schedule}</p>
                  <button className="button-book" onClick={() => handleBookClass(classItem._id)}>Book Now</button>
                </li>
              ))
            ) : (
              <p>No classes found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
