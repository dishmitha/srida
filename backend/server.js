require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// Configure CORS: if FRONTEND_URL is set, allow only that origin in production.
const frontendUrl = process.env.FRONTEND_URL;
const corsOptions = frontendUrl ? { origin: frontendUrl, optionsSuccessStatus: 200 } : {};
app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));

app.get('/api/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
