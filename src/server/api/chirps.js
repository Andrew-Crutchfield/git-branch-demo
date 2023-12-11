const express = require('express');
const router = express.Router();
const { getAllChirps, getChirpById, createChirp } = require('../db/queries');

router.post('/', async (req, res) => {
    try {
        const { userId, text, location } = req.body;

        if (!userId || !text) {
            return res.status(400).json({ error: 'userId and text are required fields' });
        }

        const result = await createChirp(userId, text, location);

        res.status(201).json({ message: 'Chirp created', chirpId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const chirps = await getAllChirps();
        res.status(200).json({ data: chirps });
    } catch (error) {
        console.error('Error getting chirps:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const chirpId = req.params.id;

        const existingChirp = await getChirpById(chirpId);

        if (!existingChirp) {
            return res.status(404).json({ message: 'Chirp not found' });
        }

        await deleteChirp(chirpId);
        res.status(200).json({ message: 'Chirp deleted' });
    } catch (error) {
        console.error('Error deleting chirp:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
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