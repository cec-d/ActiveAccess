// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const requireAdmin = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authToken.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT secret is in .env
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = requireAdmin;