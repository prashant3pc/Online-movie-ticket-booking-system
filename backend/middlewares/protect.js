import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    req.status(400).json({
      succes: false,
      message: "Failed",
    });
  }
  const parts = header.split(" ");
  const token = parts[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});
