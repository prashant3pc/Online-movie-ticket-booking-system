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

export const getOneBooking = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const booking = await Booking.findById(id);
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "booking not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Your single booking is here",
  });
});

export const updateBooking = asyncHandler(async (req, res) => {
  const { totalPrice, totalSeats, status } = req.body;
  const id = req.params.id;
  const booking = await Booking.findById(id);
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { totalPrice, totalSeats, status },
    { new: true },
  );
  return res.status(200).json({
    success: true,
    message: "Booking updated successfully",
    data: updatedBooking,
  });
});
