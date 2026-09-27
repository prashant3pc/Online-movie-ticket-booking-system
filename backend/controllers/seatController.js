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
