"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/BookingContext"; 
import "animate.css";
import Image from "next/image";

export default function PackageCard({ image, title, price, features, whatsappLink }) {
  console.log("Rendering card with title:", title);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);
  const { open } = useBooking(); // ✅ use context hook

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const handleBookNow = () => {
    const safari = {
      title,
      price,
    };
    console.log("Opening modal with safari:", safari); // ✅ DEBUG
    open(safari);
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
      {/* Package Image */}
      <Image
        src={image}
        alt={`${title} in Dubai`}
        width={400}
        height={250}
        className="card-img-top img-fluid"
        style={{ objectFit: "cover" }}
      />

      {/* Package Details */}
      <div className="card-body">
        <h3 className="card-title h5 text-center">{title}</h3>
        <p className="text-center fw-bold text-success mb-3">{price}</p>

        <ul className="list-unstyled">
          {features.map((item, index) => (
            <li
              key={index}
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
                borderBottom: index !== features.length - 1 ? "1px solid rgba(0, 0, 0, 0.15)" : "none",
                padding: "1rem",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="card-footer d-flex align-items-center gap-2 px-3 pb-3 bg-white border-0">
        <a
          href={whatsappLink}
          className="btn border-warning btn-sm w-50 d-flex align-items-center justify-content-center fw-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-whatsapp me-1"></i> WhatsApp
        </a>

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
