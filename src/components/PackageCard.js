"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/BookingContext";
import "animate.css";
import Image from "next/image";

export default function PackageCard({ image, title, whatsappLink, bookLink, variants }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { open } = useBooking();

  // ✅ Defensive: fallback to empty array and object
  const safeVariants = Array.isArray(variants) ? variants : [];
  const selectedVariant = safeVariants?.[selectedVariantIndex] || safeVariants?.[0] || {
    name: title || "Unnamed Package",
    price: "N/A",
    features: [],
  };

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  const handleBookNow = () => {
    open({
      title: selectedVariant.name,
      price: selectedVariant.price,
    });
  };

  return (
    <article
      ref={ref}
      className={`card h-100 shadow-sm animate__animated ${isVisible ? "animate__fadeInLeft" : ""}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateX(-50px)",
        transition: "all 0.6s ease-out",
      }}
    >
      {/* Image */}
      <div style={{ width: "100%", height: "300px", position: "relative" }}>
        <Image
          src={image}
          alt={`${title || selectedVariant.name} in Dubai`}
          fill
          style={{ objectFit: "cover" }}
          className="card-img-top"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Details */}
      <div className="card-body">
        <h3 className="card-title h5 text-center">{selectedVariant.name}</h3>

        {/* Toggle Buttons */}
        {safeVariants.length > 1 && (
          <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
            {safeVariants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariantIndex(index)}
                className={`btn btn-sm ${index === selectedVariantIndex ? "btn-warning" : "btn-outline-warning"}`}
              >
                {variant.btnVal || variant.name || `Option ${index + 1}`}
              </button>
            ))}
          </div>
        )}

        {selectedVariant.price && (
          <p className="text-center fw-bold text-success mb-3">{selectedVariant.price}</p>
        )}

        {/* Features */}
        <ul className="list-unstyled">
          {Array.isArray(selectedVariant.features) &&
            selectedVariant.features.map((item, index) => (
              <li
                key={index}
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
                  borderBottom:
                    index !== selectedVariant.features.length - 1 ? "1px solid rgba(0, 0, 0, 0.15)" : "none",
                  padding: "0.4rem",
                }}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>

      {/* Footer Buttons */}
      <div className="card-footer d-flex align-items-center gap-2 px-3 pb-3 bg-white border-0">
        {whatsappLink && (
          <a
            href={whatsappLink}
            className="btn border-warning btn-sm w-50 d-flex align-items-center justify-content-center fw-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-whatsapp me-1"></i> WhatsApp
          </a>
        )}

        <button
          onClick={handleBookNow}
          className="btn btn-warning w-50 d-flex align-items-center justify-content-center"
          style={{ height: "48px", fontWeight: "bold", fontSize: "1rem" }}
        >
          Book Now
        </button>
      </div>
    </article>
  );
}
