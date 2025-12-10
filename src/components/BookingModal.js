"use client";

import { useBooking } from "./BookingContext";
import { useState, useEffect, useMemo, useRef } from "react";
import PhoneInput from './PhoneInputWrapper';
import { newPackageData } from "@/data/packages";
import PayPalButton from "./paypal/PayPalButton";
import ReCaptcha from './ReCaptcha';


export default function BookingModal() {
  const { show, close, selectedSafari } = useBooking();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [pendingPaymentType, setPendingPaymentType] = useState(null);
  const [phone, setPhone] = useState('');
  const [addOnVariants, setAddOnVariants] = useState([]);
  const [mounted, setMounted] = useState(false);

  // New state for the pickup date
  const [pickupDate, setPickupDate] = useState('');

  const [formAdults, setFormAdults] = useState(1);
  const [formKids, setFormKids] = useState(0);
  const [bookingId, setBookingId] = useState(null);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);
  const [packages, setPackages] = useState([])
  const [captchaToken, setCaptchaToken] = useState('')


  const paypalRef = useRef(null);

  // Utility to get today's date in YYYY-MM-DD format for the date input minimum
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!pendingPaymentType) return;
    const formElement = document.querySelector("#bookingForm");
    if (formElement) formElement.requestSubmit();
    setPendingPaymentType(null);
  }, [pendingPaymentType]);

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
        price: parsePrice(v.price),
        isGroupPackage: v.isGroupPackage || false,
        maxPeople: v.maxPeople || 6
      }))
    );
  }, [currentSafari]);

  const selectedVariant = sectionVariants.find(v => v.name === currentSafari?.title);
  const selectedIndex = sectionVariants.findIndex(v => v.name === currentSafari?.title);
  const addOnOptions = sectionVariants.slice(selectedIndex + 1);

  const toggleAddOn = (option) => {
    const exists = addOnVariants.find(v => v.name === option.name);
    setAddOnVariants(prev =>
      exists ? prev.filter(v => v.name !== option.name) : [...prev, option]
    );
  };

  const calculateTotalPrice = (basePrice, addOns, adults, kids, variant) => {
    const addOnTotal = addOns.reduce((sum, item) => sum + item.price, 0);
    const baseTotal = basePrice + addOnTotal;

    if (variant?.isGroupPackage) {
      const totalPeople = adults + kids;
      const vehicleCount = Math.ceil(totalPeople / variant.maxPeople);
      return baseTotal * vehicleCount;
    } else {
      const extraAdults = Math.max(adults - 1, 0);
      const extraCharge = (baseTotal / 2) * extraAdults;
      return baseTotal + extraCharge;
    }
  };

  const totalPrice = useMemo(() => {
    if (!selectedVariant) return 0;
    return calculateTotalPrice(
      selectedVariant.price,
      addOnVariants,
      formAdults,
      formKids,
      selectedVariant
    );
  }, [selectedVariant, addOnVariants, formAdults, formKids]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

      const recaptchaToken = await window.grecaptcha.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      { action: 'submit' }
    );

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      phone,
      pickupLocation: formData.get("pickupLocation"),
      pickupDate: formData.get("pickupDate"), // <-- Added pickup date here
      packages: [currentSafari?.title, ...addOnVariants.map(v => v.name)],
      price: totalPrice,
      adults: formAdults,
      kids: formKids,
      message: formData.get("message") || "",
      recaptchaToken
    };
    setPackages(data.packages)
    try {
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await bookingRes.json();
      if (!bookingRes.ok || !result.id) throw new Error("Booking failed");

      setBookingId(result.id);

      if (selectedPayment === "online") {
        setShowPayPalButtons(true);
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

  useEffect(() => {
    if (showPayPalButtons && bookingId && paypalRef.current) {
      paypalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });

      // add an offset after the smooth scroll finishes
      setTimeout(() => {
        const offset = 1000; // adjust until full button shows
        paypalRef.current?.closest(".modal-body")?.scrollBy({
          top: offset,
          behavior: "smooth"
        });
      }, 500);


    }
  }, [showPayPalButtons, bookingId]);

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
              <form id="bookingForm" onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">Name <strong className="text-danger">*</strong></label>
                    <input type="text" className="form-control" name="name" required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone Number <strong className="text-danger">*</strong></label>
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
                  
                  {/* New Pickup Date field added here */}
                  <div className="col-md-6">
                    <label className="form-label">Pickup Date <strong className="text-danger">*</strong></label>
                    <input
                      type="date"
                      className="form-control"
                      name="pickupDate"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={today}
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
                      value={`${selectedVariant?.price || 0} AED`}
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
                    <input
                      type="number"
                      className="form-control"
                      name="adults"
                      min="1"
                      required
                      value={formAdults}
                      onChange={(e) => setFormAdults(Number(e.target.value))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">No. of Kids</label>
                    <input
                      type="number"
                      className="form-control"
                      name="kids"
                      min="0"
                      value={formKids}
                      onChange={(e) => setFormKids(Number(e.target.value))}
                    />
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
                      type="button"
                      className="btn btn-warning w-100"
                      disabled={loading}
                      onClick={() => {
                        setPendingPaymentType("online");
                        setSelectedPayment("online");
                      }}
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
                      type="button"
                      className="btn btn-light border w-100"
                      disabled={loading}
                      onClick={() => {
                        setPendingPaymentType("offline");
                        setSelectedPayment("offline");
                      }}
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

              {showPayPalButtons && bookingId && (
                <div className="mt-4" ref={paypalRef}>
                  <PayPalButton bookingId={bookingId} price={totalPrice} description={packages} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}