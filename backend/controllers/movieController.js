import asyncHandler from "express-async-handler";
import Movie from "../models/Movie.js";

export const createMovie = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    duration,
    director,
    genres,
    language,
    posterUrl,
    trailerUrl,
  } = req.body;
  const newMovie = await Movie.create({
    title,
    description,
    duration,
    director,
    genres,
    language,
    posterUrl,
    trailerUrl,
  });
  return res.status(200).json({
    success: true,
    message: "Movie created successfully",
    data: newMovie,
  });
});

export const getMovie = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  return res.status(200).json({
    success: true,
    message: "All your movies are here",
    data: movies,
  });
});

export const getOneMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Your movie is here",
      data: movie,
    });
  }
});

export const updateMovie = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    duration,
    director,
    genres,
    language,
    posterUrl,
    trailerUrl,
  } = req.body;

  const id = req.params.id;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }
  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    {
      title,
      description,
      duration,
      director,
      genres,
      language,
      posterUrl,
      trailerUrl,
    },
    { new: true },
  );

  return res.status(200).json({
    success: true,
    message: "Your updated movie is here",
    data: updatedMovie,
  });
});

export const deleteMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }
  const deletedMovie = await Movie.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Movie deleted successfully",
    data: deletedMovie,
  });
});
