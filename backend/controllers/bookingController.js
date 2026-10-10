import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import Seat from "../models/Seat.js";

// CREATE A NEW BOOKING
export const createBooking = asyncHandler(async (req, res) => {
  const { show, seats } = req.body; // Gets requested booking data from the client

  // Your duplicate check currently happens here
  if (new Set(seats).size !== seats.length) {
    return res.status(400).json({
      success: false,
      message: "Duplicate seat IDs are not allowed",
    });
  }

  const existingShow = await Show.findById(show); // Finds the selected show in MongoDB

  if (!existingShow) {
    // Checks whether the show exists
    return res.status(404).json({
      success: false, // Indicates failure
      message: "Show not found", // Explains the error
    });
  }

  const existingSeats = await Seat.find({
    _id: { $in: seats }, // Finds database seats whose IDs appear in the requested seats array
  });

  if (existingSeats.length !== seats.length) {
    // Checks whether every requested seat exists
    return res.status(404).json({
      success: false, // Indicates failure
      message: "One or more requested seats do not exist", // Explains the error
    });
  }

  // Checks whether any selected seat belongs to another screen
  const invalidSeat = existingSeats.find(
    (existingSeat) =>
      existingSeat.screen.toString() !== existingShow.screen.toString(), // Finds a seat belonging to a different screen
  );

  if (invalidSeat) {
    return res.status(400).json({
      success: false, // Indicates failure
      message: "One or more seats do not belong to this show's screen", // Explains the problem
    });
  }

  // CHECK EXISTING BOOKINGS
  // Checks whether any requested seat is already booked
  const alreadyBooked = await Booking.findOne({
    show: show, // Checks bookings for this particular show
    seats: { $in: seats }, // Checks whether any requested seat overlaps an existing booking
    status: { $ne: "Cancelled" }, // Ignores cancelled bookings when checking seat availability
  });

  if (alreadyBooked) {
    // Rejects a seat already reserved by an active booking
    return res.status(400).json({
      success: false, // Indicates failure
      message: "One or more selected seats are already booked",
    });
  }
  // booking price and seat count
  // Calculates the number of seats and total price
  const totalSeats = seats.length;
  const totalPrice = existingSeats.reduce(
    (total, seat) => total + seat.price,
    0,
  );

  // CREATE BOOKING IN DATABASE
  const newBooking = await Booking.create({
    user: req.user.id, // Assigns the booking to the logged-in user
    show, // Stores the selected show ID
    seats, // Stores the selected seat IDs
    totalPrice, // Stores the price calculated by the backend
    totalSeats, // Stores the number of selected seats
    // status is not supplied, so Mongoose uses the schema default: "Pending"
  });

  return res.status(201).json({
    success: true, // Indicates success
    message: "Booking created successfully", // Confirms creation
    data: newBooking, // Returns the created booking
  });
});

// GET ALL BOOKINGS
export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find(); // Retrieves all bookings from MongoDB

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "No access authorized",
    });
  }
  if (req.user.role !== "theatre-manager") {
    return res.status(403).json({
      success: false,
      message: "No access authorized",
    });
  }
  return res.status(200).json({
    success: true, // Indicates success
    message: "All bookings are here", // Success message
    data: bookings, // Returns the bookings
  });
});

// GET ONE BOOKING
export const getOneBooking = asyncHandler(async (req, res) => {
  const id = req.params.id; // Gets the booking ID from the URL

  const booking = await Booking.findById(id); // Finds the booking by ID

  if (!booking) {
    // Checks whether the booking exists
    return res.status(404).json({
      success: false, // Indicates failure
      message: "Booking not found", // Explains the error
    });
  }
  if (booking.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You cannot access another user's booking",
    });
  }

  return res.status(200).json({
    success: true, // Indicates success
    message: "Your single booking is here", // Success message
    data: booking, // Returns the booking
  });
});

// UPDATE BOOKING
// Does not change status or price in this version.

export const updateBooking = asyncHandler(async (req, res) => {
  const id = req.params.id; // Gets the booking ID from the URL

  const booking = await Booking.findById(id).populate({
    path: "show", // Loads the related Show document
    populate: {
      path: "screen", // Loads the Screen belonging to the Show
      populate: { path: "theatre" }, // Loads the Theatre belonging to the Screen
    },
  });

  if (!booking) {
    // Checks whether the booking exists
    return res.status(404).json({
      success: false, // Indicates failure
      message: "Booking not found", // Explains the error
    });
  }

  if (booking.show.screen.theatre.owner.toString() !== req.user.id) {
    // Checks whether the logged-in manager owns the booking's theatre
    return res.status(403).json({
      success: false, // Indicates failure
      message: "You do not own this booking's theatre", // Explains the authorization failure
    });
  }

  return res.status(400).json({
    // No general booking-update fields are defined yet
    success: false, // Indicates that this operation is not currently supported
    message: "General booking updates are not available", // Explains the restriction
  });
});

// CANCELLATION
// Only Pending bookings can be cancelled.

export const cancelBooking = asyncHandler(async (req, res) => {
  const id = req.params.id; // Gets the booking ID from the URL

  const booking = await Booking.findById(id); // Finds the booking in MongoDB

  if (!booking) {
    // Checks whether the booking exists
    return res.status(404).json({
      success: false, // Indicates failure
      message: "Booking not found", // Explains the error
    });
  }

  if (booking.user.toString() !== req.user.id) {
    // Ensures that only the customer who owns the booking can cancel it
    return res.status(403).json({
      success: false, // Indicates failure
      message: "You cannot cancel another user's booking", // Explains the authorization failure
    });
  }

  // BOOKING STATUS CHECK
  if (booking.status !== "Pending") {
    // Rejects cancellation if the current status is Confirmed or Cancelled
    return res.status(400).json({
      success: false, // Indicates failure
      message: "Only pending bookings can be cancelled", // Explains the rule
    });
  }

  // CANCELLATION: ACTUALLY UPDATES MONGODB
  const cancelledBooking = await Booking.findByIdAndUpdate(
    id, // Identifies which booking to update
    { status: "Cancelled" }, // Changes the booking status to Cancelled
    { new: true }, // Returns the updated booking document
  );

  return res.status(200).json({
    success: true, // Indicates success
    message: "Booking cancelled successfully", // Confirms cancellation
    data: cancelledBooking, // Returns the updated booking
  });
});

// DELETE BOOKING
// Permanent deletion; keep separate from cancellation.

export const deleteBooking = asyncHandler(async (req, res) => {
  const id = req.params.id; // Gets the booking ID from the URL

  const booking = await Booking.findById(id).populate({
    path: "show", // Loads the related Show
    populate: {
      path: "screen", // Loads the related Screen
      populate: { path: "theatre" }, // Loads the related Theatre
    },
  });

  if (!booking) {
    // Checks whether the booking exists
    return res.status(404).json({
      success: false, // Indicates failure
      message: "Booking not found", // Explains the error
    });
  }

  if (booking.show.screen.theatre.owner.toString() !== req.user.id) {
    // Checks whether the logged-in manager owns the theatre
    return res.status(403).json({
      success: false, // Indicates failure
      message: "You do not own this booking's theatre", // Explains the authorization failure
    });
  }

  const deletedBooking = await Booking.findByIdAndDelete(id); // Permanently deletes the booking from MongoDB

  return res.status(200).json({
    success: true, // Indicates success
    message: "Booking deleted successfully", // Confirms deletion
    data: deletedBooking, // Returns the deleted booking
  });
});
