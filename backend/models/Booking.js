import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    show: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Show",
      required: true,
    },
    seats: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Seat",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Cancelled", "Confirmed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
