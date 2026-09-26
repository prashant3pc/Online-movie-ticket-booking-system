import express from "express";
import {
  createScreenValidation,
  updateScreenValidation,
} from "../validations/screenValidation.js";
import {
  createScreen,
  deleteScreen,
  getScreens,
  getOneScreen,
  updateScreen,
} from "../controllers/screenController.js";
import { protect } from "../middlewares/protect.js";
import { adminOrTheatreManager } from "../middlewares/adminOrTheatreManager.js";
const router = express.Router();

router.post(
  "/api/screen",
  protect,
  adminOrTheatreManager,
  createScreenValidation,
  createScreen,
);
router.get("/api/screen", protect, getScreens);
router.get("/api/screen/:id", protect, getOneScreen);
router.put(
  "/api/screen/:id",
  protect,
  adminOrTheatreManager,
  updateScreenValidation,
  updateScreen,
);
router.delete("/api/screen/:id", protect, adminOrTheatreManager, deleteScreen);

export default router;
