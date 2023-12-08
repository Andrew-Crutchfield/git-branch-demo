const express = require('express');
const router = express.Router();
const { getAllChirps, getChirpById, createChirp } = require('../db/queries');

router.get('/', async (req, res) => {
    // ...
});

router.get('/:id', async (req, res) => {
    // ...
});

router.post('/', async (req, res) => {
    try {
        const { userId, text, location } = req.body;
        
        const result = await createChirp(userId, text, location);
        
        res.status(201).json({ message: 'Chirp created', chirpId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router; 