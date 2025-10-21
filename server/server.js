const express = require('express');
const cors = require('cors');
require('dotenv').config();

const smoothiesRouter = require('./routes/smoothies.js');
const optionsRouter = require('./routes/options.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/smoothies', smoothiesRouter);
app.use('/api/options', optionsRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ message: '🥤 Smoothie Builder API is running!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});