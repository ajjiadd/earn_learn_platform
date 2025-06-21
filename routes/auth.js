const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../config/db');

// Serve login/signup page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Handle signup
router.post('/signup', (req, res) => {
  const { name, email, phone, password } = req.body;
  const referral_code = Math.random().toString(36).substring(2, 8).toUpperCase(); // Simple random code

  const query = 'INSERT INTO users (name, email, phone, password, referral_code) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, phone, password, referral_code], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Signup failed' });
    }
    res.json({ message: 'Signup successful', redirect: '/auth/login' });
  });
});

// Handle login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Login failed' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', redirect: '/user/dashboard' });
  });
});

module.exports = router;