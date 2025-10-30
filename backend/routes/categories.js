const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const cats = await Category.find().sort('name');
    res.json(cats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/categories (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ msg: 'Category exists' });
    const cat = new Category({ name });
    await cat.save();
    res.json(cat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
