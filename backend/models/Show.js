import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Movie",
      required: true,
    },
    screen: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Screen",
      required: true,
    },
    // date: {
    //   type: String,
    //   required: true,
    // },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);
const Show = mongoose.model("Show", showSchema);
export default Show;
