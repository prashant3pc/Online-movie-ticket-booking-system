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

const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
