require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/predict', require('./routes/predict'));

// Health & System status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Scheme Sathi AWD Unified Backend',
    timestamp: new Date().toISOString(),
    database: 'MongoDB Connected',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Scheme Sathi Server]: Running on http://localhost:${PORT}`);
});
