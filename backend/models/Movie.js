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
    director: {
      type: String,
      required: true,
    },
    genres: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
