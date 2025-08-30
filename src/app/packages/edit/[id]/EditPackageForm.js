"use client";
import { useState } from "react";

export default function EditPackageForm({ pkg }) {
  const [form, setForm] = useState({
    title: pkg.title || "",
    slug: pkg.slug || "",
    description: pkg.description || "",
    price: pkg.price || 0,
    imageUrl: pkg.imageUrl || "",
    expiryDate: pkg.expiryDate
      ? new Date(pkg.expiryDate).toISOString().split("T")[0]
      : "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/custom-package/${pkg._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Package updated successfully!");
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card shadow p-4 border-0">
      {message && (
        <div
          className={`alert ${
            message.startsWith("✅") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Slug</label>
        <input
          type="text"
          className="form-control"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="4"
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Expiry Date</label>
        <input
          type="date"
          className="form-control"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
