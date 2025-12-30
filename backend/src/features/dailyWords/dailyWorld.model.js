import mongoose from "mongoose";

const DailyWordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    words: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

DailyWordSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyWord", DailyWordSchema);
