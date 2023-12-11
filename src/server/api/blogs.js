const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    res.status(201).json({ message: 'Blog post created' });
});

module.exports = router;