import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get comments for a post
router.get("/:postId", getComments);

// Add a comment to a post
router.post("/:postId", verifyToken, addComment);

// Delete a comment
router.delete("/:id", verifyToken, deleteComment);

export default router;