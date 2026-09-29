import { body, validationResult } from "express-validator";
export const createShowValidation = [
  body("movie").notEmpty().withMessage("Please select a movie"),
  body("screen").notEmpty().withMessage("Please select a screen"),
  body("startTime").notEmpty().withMessage("Please enter a start time"),
  body("endTime")
    .notEmpty()
    .withMessage("Please enter an end time")
    .custom((value, { req }) => {
      const startTime = new Date(req.body.startTime);
      const endTime = new Date(value);
      if (endTime <= startTime) {
        throw new Error("End time must be after the start time");
      }
      return true;
    }),
];

export const updateShowValidation = [
  body("startTime").notEmpty().withMessage("Please enter a start time"),
  body("endTime")
    .notEmpty()
    .withMessage("Please enter an end time")
    .custom((value, { req }) => {
      const startTime = new Date(req.body.startTime);
      const endTime = new Date(value);

      if (endTime <= startTime) {
        throw new Error("End time must be after the start time");
      }
      return true;
    }),
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
