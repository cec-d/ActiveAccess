import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import './ClassList.css';

const ClassList = () => {
  const { authToken } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/classes', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`, // Ensure token is included for authorization
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, [authToken]);

  const handleDelete = async (classId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/classes/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete class: ${errorMessage}`);
      }

      setClasses(prevClasses => prevClasses.filter(cl => cl._id !== classId));
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="class-list-container">
        <h2>Manage Classes</h2>
        {classes.length > 0 ? (
          classes.map(cl => (
            <div key={cl._id} className="class-item">
              <h3>{cl.title}</h3>
              <p><strong>Description:</strong> {cl.description}</p>
              <p><strong>Instructor:</strong> {cl.instructor}</p>
              <p><strong>Schedule:</strong> {cl.schedule}</p>
              <button className="button-delete" onClick={() => handleDelete(cl._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No classes found</p>
        )}
      </div>
    </div>
  );
};

export default ClassList;
