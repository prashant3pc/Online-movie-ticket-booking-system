import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
export const createScreenValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter a screen name")
    .isLength({ min: 2 })
    .withMessage("Please enter at least 2 character"),
  body("soundType")
    .notEmpty()
    .withMessage("Please enter a sound type name")
    .isLength({ min: 2 })
    .withMessage("Please enter at least 2 character"),
];

export const updateScreenValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter a screen name")
    .isLength({ min: 2 })
    .withMessage("Please enter at least 2 character"),
  body("soundType")
    .notEmpty()
    .withMessage("Please enter a sound type name")
    .isLength({ min: 2 })
    .withMessage("Please enter at least 2 character"),
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
