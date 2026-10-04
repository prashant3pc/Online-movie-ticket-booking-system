import asyncHandler from "express-async-handler";
import Show from "../models/Show.js";
import Screen from "../models/Screen.js";
export const createShow = asyncHandler(async (req, res) => {
  const { movie, screen, startTime, endTime } = req.body;
  // Find the Screen and its Theatre
  const existingScreen = await Screen.findById(screen).populate("theatre");
  if (!existingScreen) {
    return res.status(404).json({
      success: false,
      message: "Screen not found",
    });
  }
  // Check whether the logged-in user owns the Theatre
  if (existingScreen.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "Owner id not matched",
    });
  }
  const existingShow = await Show.findOne({
    screen: screen,
    startTime: { $lt: new Date(endTime) },
    endTime: { $gt: new Date(startTime) },
  });

  if (existingShow) {
    return res.status(400).json({
      success: false,
      message: "Another show is already scheduled on this screen at this time",
    });
  }

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
  //Find MY show.
  const show = await Show.findById(id).populate({
    path: "screen",
    populate: { path: "theatre" },
  });
  if (!show) {
    return res.status(404).json({
      success: false,
      message: "Show not found",
    });
  }
  //Find OTHER show that conflicts with MY show.
  const existingShow = await Show.findOne({
    _id: { $ne: id }, //"Find a show whose ID is NOT the ID of the show I'm currently updating."
    screen: show.screen,
    startTime: { $lt: new Date(endTime) },
    endTime: { $gt: new Date(startTime) },
  });

  if (existingShow) {
    return res.status(400).json({
      success: false,
      message: "Another show is already scheduled on this screen at this time",
    });
  }

  if (show.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "Owner id not matched",
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
  const show = await Show.findById(id).populate({
    path: "screen",
    populate: { path: "theatre" },
  });
  if (!show) {
    return res.status(404).json({
      success: false,
      message: "Show not found",
    });
  }

  if (show.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "Owner id not matched",
    });
  }
  const deletedShow = await Show.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Show has been deleted successfully",
    data: deletedShow,
  });
});
