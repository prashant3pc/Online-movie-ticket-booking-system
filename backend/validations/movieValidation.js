import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

export const createMovieValidation = [
  body("title").notEmpty().withMessage("Please ente a title"),
  body("description")
    .notEmpty()
    .withMessage("Please ente a description")
    .isLength({ min: 3 })
    .withMessage("Please enter at least 3 characters"),
  body("duration").notEmpty().withMessage("Please enter a duration"),
  body("director").notEmpty().withMessage("Please ente a director name"),
  body("genres").notEmpty().withMessage("Please ente a genre"),
  body("language").notEmpty().withMessage("Please ente a language"),
  body("posterUrl").notEmpty().withMessage("Please ente a poster"),
  body("trailerUrl").notEmpty().withMessage("Please ente a trailer"),
];

export const updateMovieValidation = [
  body("title").notEmpty().withMessage("Please ente a title"),
  body("description")
    .notEmpty()
    .withMessage("Please ente a title")
    .isLength({ min: 3 })
    .withMessage("Please enter at least 3 characters"),
  body("duration").notEmpty().withMessage("Please enter a duration"),
  body("director").notEmpty().withMessage("Please ente a director name"),
  body("genres").notEmpty().withMessage("Please ente a genre"),
  body("language").notEmpty().withMessage("Please ente a language"),
  body("posterUrl").notEmpty().withMessage("Please ente a poster"),
  body("trailerUrl").notEmpty().withMessage("Please ente a trailer"),
];

export const validate = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error occured",
      data: errors.array(),
    });
  }
  next();
});
