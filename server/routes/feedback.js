const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const feedback = new Feedback({ userId, message });
    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

module.exports = router;
