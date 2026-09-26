import mongoose from "mongoose";

export const screenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    soundType: {
      type: String,
      required: true,
    },
    theatre: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Theatre",
      required: true,
    },
  },
  { timestamps: true },
);

const Screen = mongoose.model("Screen", screenSchema);
export default Screen;
