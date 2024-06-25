import { Request, Response } from 'express';
import userService from '../services/userService';
import { validateUser } from '../validators/userValidator';

// GET /worko/user - list users
export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// GET /worko/user/:userId - get user details
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// POST /worko/user - create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { error } = validateUser(userData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /worko/user/:userId - update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    userData.id = userId; // Ensure ID consistency
    const { error } = validateUser(userData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedUser = await userService.updateUser(userData);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /worko/user/:userId - update user (partial update)
export const partialUpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    userData.id = userId; // Ensure ID consistency
    const { error } = validateUser(userData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedUser = await userService.partialUpdateUser(userId, userData);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /worko/user/:userId - soft delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await userService.softDeleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};
