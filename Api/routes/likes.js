import express from "express";
const router = express.Router()
import { getLikes } from "../controllers/like.js";
router.get("/", getLikes)

export default router