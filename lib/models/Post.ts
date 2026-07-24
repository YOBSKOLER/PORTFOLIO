import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String,
    content: String,
    coverImage: String,
    tags: [String],
    published: { type: Boolean, default: false },
    readTime: { type: Number, default: 5 },
  },
  { timestamps: true },
);

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
