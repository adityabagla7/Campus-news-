import Like from '../models/Like.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const getLikes = async (req, res) => {
  try {
    const { itemId, itemType } = req.params;
    
    // Validate item type
    if (!['post', 'comment'].includes(itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }
    
    // Check if the item exists
    if (itemType === 'post') {
      const post = await Post.findById(itemId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
    } else if (itemType === 'comment') {
      const comment = await Comment.findById(itemId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
    }
    
    // Get likes for the item
    const likes = await Like.find({ itemId, itemType })
      .populate('userId', 'username profilePic');
      
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addLike = async (req, res) => {
  try {
    const { itemId, itemType } = req.params;
    const userId = req.user.id; // Assuming user ID is set in auth middleware
    
    // Validate item type
    if (!['post', 'comment'].includes(itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }
    
    // Check if the item exists
    if (itemType === 'post') {
      const post = await Post.findById(itemId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
    } else if (itemType === 'comment') {
      const comment = await Comment.findById(itemId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
    }
    
    // Check if the user already liked the item
    const existingLike = await Like.findOne({ userId, itemId, itemType });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this item" });
    }
    
    // Create new like
    const newLike = new Like({
      userId,
      itemId,
      itemType
    });
    
    const savedLike = await newLike.save();
    
    // If it's a post, update the likes array
    if (itemType === 'post') {
      await Post.findByIdAndUpdate(itemId, { $push: { likes: userId } });
    } else if (itemType === 'comment') {
      await Comment.findByIdAndUpdate(itemId, { $push: { likes: userId } });
    }
    
    // Return populated like
    const populatedLike = await Like.findById(savedLike._id)
      .populate('userId', 'username profilePic');
      
    res.status(201).json(populatedLike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const { itemId, itemType } = req.params;
    const userId = req.user.id; // Assuming user ID is set in auth middleware
    
    // Validate item type
    if (!['post', 'comment'].includes(itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }
    
    // Find the like
    const like = await Like.findOne({ userId, itemId, itemType });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }
    
    // Delete the like
    await Like.findByIdAndDelete(like._id);
    
    // If it's a post, update the likes array
    if (itemType === 'post') {
      await Post.findByIdAndUpdate(itemId, { $pull: { likes: userId } });
    } else if (itemType === 'comment') {
      await Comment.findByIdAndUpdate(itemId, { $pull: { likes: userId } });
    }
    
    res.status(200).json({ message: "Like deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};