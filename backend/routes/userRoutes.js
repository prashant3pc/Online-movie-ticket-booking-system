import express from "express";
import {
  loginValidation,
  registerValidation,
} from "../validations/userValidation.js";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/api/users/register", registerValidation, registerUser);
router.post("/api/users/login", loginValidation, loginUser);

export default router;
