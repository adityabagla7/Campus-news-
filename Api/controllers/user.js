import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Remove sensitive information
    const { password, ...userInfo } = user._doc;
    
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own profile" });
    }
    
    // If password is being updated, hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    // Remove sensitive information
    const { password, ...userInfo } = updatedUser._doc;
    
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    // Check if user is deleting their own account
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own account" });
    }
    
    // Delete user
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user followers
export const getUserFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('followers', 'username profilePic');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user following
export const getUserFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('following', 'username profilePic');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Follow user
export const followUser = async (req, res) => {
  try {
    // Check if user is trying to follow themselves
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if already following
    if (currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ message: "You are already following this user" });
    }
    
    // Update both users
    await User.findByIdAndUpdate(req.params.id, { $push: { followers: req.user.id } });
    await User.findByIdAndUpdate(req.user.id, { $push: { following: req.params.id } });
    
    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unfollow user
export const unfollowUser = async (req, res) => {
  try {
    // Check if user is trying to unfollow themselves
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }
    
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    
    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if not following
    if (!currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ message: "You are not following this user" });
    }
    
    // Update both users
    await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user.id } });
    await User.findByIdAndUpdate(req.user.id, { $pull: { following: req.params.id } });
    
    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};