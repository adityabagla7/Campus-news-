import express from "express";
import { addLike, deleteLike, getLikes } from "../controllers/like.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get likes for an item (post or comment)
router.get("/:itemType/:itemId", getLikes);

// Add a like to an item
router.post("/:itemType/:itemId", verifyToken, addLike);

// Remove a like from an item
router.delete("/:itemType/:itemId", verifyToken, deleteLike);

export default router;