import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const comments = await Comment.find({ postId })
      .populate('userId', 'username profilePic')
      .sort({ createdAt: -1 });
      
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    
    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Create new comment
    const newComment = new Comment({
      postId,
      userId: req.user.id, // Assuming user ID is set in auth middleware
      text
    });
    
    const savedComment = await newComment.save();
    
    // Increment comment count on post
    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });
    
    // Return populated comment
    const populatedComment = await Comment.findById(savedComment._id)
      .populate('userId', 'username profilePic');
      
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    // Check if user is the owner of the comment
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }
    
    // Delete comment
    await Comment.findByIdAndDelete(id);
    
    // Decrement comment count on post
    await Post.findByIdAndUpdate(comment.postId, { $inc: { comments: -1 } });
    
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};