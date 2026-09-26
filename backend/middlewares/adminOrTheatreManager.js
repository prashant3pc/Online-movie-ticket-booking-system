import asyncHandler from "express-async-handler";

export const adminOrTheatreManager = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "theatre-manager") {
    return res.status(403).json({
      scuusee: false,
      message: "Access Forbidden",
    });
  }
  next();
});
