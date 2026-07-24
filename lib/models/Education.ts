import mongoose, { Schema } from "mongoose";

const EducationSchema = new Schema(
  {
    degree: String,
    school: String,
    location: String,
    period: String,
    periodColor: { type: String, default: "#7c3aed" },
    description: String,
    tags: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Education =
  mongoose.models.Education ?? mongoose.model("Education", EducationSchema);
