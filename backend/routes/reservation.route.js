import express from "express";
const router = express.Router();
import {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations
} from "../controllers/reservation.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

// Intern: book/cancel
router.post("/", authMiddleware, createReservation);
router.get("/my", authMiddleware, getMyReservations);
router.put("/:id/cancel", authMiddleware, cancelReservation);

// Admin: view all
router.get("/", authMiddleware, roleMiddleware("admin"), getAllReservations);

export default router;
