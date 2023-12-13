const express = require('express');
const cors = require('cors');
const chirpsRouter = require('./api/chirpsRouter'); // Ensure this path is correct
const usersRouter = require('./api/usersRouter'); // Ensure this path is correct

const app = express();

// Apply middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Mount routers
app.use('/api/chirps', chirpsRouter);
app.use('/api/users', usersRouter);

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
