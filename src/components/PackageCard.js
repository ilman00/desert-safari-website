"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import "animate.css";


export default function PackageCard({ image, title, price, features, whatsappLink, bookLink }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const cardClasses = `card h-100 shadow-sm ${isVisible ? "animate__animated animate__fadeInLeft" : ""}`;

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
      <img src={image} className="card-img-top" alt={`${title} in Dubai`} />

      {/* Package Details */}
      <div className="card-body">
        <h3 className="card-title h5 text-center">{title}</h3>
        <p className="text-center fw-bold text-success mb-3">{price}</p>

        {/* Feature List */}
        <ul className="list-unstyled">
          {features.map((item, index) => (
            <li
              key={index}
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
                borderBottom: index !== features.length - 1 ? "1px solid rgba(0, 0, 0, 0.15)" : "none",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
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
        <a
          href={bookLink}
          className="btn btn-warning w-50 d-flex align-items-center justify-content-center"
          style={{
            height: "48px",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Book Now
        </a>
      </div>
    </article>
  );
}
