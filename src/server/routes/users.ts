import { Router } from 'express';
import Query from '../db/db'; 

const router = Router();

// Endpoint to get all users
router.get('/', async (req, res) => {
  try {
    const users = await Query(
      'SELECT id, handle, email, created_at FROM users'
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

export default router;