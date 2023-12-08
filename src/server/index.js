const express = require('express');
const cors = require('cors'); // If you're allowing cross-origin requests
const chirpsRouter = require('./api/chirps'); // Import your chirps routes

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS if needed
app.use(express.json()); // Parse JSON bodies

// Static files middleware (if you're serving any static files from express)
app.use(express.static('path/to/public'));

// Routes setup
app.use('/api/chirps', chirpsRouter); // Use chirps routes for path /api/chirps

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server start
const PORT = process.env.PORT || 3000; // Port from environment or default to 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});