import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    completed: { type: Boolean, default: false },
    lastAccessed: { type: Date, default: Date.now },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Progress || mongoose.model("Progress", progressSchema);
