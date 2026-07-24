import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: String,
    category: String,
    categoryColor: { type: String, default: "#7c3aed" },
    bgColor: { type: String, default: "from-violet-600 to-purple-800" },
    description: String,
    tags: [String],
    link: { type: String, default: "#" },
    image: { type: String, default: "" },
    type: {
      type: String,
      enum: ["personal", "professional"],
      default: "professional",
    },
  },
  { timestamps: true },
);

export const Project =
  mongoose.models.Project ?? mongoose.model("Project", ProjectSchema);
