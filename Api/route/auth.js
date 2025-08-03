import express from "express";
import { login, logout, register } from "../controllers/auth.js";

const router = express.Router();

// User login
router.post("/login", login);

// User registration
router.post("/register", register);

// User logout
router.post("/logout", logout);

export default router;