"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { set } from "mongoose";

export default function CustomPackageForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    addons: [],
    expiryDate: "",
    slug: "",
    imageFile: null,
    imagePreview: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-"); // replace spaces with -

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: slugify(value)
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleAddonChange = (index, field, value) => {
    const updatedAddons = [...form.addons];
    updatedAddons[index][field] = value;
    setForm((prev) => ({ ...prev, addons: updatedAddons }));
  };

  const addAddon = () => {
    setForm((prev) => ({
      ...prev,
      addons: [...prev.addons, { name: "", price: "" }]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, imagePreview: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate before uploading image
      if (!form.title.trim() || !form.price) {
        alert("Title and price are required");
        return;
      }

      // Prepare addons: remove ones with empty name, omit price if blank
      const cleanedAddons = form.addons
        .filter((a) => a.name.trim() !== "")
        .map((a) => ({
          name: a.name.trim(),
          ...(a.price ? { price: Number(a.price) } : {})
        }));

      let imageUrl = "";
      if (form.imageFile) {
        const data = new FormData();
        data.append("file", form.imageFile);
        data.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );
        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          data
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      await axios.post("/api/admin/custom-packages", {
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        addons: cleanedAddons,
        expiryDate: form.expiryDate || null,
        slug: form.slug,
        imageUrl
      });

      alert("Custom package created successfully");
      setForm({
        title: "",
        description: "",
        price: "",
        addons: [],
        expiryDate: "",
        slug: "",
        imageFile: null,
        imagePreview: ""
      });

      setIsLoading(false);

    } catch (err) {
      console.error(err);
      alert("Error creating package");
      setIsLoading(false);
    }
  };


  return (
    <div className="container mt-4 mb-4">
      <h2>Create Custom Package</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Expiry */}
        <div className="mb-3">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            className="form-control"
            value={form.expiryDate}
            onChange={handleChange}
          />
        </div>

        {/* Addons */}
        <div className="mb-3">
          <label className="form-label">Addons</label>
          {form.addons.map((addon, i) => (
            <div className="d-flex mb-2" key={i}>
              <input
                type="text"
                placeholder="Name"
                className="form-control me-2"
                value={addon.name}
                onChange={(e) =>
                  handleAddonChange(i, "name", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Price (optional)"
                className="form-control me-2"
                value={addon.price}
                onChange={(e) =>
                  handleAddonChange(i, "price", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addAddon}
          >
            Add Addon
          </button>
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {form.imagePreview && (
            <Image
              src={form.imagePreview}
              width={200}
              height={200}
              alt="Preview"
              className="mt-2"
              style={{ width: "200px" }}
            />
          )}
        </div>

        {/* Slug */}
        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            type="text"
            name="slug"
            className="form-control"
            value={form.slug}
            onChange={handleChange} // allow editing
          />

        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true">
              </span>
              Saving...
            </>
          ) : (
            "Create Package"
          )}

        </button>
      </form>
    </div>
  );
}
