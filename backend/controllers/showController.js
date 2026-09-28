import asyncHandler from "express-async-handler";
import Show from "../models/Show.js";

export const createShow = asyncHandler(async (req, res) => {
  const { movie, screen, startTime, endTime } = req.body;
  const newShow = await Show.create({
    movie,
    screen,
    startTime,
    endTime,
  });
  return res.status(201).json({
    success: true,
    message: "Show created successfully",
    data: newShow,
  });
});

export const getShows = asyncHandler(async (req, res) => {
  const shows = await Show.find();
  return res.status(200).json({
    success: true,
    message: "All your shows are here",
    data: shows,
  });
});

export const getShow = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const show = await Show.findById(id);
  if (!show) {
    return res.status(404).json({
      success: false,
      message: "Show not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Your show is here",
    data: show,
  });
});

export const updateShow = asyncHandler(async (req, res) => {
  const { startTime, endTime } = req.body;
  const id = req.params.id;
  const show = await Show.findById(id);
  if (!show) {
    return res.status(404).json({
      success: false,
      message: "Show not found",
    });
  }
  const updatedShow = await Show.findByIdAndUpdate(
    id,
    { startTime, endTime },
    { new: true },
  );
  return res.status(200).json({
    success: true,
    message: "Show has been updated successfully",
    data: updatedShow,
  });
});

export const deleteShow = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const show = await Show.findById(id);
  if (!show) {
    return res.status(404).json({
      success: false,
      message: "Show not found",
    });
  }

  const deletedShow = await Show.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Show has been deleted successfully",
    data: deletedShow,
  });
});
