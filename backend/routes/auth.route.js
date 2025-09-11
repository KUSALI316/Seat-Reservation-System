import express from "express";
const router = express.Router();
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get profile (protected)
router.get("/me", authMiddleware, getProfile);

export default router;   









