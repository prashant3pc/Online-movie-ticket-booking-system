import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
    },
    duration: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    genres: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    trailerUrl: {
      type: String,
    },
  },
  { timestamps: true },
);
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
