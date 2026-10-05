import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { user, show, seats, totalPrice, totalSeats } = req.body;
  const newBooking = await Booking.create({
    user,
    show,
    seats,
    totalPrice,
    totalSeats,
  });
  return res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: newBooking,
  });
});

export const getBookings = asyncHandler(async (req, res) => {
  const existingBookings = await Booking.findById();

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
    data: booking,
  });
});

export const updateBooking = asyncHandler(async (req, res) => {
  const { totalPrice, totalSeats, status } = req.body;
  const id = req.params.id;
  const booking = await Booking.findById(id).populate({
    path: "show",
    populate: { path: "screen", populate: { path: "theatre" } },
  });
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  if (booking.show.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "id not matched",
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

export const deleteBooking = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const booking = await Booking.findById(id).populate({
    path: "show",
    populate: { path: "screen", populate: { path: "theatre" } },
  });
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }
  if (booking.show.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "id not matched",
    });
  }
  const deletedBooking = await Booking.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Booking deleted successfully",
    data: deletedBooking,
  });
});
