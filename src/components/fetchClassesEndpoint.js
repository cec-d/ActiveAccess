const fetchClassesEndpoint = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/classes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch classes');
    }
    
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching classes:', error.message);
    throw error;
  }
};

export default fetchClassesEndpoint;