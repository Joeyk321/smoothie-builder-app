const pool = require('../config/database.js');

// Get all bases
const getAllBases = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM bases ORDER BY id');
        res.json(results.rows);
    } catch (error) {
        console.error('Error getting bases:', error);
        res.status(500).json({ error: 'Failed to fetch bases' });
    }
};

// Get all fruits
const getAllFruits = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM fruits ORDER BY id');
        res.json(results.rows);
    } catch (error) {
        console.error('Error getting fruits:', error);
        res.status(500).json({ error: 'Failed to fetch fruits' });
    }
};

// Get all add-ins
const getAllAddins = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM addins ORDER BY category, id');
        res.json(results.rows);
    } catch (error) {
        console.error('Error getting add-ins:', error);
        res.status(500).json({ error: 'Failed to fetch add-ins' });
    }
};

// Get all boosters
const getAllBoosters = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM boosters ORDER BY id');
        res.json(results.rows);
    } catch (error) {
        console.error('Error getting boosters:', error);
        res.status(500).json({ error: 'Failed to fetch boosters' });
    }
};

module.exports = {
    getAllBases,
    getAllFruits,
    getAllAddins,
    getAllBoosters
};