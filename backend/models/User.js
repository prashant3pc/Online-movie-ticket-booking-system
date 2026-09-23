import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 2,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "theatre-manager"],
      default: "user",
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;
