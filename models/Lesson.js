import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    category: { type: String, required: true }, // e.g., "Vocabulary", "Grammar", "Listening"
    content: {
      introduction: String,
      mainContent: [
        {
          heading: String,
          text: String,
          example: String,
        },
      ],
      summary: String,
    },
    vocabulary: [
      {
        word: String,
        bengaliMeaning: String,
        example: String,
      },
    ],
    isSample: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
