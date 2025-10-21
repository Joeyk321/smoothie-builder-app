const pool = require('../config/database.js');

// Get all custom smoothies
const getAllSmoothies = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM custom_smoothies ORDER BY created_at DESC');
        res.json(results.rows);
    } catch (error) {
        console.error('Error getting smoothies:', error);
        res.status(500).json({ error: 'Failed to fetch smoothies' });
    }
};

// Get single smoothie by ID
const getSmoothieById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await pool.query('SELECT * FROM custom_smoothies WHERE id = $1', [id]);
        
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Smoothie not found' });
        }
        
        res.json(results.rows[0]);
    } catch (error) {
        console.error('Error getting smoothie:', error);
        res.status(500).json({ error: 'Failed to fetch smoothie' });
    }
};

// Create new smoothie
const createSmoothie = async (req, res) => {
    try {
        const { name, size, base_id, fruits, addins, booster_id, total_price } = req.body;
        
        // Validation
        if (!name || !size || !base_id || !total_price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const results = await pool.query(
            `INSERT INTO custom_smoothies (name, size, base_id, fruits, addins, booster_id, total_price)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, size, base_id, fruits, addins, booster_id, total_price]
        );
        
        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error('Error creating smoothie:', error);
        res.status(500).json({ error: 'Failed to create smoothie' });
    }
};

// Update smoothie
const updateSmoothie = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, size, base_id, fruits, addins, booster_id, total_price } = req.body;
        
        const results = await pool.query(
            `UPDATE custom_smoothies 
             SET name = $1, size = $2, base_id = $3, fruits = $4, addins = $5, booster_id = $6, total_price = $7
             WHERE id = $8 RETURNING *`,
            [name, size, base_id, fruits, addins, booster_id, total_price, id]
        );
        
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Smoothie not found' });
        }
        
        res.json(results.rows[0]);
    } catch (error) {
        console.error('Error updating smoothie:', error);
        res.status(500).json({ error: 'Failed to update smoothie' });
    }
};

// Delete smoothie
const deleteSmoothie = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await pool.query('DELETE FROM custom_smoothies WHERE id = $1 RETURNING *', [id]);
        
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Smoothie not found' });
        }
        
        res.json({ message: 'Smoothie deleted successfully' });
    } catch (error) {
        console.error('Error deleting smoothie:', error);
        res.status(500).json({ error: 'Failed to delete smoothie' });
    }
};

module.exports = {
    getAllSmoothies,
    getSmoothieById,
    createSmoothie,
    updateSmoothie,
    deleteSmoothie
};