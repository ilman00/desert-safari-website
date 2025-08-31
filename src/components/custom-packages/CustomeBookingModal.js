"use client";

import React, { useState } from "react";

export default function PackagePageClient({ pkg }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    adults: 1,
    children: 0,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const basePrice = pkg.price;

  // Price calculation
  const calcPrice = () => {
    let price = basePrice;
    if (form.adults > 1) {
      price += (form.adults - 1) * (basePrice * 0.5);
    }
    if (form.children >= 2) {
      const childPairs = Math.floor(form.children / 2);
      price += childPairs * (basePrice * 0.5);
    }
    return price;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "adults" || name === "children" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (paymentType) => {
    setLoading(true);
    try {
      let finalPrice = calcPrice();
      if (paymentType === "online") {
        finalPrice = finalPrice * 0.95; // 5% discount
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          packageName: pkg.title,
          packageId: pkg.id,
          price: finalPrice,
          paymentType,
        }),
      });

      if (!res.ok) throw new Error("Failed to book");

      alert("Booking submitted successfully!");
      setShowModal(false);
      setForm({ name: "", phone: "", pickup: "", adults: 1, children: 0, message: "" });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Booking Button */}
      <button
        className="btn btn-primary flex-fill btn-lg rounded-3"
        onClick={() => setShowModal(true)}
      >
        Online Booking
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header">
                <h5 className="modal-title">Book Package</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Pickup */}
                  <div className="mb-3">
                    <label className="form-label">Pickup Location *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pickup"
                      value={form.pickup}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Package Name */}
                  <div className="mb-3">
                    <label className="form-label">Package</label>
                    <p className="fw-bold">{pkg.title}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <p className="fw-semibold text-success">${calcPrice()}</p>
                  </div>

                  {/* Adults */}
                  <div className="mb-3">
                    <label className="form-label">No. of Adults</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      name="adults"
                      value={form.adults}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Children */}
                  <div className="mb-3">
                    <label className="form-label">No. of Children</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      name="children"
                      value={form.children}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="3"
                      value={form.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success"
                    disabled={loading}
                    onClick={() => handleSubmit("offline")}
                  >
                    {loading ? "Saving..." : "Pay Offline"}
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={loading}
                    onClick={() => handleSubmit("online")}
                  >
                    {loading ? "Saving..." : "Pay Online (5% Off)"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
