import express from "express";
import {
  createSeat,
  deleteSeat,
  getOneSeat,
  getSeats,
  updateSeat,
} from "../controllers/seatController.js";
import { adminOrTheatreManager } from "../middlewares/adminOrTheatreManager.js";
import {
  createSeatValidation,
  updateSeatValidation,
  validate,
} from "../validations/seatValidation.js";
import { protect } from "../middlewares/protect.js";
const router = express.Router();

router.post(
  "/api/seats",
  protect,
  adminOrTheatreManager,
  createSeatValidation,
  validate,
  createSeat,
);
router.get("/api/seats", protect, getSeats);
router.get("/api/seats/:id", protect, adminOrTheatreManager, getOneSeat);
router.put(
  "/api/seats/:id",
  protect,
  adminOrTheatreManager,
  updateSeatValidation,
  validate,
  updateSeat,
);
router.delete("/api/seats/:id", protect, adminOrTheatreManager, deleteSeat);

export default router;
