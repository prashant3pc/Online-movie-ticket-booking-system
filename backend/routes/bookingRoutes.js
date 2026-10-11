import express from "express";
import { protect } from "../middlewares/protect.js";
import {
  createBookingValidation,
  validate,
} from "../validations/bookingValidation.js";
import {
  createBooking,
  deleteBooking,
  getBookings,
  getOneBooking,
  updateBooking,
  cancelBooking,
} from "../controllers/bookingController.js";
import { adminOrTheatreManager } from "../middlewares/adminOrTheatreManager.js";
import { adminOnly } from "../middlewares/adminOnly.js";
const router = express.Router();

router.post(
  "/api/bookings",
  protect,
  createBookingValidation,
  validate,
  createBooking,
);
router.post("/api/bookings/:id/cancel", protect, cancelBooking);
router.get("/api/bookings", protect, adminOnly, getBookings);
router.get("/api/bookings/:id", protect, getOneBooking);
router.put(
  "/api/bookings/:id",
  protect,
  adminOrTheatreManager,
  validate,
  updateBooking,
);
router.delete(
  "/api/bookings/:id",
  protect,
  adminOrTheatreManager,
  deleteBooking,
);

export default router;
