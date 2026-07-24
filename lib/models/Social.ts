import mongoose, { Schema } from "mongoose";

const SocialSchema = new Schema(
  {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Social =
  mongoose.models.Social ?? mongoose.model("Social", SocialSchema);
