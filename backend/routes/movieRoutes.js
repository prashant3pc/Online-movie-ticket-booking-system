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
import { adminOnly } from "../middlewares/adminOnly.js";
import { validate } from "../validations/movieValidation.js";

const router = express.Router();

router.post(
  "/api/movies",
  protect,
  adminOnly,
  createMovieValidation,
  validate,
  createMovie,
);
router.get("/api/movies", protect, getMovie);
router.get("/api/movies/:id", protect, getOneMovie);
router.put(
  "/api/movies/:id",
  protect,
  adminOnly,
  updateMovieValidation,
  validate,
  updateMovie,
);
router.delete("/api/movies/:id", protect, adminOnly, deleteMovie);

export default router;
