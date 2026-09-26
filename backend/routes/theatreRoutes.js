import {
  createTheatre,
  deleteTheatre,
  updateTheatre,
  getOneTheatre,
  getTheatres,
} from "../controllers/theatreController.js";
import { protect } from "../middlewares/protect.js";
import {
  createTheatreValidation,
  updateTheatreValidation,
} from "../validations/theatreValidation.js";
import { adminOrTheatreManager } from "../middlewares/adminOrTheatreManager.js";
import express from "express";
const router = express.Router();

router.post(
  "/api/theatre",
  protect,
  adminOrTheatreManager,
  createTheatreValidation,
  createTheatre,
);

router.get("/api/theatre", protect, getTheatres);
router.get("/api/theatre/:id", protect, getOneTheatre);

router.put(
  "/api/theatre/:id",
  protect,
  adminOrTheatreManager,
  updateTheatreValidation,
  updateTheatre,
);

router.delete(
  "/api/theatre/:id",
  protect,
  adminOrTheatreManager,
  deleteTheatre,
);

export default router;
