import asyncHandler from "express-async-handler";
import Screen from "../models/Screen.js";
export const createScreen = asyncHandler(async (req, res) => {
  const { name, soundType, theatre } = req.body;
  const newScreen = await Screen.create({ name, soundType, theatre });
  return res.status(201).json({
    success: true,
    message: "Screen created successfully",
    data: newScreen,
  });
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
  } else {
    return res.status(200).json({
      success: true,
      message: "Your one screen is here",
      data: screen,
    });
  }
});

export const updateScreen = asyncHandler(async (req, res) => {
  const { name, soundType } = req.body;
  const id = req.params.id;
  const screen = await Screen.findById(id);
  if (!screen) {
    return res.status(404).json({
      success: false,
      message: "Screen not found",
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
  const screen = await Screen.findById(id);
  if (!screen) {
    return res.status(404).json({
      success: false,
      message: "Screen not found",
    });
  }
  const deletedScreen = await Screen.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Your Screen deleted succeddfully",
    data: deletedScreen,
  });
});
