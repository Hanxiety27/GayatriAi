// backend/src/routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

// Prefix semua rute auth dengan /api/auth
router.use('/auth', authRoutes);

// Tambahkan rute lain di sini
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

module.exports = router;