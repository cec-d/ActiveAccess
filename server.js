const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const classesRoutes = require('./routes/classesRoutes');
const bookingRoutes = require('./routes/bookings');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const jwt = require('jsonwebtoken'); 



const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from frontend origin
  credentials: true, // Allow credentials to be included
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/auth', authRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken && authToken.startsWith('Bearer ')) {
    const token = authToken.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, 'test1234');
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(401).json({ message: 'Authorization token missing or invalid' });
  }
});

app.get('/protected', (req, res) => {
  if (req.session.userId) {
    res.send('This is a protected route accessible only by logged-in users.');
  } else {
    res.status(401).send('Please log in to access this resource.');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out.');
    } else {
      res.send('Logout successful.');
    }
  });
});

app.get('/', (req, res) => {
  res.send('Fitness Class Booking App API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});