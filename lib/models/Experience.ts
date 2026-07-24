import mongoose, { Schema } from "mongoose";

const ExperienceSchema = new Schema(
  {
    role: String,
    company: String,
    location: String,
    period: String,
    periodColor: { type: String, default: "#7c3aed" },
    description: String,
    tags: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Experience =
  mongoose.models.Experience ?? mongoose.model("Experience", ExperienceSchema);
