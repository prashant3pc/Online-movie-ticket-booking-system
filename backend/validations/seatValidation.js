import { body, validationResult } from "express-validator";
const createValidation = [
  body("category").notEmpty().withMessage("Please enter a category"),
  body("price").notEmpty().withMessage("Please enter a price"),
  body("seatNumber").notEmpty().withMessage("Please enter seat number"),
  body("screen").notEmpty().withMessage("Please select a screen"),
];

const updateValidation = [
  body("category").notEmpty().withMessage("Please enter a category"),
  body("price").notEmpty().withMessage("Please enter a price"),
  body("seatNumber").notEmpty().withMessage("Please enter seat number"),
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
