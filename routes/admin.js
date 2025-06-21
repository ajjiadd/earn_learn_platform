const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../config/db');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const { email } = req.body;
  db.query('SELECT role FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0 || results[0].role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  });
};

// Serve admin dashboard
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin_dashboard.html'));
});

// Add video
router.post('/video/add', isAdmin, (req, res) => {
  const { title, video_link, category, tags, video_type, reward_amount, time_limit } = req.body;
  const query = 'INSERT INTO videos (title, video_link, category, tags, video_type, reward_amount, time_limit) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [title, video_link, category, tags, video_type, reward_amount, time_limit], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to add video' });
    }
    res.json({ message: 'Video added successfully' });
  });
});

// Get all videos
router.get('/videos', (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch videos' });
    }
    res.json(results);
  });
});

module.exports = router;