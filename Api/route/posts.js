import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get all posts (with optional filters)
router.get("/", getPosts);

// Get a single post
router.get("/:id", getPost);

// Create a new post
router.post("/", verifyToken, createPost);

// Update a post
router.put("/:id", verifyToken, updatePost);

// Delete a post
router.delete("/:id", verifyToken, deletePost);

export default router;