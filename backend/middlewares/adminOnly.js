import asyncHandler from "express-async-handler";

export const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access Forbidden",
    });
  }
  next();
});
