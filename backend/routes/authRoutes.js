const express = require('express');
const router = express.Router();
// Yahan googleLogin ko import list mein add kar diya hai
const { registerUser, loginUser, googleLogin } = require('../controllers/authController');

// Jab frontend se koi POST request aayegi /register par
router.post('/register', registerUser);

// Jab frontend se koi POST request aayegi /login par
router.post('/login', loginUser);

// NAYA ROUTE: Jab frontend Google token bhejega /google par
router.post('/google', googleLogin);

module.exports = router;