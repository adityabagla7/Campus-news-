import express from 'express';
import { deleteUser, followUser, getUser, getUserFollowers, getUserFollowing, unfollowUser, updateUser } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get user by ID
router.get('/:id', getUser);

// Update user
router.put('/:id', verifyToken, updateUser);

// Delete user
router.delete('/:id', verifyToken, deleteUser);

// Get user followers
router.get('/:id/followers', getUserFollowers);

// Get user following
router.get('/:id/following', getUserFollowing);

// Follow user
router.put('/:id/follow', verifyToken, followUser);

// Unfollow user
router.put('/:id/unfollow', verifyToken, unfollowUser);

export default router;