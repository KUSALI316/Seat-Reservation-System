import express from "express";
const router = express.Router();
import { createSeat, getSeats, updateSeat, deleteSeat } from "../controllers/seat.controller.js";
import authMiddleware from  "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

// Admin only
router.post("/", authMiddleware, roleMiddleware("admin"), createSeat);
router.get("/", authMiddleware, getSeats);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateSeat);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteSeat);

export default router;

