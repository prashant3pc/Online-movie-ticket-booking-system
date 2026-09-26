import express from "express";
import { protect } from "../middlewares/protect.js";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getOneMovie,
  updateMovie,
} from "../controllers/movieController.js";
import {
  createMovieValidation,
  updateMovieValidation,
} from "../validations/movieValidation.js";
import { adminOrTheatreManager } from "../middlewares/adminOrTheatreManager.js";

const router = express.Router();

router.post(
  "/api/movies",
  protect,
  adminOrTheatreManager,
  createMovieValidation,
  createMovie,
);
router.get("/api/movies", protect, getMovie);
router.get("/api/movies/:id", protect, getOneMovie);
router.put(
  "/api/movies/:id",
  protect,
  adminOrTheatreManager,
  updateMovieValidation,
  updateMovie,
);
router.delete("/api/movies/:id", protect, adminOrTheatreManager, deleteMovie);

export default router;
