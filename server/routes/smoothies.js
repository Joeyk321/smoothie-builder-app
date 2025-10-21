const express = require('express');
const router = express.Router();
const {
    getAllSmoothies,
    getSmoothieById,
    createSmoothie,
    updateSmoothie,
    deleteSmoothie
} = require('../controllers/smoothies.js');

// GET all smoothies
router.get('/', getAllSmoothies);

// GET single smoothie by ID
router.get('/:id', getSmoothieById);

// POST create new smoothie
router.post('/', createSmoothie);

// PUT update smoothie
router.put('/:id', updateSmoothie);

// DELETE smoothie
router.delete('/:id', deleteSmoothie);

module.exports = router;