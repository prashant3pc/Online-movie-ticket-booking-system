import asyncHandler from "express-async-handler"; // Handles async errors automatically
import Booking from "../models/Booking.js"; // Imports the Booking model
import Show from "../models/Show.js"; // Imports the Show model

// Create a new booking
export const createBooking = asyncHandler(async (req, res) => {
  const { show, seats, totalPrice, totalSeats } = req.body; // Gets booking data from request body

  const existingShow = await Show.findById(show); // Finds the show selected by the customer

  if (!existingShow) {
    return res.status(404).json({
      // Sends 404 if the show does not exist
      success: false, // Indicates the request failed
      message: "Show not found", // Explains the error
    });
  }

  const newBooking = await Booking.create({
    // Creates the booking in MongoDB
    user: req.user.id, // Uses the logged-in user's ID
    show, // Stores the selected show ID
    seats, // Stores the selected seat IDs
    totalPrice, // Stores the booking price
    totalSeats, // Stores the number of seats
  });

  return res.status(201).json({
    // Sends successful creation response
    success: true, // Indicates success
    message: "Booking created successfully", // Success message
    data: newBooking, // Returns the created booking
  });
});

// Get all bookings
export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find(); // Gets all bookings from MongoDB

  return res.status(200).json({
    // Sends successful response
    success: true, // Indicates success
    message: "All bookings are here", // Success message
    data: bookings, // Returns all bookings
  });
});

// Get one booking
export const getOneBooking = asyncHandler(async (req, res) => {
  const id = req.params.id; // Gets booking ID from URL

  const booking = await Booking.findById(id); // Finds the booking by ID

  if (!booking) {
    return res.status(404).json({
      // Sends 404 if booking does not exist
      success: false, // Indicates failure
      message: "Booking not found", // Explains the error
    });
  }

  return res.status(200).json({
    // Sends successful response
    success: true, // Indicates success
    message: "Your single booking is here", // Success message
    data: booking, // Returns the booking
  });
});

// Update a booking
export const updateBooking = asyncHandler(async (req, res) => {
  const { totalPrice, totalSeats, status } = req.body; // Gets update data from request body
  const id = req.params.id; // Gets booking ID from URL

  const booking = await Booking.findById(id).populate({
    // Finds booking and loads related documents
    path: "show", // Loads the Show document
    populate: {
      // Loads documents related to the Show
      path: "screen", // Loads the Screen document
      populate: { path: "theatre" }, // Loads the Theatre through the Screen
    },
  });

  if (!booking) {
    return res.status(404).json({
      // Sends 404 if booking does not exist
      success: false, // Indicates failure
      message: "Booking not found", // Explains the error
    });
  }

  if (booking.show.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(403).json({
      // Sends 403 when manager does not own the theatre
      success: false, // Indicates failure
      message: "You do not own this booking's theatre", // Explains the authorization failure
    });
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    // Updates the booking
    id, // Identifies which booking to update
    { totalPrice, totalSeats, status }, // Fields that can be updated
    { new: true }, // Returns the updated document
  );

  return res.status(200).json({
    // Sends successful response
    success: true, // Indicates success
    message: "Booking updated successfully", // Success message
    data: updatedBooking, // Returns updated booking
  });
});

// Delete a booking
export const deleteBooking = asyncHandler(async (req, res) => {
  const id = req.params.id; // Gets booking ID from URL

  const booking = await Booking.findById(id).populate({
    // Finds booking and loads related documents
    path: "show", // Loads the Show document
    populate: {
      // Loads documents related to the Show
      path: "screen", // Loads the Screen document
      populate: { path: "theatre" }, // Loads the Theatre through the Screen
    },
  });

  if (!booking) {
    return res.status(404).json({
      // Sends 404 if booking does not exist
      success: false, // Indicates failure
      message: "Booking not found", // Explains the error
    });
  }

  if (booking.show.screen.theatre.owner.toString() !== req.user.id) {
    return res.status(403).json({
      // Sends 403 when manager does not own the theatre
      success: false, // Indicates failure
      message: "You do not own this booking's theatre", // Explains the authorization failure
    });
  }

  const deletedBooking = await Booking.findByIdAndDelete(id); // Deletes the booking

  return res.status(200).json({
    // Sends successful response
    success: true, // Indicates success
    message: "Booking deleted successfully", // Success message
    data: deletedBooking, // Returns deleted booking
  });
});
