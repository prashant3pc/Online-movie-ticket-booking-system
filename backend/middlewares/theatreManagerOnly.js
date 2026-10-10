import asyncHandler from "express-async-handler";

export const theatreManagerOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "theatre-manager") {
    return res.status(403).json({
      success: false,
      message: "Access Forbidden",
    });
  }
  next();
});
