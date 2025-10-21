const express = require('express');
const router = express.Router();
const {
    getAllBases,
    getAllFruits,
    getAllAddins,
    getAllBoosters
} = require('../controllers/options.js');

// GET all bases
router.get('/bases', getAllBases);

// GET all fruits
router.get('/fruits', getAllFruits);

// GET all add-ins
router.get('/addins', getAllAddins);

// GET all boosters
router.get('/boosters', getAllBoosters);

module.exports = router;