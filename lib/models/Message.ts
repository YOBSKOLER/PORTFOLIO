import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    name: String,
    email: String,
    message: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Message =
  mongoose.models.Message ?? mongoose.model("Message", MessageSchema);
