import {
  createTheatre,
  deleteTheatre,
  updateTheatre,
  getOneTheatre,
  getTheatres,
} from "../controllers/theatreController.js";
import { protect } from "../middlewares/protect.js";
import { createTheatreValidation } from "../validations/theatreValidation.js";
import express from "express";
const router = express.Router();

router.post("/api/theatre", protect, createTheatreValidation, createTheatre);

router.get("/api/theatre", protect, getTheatres);
router.get("/api/theatre/:id", protect, getOneTheatre);

router.put("/api/theatre/:id", protect, createTheatreValidation, updateTheatre);

router.delete("/api/theatre/:id", protect, deleteTheatre);

export default router;
