import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter a name")
    .isLength({ min: 2 })
    .withMessage("Please enter your name at least 2 character"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .notEmpty()
    .withMessage("Please enter your email"),
  body("password")
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 8 })
    .withMessage("Please enter your password at least 8 charatcers"),
];

export const loginValidation = [
  body("email")
    .notEmail()
    .withMessage("Please enter a valid email")
    .isEmpty()
    .withMessage("Please enter your email"),
  body("password")
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 8 })
    .withMessage("Please enter your password at least 8 charatcers"),
];

export const validate = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validatiopn failed",
      data: errors.array(),
    });
  }
  next();
});
