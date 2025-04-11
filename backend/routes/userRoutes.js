import express from 'express';
import Users from '../model/Users.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Create Users (for seeding/pre-setup)
router.post('/seed', async (req, res) => {
    try {
      const users = req.body.users;
      const created = await Users.insertMany(users);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;