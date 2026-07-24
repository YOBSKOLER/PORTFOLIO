import mongoose, { Schema } from "mongoose";

const SkillSchema = new Schema(
  {
    category: String,
    color: String,
    icon: String,
    skills: [
      {
        name: String,
        icon: { type: String, default: "" },
        lucideIcon: { type: String, default: "" },
        unlocked: { type: Boolean, default: true },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Skill =
  mongoose.models.Skill ?? mongoose.model("Skill", SkillSchema);
