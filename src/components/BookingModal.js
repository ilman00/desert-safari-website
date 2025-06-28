"use client";

import { useBooking } from "./BookingContext";
import { useEffect, useState } from "react";
import { packageData } from "@/data/packages";
import CheckoutButton from "./CheckoutButton";

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}




export default function BookingModal() {
  const { show, close, selectedSafari } = useBooking();
  const [manualSelectedTitle, setManualSelectedTitle] = useState("");



  const allSafaris = packageData.flatMap((group) => group.cards);

  const currentSafari = selectedSafari
    ? selectedSafari
    : allSafaris.find((s) => s.title === manualSelectedTitle);

  useEffect(() => {
    if (!selectedSafari) setManualSelectedTitle("");
  }, [selectedSafari]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      pickupLocation: formData.get("pickupLocation"),
      package: selectedSafari?.title || manualSelectedTitle,
      price: currentSafari?.price || "",
      adults: Number(formData.get("adults")),
      kids: Number(formData.get("kids")),
      message: formData.get("message") || "",
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to book");

      close();
    } catch (err) {
      alert("Failed to submit booking.");
      console.error(err);
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
                    <input type="tel" className="form-control" name="phone" required />
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
                      value={
                        selectedSafari?.title || manualSelectedTitle || ""
                      }
                      disabled={!!selectedSafari}
                      onChange={(e) => setManualSelectedTitle(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a package</option>
                      {allSafaris.map((safari) => (
                        <option key={safari.title} value={safari.title}>
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
                    <input
                      type="number"
                      className="form-control"
                      name="adults"
                      min="1"
                      required
                    />
                  </div>

                  {/* Kids */}
                  <div className="col-md-3">
                    <label className="form-label">No. of Kids</label>
                    <input
                      type="number"
                      className="form-control"
                      name="kids"
                      min="0"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="3"
                      placeholder="Optional message"
                    ></textarea>
                  </div>

                  {/* Submit */}
                  {/* Submit */}
                  <div className="col-12">
                    <CheckoutButton
                      tourName={currentSafari?.title || "Your Safari"}
                      price={currentSafari?.price || 0}
                    />
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
