import asyncHandler from "express-async-handler";
import Theatre from "../models/Theatre.js";

export const createTheatre = asyncHandler(async (req, res) => {
  const { name, city } = req.body;
  const newTheatre = await Theatre.create({
    name,
    city,
  });
  return res.status(201).json({
    success: true,
    message: "Theatre created successfully",
    data: newTheatre,
  });
});

export const getTheatres = asyncHandler(async (req, res) => {
  const theatre = await Theatre.find();
  return res.status(200).json({
    success: true,
    message: "All your theatre is here",
    data: theatre,
  });
});

export const getOneTheatre = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const theatre = await Theatre.findById(id);
  if (!theatre) {
    return res.status(400).json({
      success: false,
      message: "Theatre not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Your theatre is here",
      data: theatre,
    });
  }
});

export const updateTheatre = asyncHandler(async (req, res) => {
  const { name, city } = req.body;
  const id = req.params.id;
  const theatre = await Theatre.findById(id);
  if (!theatre) {
    return res.status(400).json({
      success: false,
      message: "Theatre not found",
    });
  }
  const updatedTheatre = await Theatre.findByIdAndUpdate(
    id,
    { name, city },
    { new: true },
  );
  return res.status(200).json({
    success: true,
    message: "Theatre updated successfully",
    data: updatedTheatre,
  });
});

export const deleteTheatre = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const theatre = await Theatre.findById(id);
  if (!theatre) {
    return res.status(400).json({
      success: false,
      message: "Theatre not found",
    });
  }

  const deletedTheatre = await Theatre.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Theatre deleted successfully",
    data: deletedTheatre,
  });
});
