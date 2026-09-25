import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
export const createTheatreValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter the name of Theatre")
    .isLength({ min: 2 })
    .withMessage("Please enter at least 2 characters"),
  body("city")
    .notEmpty()
    .withMessage("Please enter the name of City")
    .isLength({ min: 2 })
    .withMessage("Please enter at least 2 characters"),
];

export const updateTheatreValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter the name of Theatre")
    .isLength({ min: 2 })
    .withMessage("Please enter at least 2 characters"),
  body("city")
    .notEmpty()
    .withMessage("Please enter the name of City")
    .isLength({ min: 2 })
    .withMessage("Please enter at least 2 characters"),
];

const validate = asyncHandler(async (req, res, next) => {
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

export default validate;
