import asyncHandler from "express-async-handler";
import Seat from "../models/Seat.js";
export const createSeat = asyncHandler(async (req, res) => {
  const { category, price, seatNumber, screen } = req.body;
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
  const seat = await Seat.findById(id);
  if (!seat) {
    return res.status(404).json({
      success: false,
      message: "Seat cant be found",
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
  const seat = await Seat.findById(id);
  if (!seat) {
    return res.status(404).json({
      success: false,
      message: "Seat cant be found",
    });
  }
  const deletedSeat = await Seat.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Your seat has been deleted",
    data: deletedSeat,
  });
});
