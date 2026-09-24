import express from "express";
import protect from "../middlewares/protect.js";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getOneMovie,
  updateMovie,
} from "../controllers/movieController.js";

const router = express.Router();

router.post("/api/movies", protect, createMovie);
router.get("/api/movies", protect, getMovie);
router.get("/api/movies/:id", protect, getOneMovie);
router.put("/api/movies/:id", protect, updateMovie);
router.delete("/api/movies/:id", protect, deleteMovie);

export default router;
