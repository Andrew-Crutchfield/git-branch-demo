const express = require('express');
const cors = require('cors');
const chirpsRouter = require('./api/chirps');
const blogsRouter = require('./api/blogs');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chirps', chirpsRouter);
app.use('/api/blogs', blogsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        res.status(400).json({ error: 'Validation failed', message: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});