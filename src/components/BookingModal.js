// 📁 app/components/BookingModal.jsx
"use client";

import { useBooking } from "./BookingContext";
import { useState } from "react";
import { packageData } from "@/data/packages";
import PhoneInput from './PhoneInputWrapper';


function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BookingModal() {
  const { show, close, selectedSafari } = useBooking();
  const [manualSelectedTitle, setManualSelectedTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [phone, setPhone] = useState('');

  const allSafaris = packageData.flatMap((group) => group.cards);

  const currentSafari = selectedSafari
    ? selectedSafari
    : allSafaris.find((s) => s.title === manualSelectedTitle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone,
      pickupLocation: formData.get("pickupLocation"),
      package: selectedSafari?.title || manualSelectedTitle,
      price: currentSafari?.price || "",
      adults: Number(formData.get("adults")),
      kids: Number(formData.get("kids")),
      message: formData.get("message") || "",
    };

    try {
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await bookingRes.json();
      if (!bookingRes.ok || !result.id) throw new Error("Booking failed");

      if (selectedPayment === "online") {
        const checkoutRes = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, bookingId: result.id }),
        });

        const { url } = await checkoutRes.json();
        if (!url) throw new Error("Checkout failed");

        window.location.href = url;
      } else {
        alert("Booking confirmed! Please pay in cash at pickup.");
        close();
      }
    } catch (err) {
      alert("Booking failed.");
      console.error(err);
    } finally {
      setLoading(false);
      setSelectedPayment(null);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title">
                Book {currentSafari?.title || "Your Safari"}
              </h5>
              <button type="button" className="btn-close" onClick={close}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" required />
                  </div>
                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required />
                  </div>
                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <PhoneInput
                      country={'ae'} // default to UAE
                      value={phone}
                      onChange={setPhone}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        className: 'form-control'
                      }}
                    />
                  </div>
                  {/* Pickup Location */}
                  <div className="col-md-6">
                    <label className="form-label">Pickup Location</label>
                    <input type="text" className="form-control" name="pickupLocation" required />
                  </div>
                  {/* Package Select */}
                  <div className="col-md-6">
                    <label className="form-label">Safari Package</label>
                    <select
                      name="package"
                      className="form-select"
                      value={selectedSafari?.title || manualSelectedTitle || ""}
                      disabled={!!selectedSafari}
                      onChange={(e) => setManualSelectedTitle(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a package</option>
                      {allSafaris.map((safari, index) => (
                        <option key={index} value={safari.title}>
                          {toTitleCase(safari.title)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Price */}
                  {currentSafari?.price && (
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentSafari.price}
                        disabled
                      />
                    </div>
                  )}
                  {/* Adults */}
                  <div className="col-md-3">
                    <label className="form-label">No. of Adults</label>
                    <input type="number" className="form-control" name="adults" min="1" required />
                  </div>
                  {/* Kids */}
                  <div className="col-md-3">
                    <label className="form-label">No. of Kids</label>
                    <input type="number" className="form-control" name="kids" min="0" required />
                  </div>
                  {/* Message */}
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" name="message" rows="3" placeholder="Optional message"></textarea>
                  </div>

                  <div className="col-12 d-flex gap-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                      disabled={loading}
                      onClick={() => setSelectedPayment("online")}
                    >
                      {loading && selectedPayment === "online" ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        "Pay Online"
                      )}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-secondary w-100 d-flex justify-content-center align-items-center"
                      disabled={loading}
                      onClick={() => setSelectedPayment("offline")}
                    >
                      {loading && selectedPayment === "offline" ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        "Pay Offline (Cash)"
                      )}
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
