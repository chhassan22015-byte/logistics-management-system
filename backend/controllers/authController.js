const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // <-- Naya Import (Google ki API call ke liye)

// Token mein id ke sath role bhi shamil kar diya hai taake authorization asaan ho
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Yeh email pehle se register hai' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate role or default to 'sender'
    const validRoles = ['admin', 'sender', 'receiver'];
    const assignedRole = validRoles.includes(role) ? role : 'sender';

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, assignedRole]
    );

    res.status(201).json({
      _id: result.insertId,
      name,
      email,
      role: assignedRole,
      token: generateToken(result.insertId, assignedRole),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Email ya Password galat hai' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ==========================================
// NAYA FUNCTION: Google Sign-In Controller
// ==========================================
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body; // Frontend se aane wala Google Token

    // 1. Google ke server se token verify kar ke user ka data lana
    const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const { email, name } = googleResponse.data;

    // 2. Check karna ke kya yeh email database mein pehle se hai?
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    let user = users[0];

    // 3. Agar user nahi hai, toh isay automatically register kar lein
    if (!user) {
      // Dummy password hash kar rahay hain taake DB ka asool poora ho (Google walay password nahi dete)
      const salt = await bcrypt.genSalt(10);
      const hashedDummyPassword = await bcrypt.hash('google-auth-dummy-password', salt);
      
      const [result] = await db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedDummyPassword, 'sender'] // Default role 'sender'
      );
      
      // Naya user object bana liya response bhejne ke liye
      user = { id: result.insertId, name: name, email: email, role: 'sender' };
    }

    // 4. User mil gaya ya naya ban gaya, ab usay Login karwa do (Token generate karein)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });

  } catch (error) {
    console.error("Google Login Backend Error:", error.message);
    res.status(500).json({ message: 'Google Authentication failed on server', error: error.message });
  }
};