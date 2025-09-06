"use client";

import React, { useState, useMemo, use } from "react";
import PayPalButton from "../paypal/PayPalButton"

export default function CustomBookingModal({ pkg }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    adults: 1,
    kids: 0,
    message: "",
  });
  const [isPaypalButton, setPaypalButton] = useState(false)
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)

  const basePrice = useMemo(() => {
    const n = Number(pkg?.price);
    return Number.isFinite(n) ? n : 0;
  }, [pkg?.price]);

  const calcPrice = useMemo(() => {
    const adults = Number.isFinite(form.adults) ? form.adults : 1;
    const kids = Number.isFinite(form.kids) ? form.kids : 0;

    let price = basePrice;
    if (adults > 1) {
      price += (adults - 1) * (basePrice * 0.5);
    }
    if (kids >= 2) {
      const childPairs = Math.floor(kids / 2);
      price += childPairs * (basePrice * 0.5);
    }
    return Number.isFinite(price) ? price : 0;
  }, [basePrice, form.adults, form.kids]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "adults" || name === "kids" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (paymentType) => {
    if (!form.name || !form.phone || !form.pickupLocation) {
      alert("Name, phone, and pickup location are required.");
      return;
    }

    setLoading(true);
    try {
      const finalPrice =
        paymentType === "online" ? +(calcPrice * 0.95).toFixed(2) : calcPrice;

      setTotalPrice(finalPrice);

      const res = await fetch("/api/admin/custom-packages/book-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          safariPackages: pkg?.title,
          packageId: pkg?.id ?? pkg?._id,
          price: finalPrice,
          paymentType,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to book");
      }

      const data = await res.json();
      console.log("Booking response:", data);

      // Adjust this based on what API actually returns
      setBookingId(data.booking?._id);

      if (paymentType === "online") {
        setPaypalButton(true);
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        pickupLocation: "",
        adults: 1,
        kids: 0,
        message: "",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#bookingModal"
      >
        Online Booking
      </button>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="bookingModal"
        tabIndex="-1"
        aria-labelledby="bookingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bookingModalLabel">
                Book Package
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Pickup */}
              <div className="mb-3">
                <label className="form-label">Pickup Location *</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={form.pickupLocation}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Package */}
              <div className="mb-3">
                <label className="form-label">Package</label>
                <p className="fw-bold">{pkg?.title}</p>
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price</label>
                <p className="fw-bold text-success">${calcPrice.toFixed(2)}</p>
              </div>

              {/* Adults / Kids */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Adults</label>
                  <input
                    type="number"
                    min="1"
                    name="adults"
                    value={form.adults}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Children</label>
                  <input
                    type="number"
                    min="0"
                    name="kids"
                    value={form.kids}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="3"
                  className="form-control"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                disabled={loading}
                onClick={() => handleSubmit("offline")}
              >
                {loading ? "Saving..." : "Pay Offline"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={loading}
                onClick={() => handleSubmit("online")}
              >
                {loading ? "Saving..." : "Pay Online (5% Off)"}
              </button>


            </div>
            <div className="w-50 m-auto">
              {isPaypalButton && bookingId && totalPrice > 0 && (
                <div className="mt-4">
                  <PayPalButton bookingId={bookingId} price={totalPrice} description={pkg?.title} />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
