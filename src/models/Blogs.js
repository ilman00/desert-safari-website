import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }, // store as HTML or Markdown
    coverImage: { type: String },
    author: { type: String, default: "Admin" },
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    tags: [{ type: String }], // <--- Added tags field
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
