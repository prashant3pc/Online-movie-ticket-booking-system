import asyncHandler from "express-async-handler";
import Booking from "../models/Booking";

export const createBooking = asyncHandler(async (req, res) => {
  const { user, show, seats, totalPrice, totalSeats, status } = req.body;
  const newBooking = await Booking.create({
    user,
    show,
    seats,
    totalPrice,
    totalSeats,
    status,
  });
  return res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: newBooking,
  });
});

export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  return res.status(200).json({
    success: true,
    message: "All your bookings are here",
    data: bookings,
  });
});
