import { body, validationResult } from "express-validator";

export const createBookingValidation = [
  body("show").notEmpty().withMessage("Please enter a show"),
  body("seats")
    .notEmpty()
    .isArray()
    .withMessage("Please enter seats as an array"),
  body("totalPrice").notEmpty().isNumeric().withMessage("Please enter a price"),
  body("totalSeats")
    .notEmpty()
    .isNumeric()
    .withMessage("Please enter a valid number of seats"),
];

export const updateBookingValidation = [
  body("totalPrice").notEmpty().withMessage("Please enter a price"),
  body("totalSeats").notEmpty().withMessage("Please enter a seats"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error occured",
      data: errors.array(),
    });
  }
  next();
};
