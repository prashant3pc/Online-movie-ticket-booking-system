import express from "express";
import {
  createShow,
  deleteShow,
  getShow,
  getShows,
  updateShow,
} from "../controllers/showController.js";
import {
  createShowValidation,
  updateShowValidation,
  validate,
} from "../validations/showValidation.js";
import { protect } from "../middlewares/protect.js";
import { adminOrTheatreManager } from "../middlewares/adminOrTheatreManager.js";
import { getShowSeatAvailability } from "../controllers/showController.js";
const router = express.Router();

router.post(
  "/api/shows",
  protect,
  adminOrTheatreManager,
  createShowValidation,
  validate,
  createShow,
);
router.get("/api/shows", protect, getShows);
router.get("/api/shows/:id", protect, getShow);
router.get("/api/shows/:id/seats", protect, getShowSeatAvailability);
router.put(
  "/api/shows/:id",
  protect,
  adminOrTheatreManager,
  updateShowValidation,
  validate,
  updateShow,
);
router.delete("/api/shows/:id", protect, adminOrTheatreManager, deleteShow);

export default router;
