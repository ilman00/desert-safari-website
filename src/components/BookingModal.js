"use client";

import { useBooking } from "./BookingContext";
import { useState, useEffect, useMemo } from "react";
import PhoneInput from './PhoneInputWrapper';
import { newPackageData } from "@/data/packages";

export default function BookingModal() {
  const { show, close, selectedSafari } = useBooking();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [phone, setPhone] = useState('');
  const [addOnVariants, setAddOnVariants] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const parsePrice = (priceStr) =>
    parseInt(priceStr?.match(/\d+/)?.[0] || 0);

  const currentSafari = selectedSafari;

  const sectionVariants = useMemo(() => {
    if (!currentSafari?.title) return [];

    const section = newPackageData.find(section =>
      section.cards.some(card =>
        card.variants.some(v => v.name === currentSafari.title)
      )
    );

    if (!section) return [];

    return section.cards.flatMap(card =>
      card.variants.map(v => ({
        name: v.name,
        price: parsePrice(v.price)
      }))
    );
  }, [currentSafari]);

  const selectedIndex = sectionVariants.findIndex(v => v.name === currentSafari?.title);
  const addOnOptions = sectionVariants.slice(selectedIndex + 1);

  const basePrice = parsePrice(currentSafari?.price);
  const addOnPrice = addOnVariants.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + addOnPrice;

  const toggleAddOn = (option) => {
    const exists = addOnVariants.find(v => v.name === option.name);
    if (exists) {
      setAddOnVariants(prev => prev.filter(v => v.name !== option.name));
    } else {
      setAddOnVariants(prev => [...prev, option]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      phone,
      pickupLocation: formData.get("pickupLocation"),
      packages: [currentSafari?.title, ...addOnVariants.map(v => v.name)], // <-- Array of packages
      price: totalPrice,
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
          body: JSON.stringify({
            tourName: [currentSafari?.title, ...addOnVariants.map(v => v.name)].join(", "),
            price: data.price,
            bookingId: result.id,
          }),
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

  if (!mounted || !show || !currentSafari?.title) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title">Book {currentSafari.title}</h5>
              <button type="button" className="btn-close" onClick={close}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">Name <strong className="text-danger">*</strong> </label>
                    <input type="text" className="form-control" name="name" required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone Number <strong className="text-danger">*</strong> </label>
                    <PhoneInput
                      country={'ae'}
                      value={phone}
                      onChange={setPhone}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        className: 'form-control'
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Pickup Location</label>
                    <input type="text" className="form-control" name="pickupLocation" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Selected Package</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentSafari.title}
                      disabled
                    />
                    <input type="hidden" name="package" value={currentSafari.title} />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Base Price</label>
                    <input
                      type="text"
                      className="form-control"
                      value={`${basePrice} AED`}
                      disabled
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">Total Price</label>
                    <input
                      type="text"
                      className="form-control"
                      value={`${totalPrice} AED`}
                      disabled
                    />
                  </div>

                  {addOnOptions.length > 0 && (
                    <div className="col-12">
                      <label className="form-label">Add-on Packages</label>
                      <div className="d-flex flex-wrap gap-2">
                        {addOnOptions.map((option, idx) => {
                          const isSelected = addOnVariants.some(v => v.name === option.name);
                          return (
                            <button
                              type="button"
                              key={idx}
                              className={`btn ${isSelected ? "btn-primary" : "btn-outline-primary"}`}
                              onClick={() => toggleAddOn(option)}
                            >
                              {option.name} (+{option.price} AED)
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="col-md-3">
                    <label className="form-label">No. of Adults</label>
                    <input type="number" className="form-control" name="adults" min="1" required />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">No. of Kids</label>
                    <input type="number" className="form-control" name="kids" min="0" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" name="message" rows="3" placeholder="Optional message"></textarea>
                  </div>

                  <div className="alert alert-success text-center py-2" role="alert">
                    💳 Enjoy 5% OFF when you pay online — secure your spot now!
                  </div>

                  <div className="col-12 d-flex gap-3">
                    <button
                      type="submit"
                      className="btn btn-warning w-100 d-flex justify-content-center align-items-center"
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
                      className="btn btn-light border w-100 d-flex justify-content-center align-items-center"
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
