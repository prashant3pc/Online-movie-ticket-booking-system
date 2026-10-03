import asyncHandler from "express-async-handler";
import Screen from "../models/Screen.js";
import Theatre from "../models/Theatre.js";
export const createScreen = asyncHandler(async (req, res) => {
  const { name, soundType, theatre } = req.body;
  const existingTheatre = await Theatre.findById(theatre);
  if (!existingTheatre) {
    return res.status(404).json({
      success: false,
      message: "Theatre not found",
    });
  }
  if (existingTheatre.owner.toString() === req.user.id) {
    const newScreen = await Screen.create({
      name,
      soundType,
      theatre,
    });
    return res.status(201).json({
      success: true,
      message: "Screen created successfully",
      data: newScreen,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Access denied",
    });
  }
});

export const getScreens = asyncHandler(async (req, res) => {
  const screen = await Screen.find();
  return res.status(200).json({
    success: true,
    message: "All Screens are here",
    data: screen,
  });
});

export const getOneScreen = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const screen = await Screen.findById(id);
  if (!screen) {
    return res.status(404).json({
      success: false,
      message: "Screen not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Your one screen is here",
    data: screen,
  });
});

export const updateScreen = asyncHandler(async (req, res) => {
  const { name, soundType } = req.body;
  const id = req.params.id;
  const screen = await Screen.findById(id).populate("theatre");
  if (!screen) {
    return res.status(404).json({
      success: false,
      message: "Screen not found",
    });
  }
  if (screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "Access denied",
    });
  }
  const updatedScreen = await Screen.findByIdAndUpdate(
    id,
    { name, soundType },
    { new: true },
  );
  return res.status(200).json({
    success: true,
    message: "Your updated screen is here",
    data: updatedScreen,
  });
});

export const deleteScreen = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const screen = await Screen.findById(id).populate("theatre");
  if (!screen) {
    return res.status(404).json({
      success: false,
      message: "Screen not found",
    });
  }
  if (screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "Access denied",
    });
  }
  const deletedScreen = await Screen.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Your Screen deleted succeddfully",
    data: deletedScreen,
  });
});
