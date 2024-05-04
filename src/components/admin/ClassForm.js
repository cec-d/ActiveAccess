import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import './ClassForm.css';

const ClassForm = () => {
  const { authToken } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [schedule, setSchedule] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title,
          description,
          instructor,
          schedule,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add class');
      }

      setTitle('');
      setDescription('');
      setInstructor('');
      setSchedule('');
      setErrorMessage('');
      console.log('Class added successfully');

    } catch (error) {
      console.error('Error adding class:', error);
      setErrorMessage('Error adding class, please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Add a New Class</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Instructor"
            value={instructor}
            onChange={e => setInstructor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Schedule"
            value={schedule}
            onChange={e => setSchedule(e.target.value)}
          />
          <button type="submit">Add Class</button>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;
