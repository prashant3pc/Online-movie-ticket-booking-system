import asyncHandler from "express-async-handler";
import Seat from "../models/Seat.js";
import Screen from "../models/Screen.js";
export const createSeat = asyncHandler(async (req, res) => {
  const { category, price, seatNumber, screen } = req.body;
  const existingScreen = await Screen.findById(screen).populate("theatre");
  if (!existingScreen) {
    return res.status(400).json({
      success: false,
      message: "screen doesnt exist",
    });
  }

  if (existingScreen.theatre.owner.toString() === req.user.id) {
    const newSeat = await Seat.create({
      category,
      price,
      seatNumber,
      screen,
    });
    return res.status(201).json({
      success: true,
      message: "Seat created successfully",
      data: newSeat,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "owner id doesnt match",
    });
  }
});

export const getSeats = asyncHandler(async (req, res) => {
  const seat = await Seat.find();
  return res.status(200).json({
    success: true,
    message: "All screens are here",
    data: seat,
  });
});

export const getOneSeat = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const seat = await Seat.findById(id);
  if (!seat) {
    return res.status(404).json({
      success: false,
      message: "Seat cant be found",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Your one seat is here",
      data: seat,
    });
  }
});

export const updateSeat = asyncHandler(async (req, res) => {
  const { category, price, seatNumber } = req.body;
  const id = req.params.id;
  const seat = await Seat.findById(id).populate({
    path: "screen",
    populate: { path: "theatre" },
  });
  if (!seat) {
    return res.status(404).json({
      success: false,
      message: "Seat cant be found",
    });
  }

  if (seat.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "Owner id not matched",
    });
  }
  const updatedSeat = await Seat.findByIdAndUpdate(
    id,
    { category, price, seatNumber },
    { new: true },
  );
  return res.status(200).json({
    success: true,
    message: "Your seat has been updated",
    data: updatedSeat,
  });
});

export const deleteSeat = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const seat = await Seat.findById(id).populate({
    path: "screen",
    populate: { path: "theatre" },
  });
  if (!seat) {
    return res.status(404).json({
      success: false,
      message: "Seat cant be found",
    });
  }
  if (seat.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "Owner id not matched",
    });
  }
  const deletedSeat = await Seat.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Your seat has been deleted",
    data: deletedSeat,
  });
});
