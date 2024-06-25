import express, { Request, Response } from 'express';
import userServices from '../services/userService';

const router = express.Router();

// GET /worko/user - Get all users
router.get('/worko/user', async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json(users);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /worko/user/:userId - Get user by ID
router.get('/worko/user/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await userServices.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /worko/user - Create a new user
router.post('/worko/user', async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    const newUser = await userServices.createUser(userData);
    res.status(201).json(newUser);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /worko/user/:userId - Update a user
router.put('/worko/user/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userData = req.body;
  userData.id = userId; // Ensure id is passed in the body for update
  try {
    const updatedUser = await userServices.updateUser(userData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /worko/user/:userId - Partially update a user
router.patch('/worko/user/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userData = req.body;
  try {
    const updatedUser = await userServices.partialUpdateUser(userId, userData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /worko/user/:userId - Soft delete a user
router.delete('/worko/user/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await userServices.softDeleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
