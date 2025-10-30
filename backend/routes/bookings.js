const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// POST /api/bookings (create booking)
router.post('/', auth, async (req, res) => {
  try {
    const { product } = req.body;
    const booking = new Booking({ product, buyer: req.user.id });
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/bookings/my
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ buyer: req.user.id }).populate('product');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
