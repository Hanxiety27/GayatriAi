// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./server/src/routes'); // Import semua rute

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Sesuaikan dengan URL frontend Anda
  credentials: true  // Penting untuk mengizinkan cookies
}));

app.use(express.json());

// Gunakan semua rute dengan prefix /api
app.use('/api', routes);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});