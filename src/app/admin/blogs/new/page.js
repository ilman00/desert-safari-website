"use client";

import { useState } from "react";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("published");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET); 
    // Cloudinary unsigned upload preset

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setCoverImage(data.secure_url); // save URL in state
      setMessage("Image uploaded successfully!");
    } catch (error) {
      setMessage("Image upload failed.");
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const blogData = { title, excerpt, content, coverImage, status, slug };

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      setMessage("Blog created successfully!");
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setStatus("published");
    } else {
      setMessage("Error creating blog.");
    }

    setLoading(false);
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Create New Blog</h1>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control" />
          {coverImage && (
            <img src={coverImage} alt="Cover Preview" className="img-fluid mt-2 rounded" />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Saving..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
