const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../db/queries');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ data: users });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body;
        const result = await createUser(username, email);
        res.status(201).json({ message: 'User created', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const { username, email } = req.body;
        await updateUser(req.params.id, username, email);
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;