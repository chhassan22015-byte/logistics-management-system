const jwt = require('jsonwebtoken');
const db = require('../config/db');

// 1. Token Verify & User Fetch karne ka middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const [users] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [decoded.id]);
      
      if (users.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = users[0]; // Isme ab id, name, email, aur role sab mojood hoga
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// 2. Roles check karne ka middleware (Authorization)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Aapka role (${req.user ? req.user.role : 'unknown'}) is action ki ijazat nahi deta.` 
      });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };