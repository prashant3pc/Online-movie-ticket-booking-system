import express from "express";
import { protect } from "../middlewares/protect";
import {
  loginValidation,
  registerValidation,
} from "../validations/userValidation";
import { registerUser, loginUser } from "../controllers/userController";

const router = express.Router();

router.post("/api/users/register", registerValidation, registerUser);
router.post("/api/users/login", loginValidation, loginUser);
