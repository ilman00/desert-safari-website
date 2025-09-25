"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";


export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("published");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imgDimension, setImgDimension] = useState({ width: "", height: "" })
  const quillRef = useRef(null);

  // Quill toolbar configuration
  const quillModules = {
    toolbar: [
      [{ header: [2, 3, 4, false] }], // H2, H3, H4 headings (no H1)
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ align: [] }],
      ["clean"], // remove formatting
    ],
    clipboard: {
      matchVisual: false, // Better paste behavior
    },
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "blockquote",
    "code-block",
    "link",
    "image",
    "align",
  ];

  // Custom image handler for Quill
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", data.secure_url);
      } catch (error) {
        console.error("Image upload failed:", error);
        setMessage("Failed to upload image to content.");
      }
    };
  };

  // Configure Quill with custom image handler
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.getModule("toolbar").addHandler("image", imageHandler);
    }
  }, []);

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setCoverImage(data.secure_url);
      setImgDimension({
        width: res.width, height: res.height
      })
      setMessage("Cover image uploaded successfully!");
    } catch (error) {
      setMessage("Cover image upload failed.");
    }
    setLoading(false);
  }

  // Auto-generate excerpt from content if not provided
  const generateExcerpt = (htmlContent) => {
    const textContent = htmlContent.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return textContent.substring(0, 160) + (textContent.length > 160 ? "..." : "");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // Auto-generate excerpt if not provided
    const finalExcerpt = excerpt.trim() || generateExcerpt(content);

    // Convert tags string to array
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

    const blogData = {
      title,
      excerpt: finalExcerpt,
      content,
      coverImage,
      author,
      tags: tagsArray,
      status,
      slug,
    };

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        setMessage("Blog created successfully!");
        // Reset form
        setTitle("");
        setExcerpt("");
        setContent("");
        setCoverImage("");
        setAuthor("");
        setTags("");
        setStatus("published");
      } else {
        const errorData = await res.json();
        setMessage(`Error creating blog: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="container mt-5 mb-5 rounded col-md-10 pb-3" style={{ backgroundColor: "#F2F2F2" }}>
      <h1 className="mb-4">Create New Blog</h1>

      {message && (
        <div className={`alert ${message.includes("Error") || message.includes("failed") ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-control"
                placeholder="Enter blog title"
              />
            </div>

            {/* Excerpt */}
            <div className="mb-3">
              <label className="form-label">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="form-control"
                rows={3}
                placeholder="Brief description (optional - will auto-generate if empty)"
              />
              <small className="form-text text-muted">
                Leave empty to auto-generate from content. Recommended length: 150-160 characters.
              </small>
            </div>

            {/* Content with Quill */}
            <div className="mb-3">
              <label className="form-label">Content *</label>
              <div style={{ backgroundColor: "white" }}>
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your blog content here..."
                  style={{ height: "400px", marginBottom: "50px" }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            {/* Author */}
            <div className="mb-3">
              <label className="form-label">Author *</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="form-control"
                placeholder="Author name"
              />
            </div>



            {/* Tags */}
            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="form-control"
                placeholder="tag1, tag2, tag3"
              />
              <small className="form-text text-muted">
                Separate multiple tags with commas
              </small>
            </div>

            {/* Cover Image */}
            <div className="mb-3">
              <label className="form-label">Cover Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required={!coverImage}
                className="form-control"
              />
              {coverImage && (
                <div className="mt-2">
                  <Image
                    width={200}
                    height={150}
                    src={coverImage.replace("/upload/", "/upload/f_auto,q_auto/")}
                    alt="Cover Preview"
                    className="img-fluid rounded"
                    style={{ objectFit: "cover" }}
                  />

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => setCoverImage("")}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* Status */}
            {/* <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !title || !content || !author}
              className="btn btn-primary w-100"
            >
              {loading ? "Saving..." : "Create Blog"}
            </button>
          </div>
        </div>
      </form>

      {/* Content Preview */}
      {content && (
        <div className="mt-5">
          <h3>Content Preview</h3>
          <div
            className="border p-3 rounded"
            style={{ backgroundColor: "white" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </div>
  );
}