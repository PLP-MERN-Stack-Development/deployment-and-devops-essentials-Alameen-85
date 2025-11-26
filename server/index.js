const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to MERN API' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Example API route (replace with your actual routes)
app.get('/api/data', (req, res) => {
    res.json({ data: 'This is sample data from your API' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});