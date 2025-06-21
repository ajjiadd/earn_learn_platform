const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../config/db');

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

router.get('/videos', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/videos.html'));
});

router.post('/submit', (req, res) => {
  const { user_id, video_id, screenshot_urls } = req.body;
  const query = 'INSERT INTO submissions (user_id, video_id, screenshot_urls, status, reward_amount) SELECT ?, ?, ?, "pending", reward_amount FROM videos WHERE id = ?';
  db.query(query, [user_id, video_id, screenshot_urls, video_id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Submission failed' });
    }
    res.json({ message: 'Submission received' });
  });
});

module.exports = router;