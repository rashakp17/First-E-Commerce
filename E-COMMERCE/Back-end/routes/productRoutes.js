// routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const auth = require('../Middleware/auth');
const adminOnly = require('../Middleware/adminOnly');
const multer = require('multer');
const path = require('path');

const router = express.Router();

/* ---------- Multer config for this router ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // uploads folder is created & served in main server file
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

/* ---------- Image upload route (separate) ---------- */
// POST /api/products/uploadimage
router.post('/uploadimage', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  return res.status(201).json({
    message: 'product image uploaded',
    imageUrl,
  });
});

/* ---------- Create product (admin only) ---------- */
// POST /api/products
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Error creating product', error: err.message });
  }
});

/* ---------- Get all products ---------- */
// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error fetching products', error: err.message });
  }
});

/* ---------- Get one product ---------- */
// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Invalid product id', error: err.message });
  }
});

/* ---------- Update product (admin only) ---------- */
// PUT /api/products/:id
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Error updating product', error: err.message });
  }
});

/* ---------- Delete product (admin only) ---------- */
// DELETE /api/products/:id
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    return res.json({ message: 'Product deleted' });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Error deleting product', error: err.message });
  }
});

module.exports = router;
