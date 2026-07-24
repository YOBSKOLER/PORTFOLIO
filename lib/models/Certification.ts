import mongoose, { Schema } from "mongoose";

const CertificationSchema = new Schema(
  {
    title: String,
    issuer: String,
    date: String,
    link: { type: String, default: "" },
    color: { type: String, default: "#7c3aed" },
    logo: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Certification =
  mongoose.models.Certification ??
  mongoose.model("Certification", CertificationSchema);
