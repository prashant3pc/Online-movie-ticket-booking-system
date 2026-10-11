import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Regular", "VIP"],
      default: "Regular",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    seatNumber: {
      type: String,
      required: true,
    },

    screen: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Screen",
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate seat numbers within the same screen
seatSchema.index({ screen: 1, seatNumber: 1 }, { unique: true });

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
