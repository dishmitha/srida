const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const q = {};
    if (req.query.category) q.category = req.query.category;
    const products = await Product.find(q).populate('category vendor', 'name email');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/products (vendor only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const newP = new Product({ title, description, price, category, vendor: req.user.id });
    await newP.save();
    res.json(newP);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('category vendor', 'name email');
    if (!p) return res.status(404).json({ msg: 'Product not found' });
    res.json(p);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
