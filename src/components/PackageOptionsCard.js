"use client";

import Image from "next/image";
import { useState } from "react";
import { useBooking } from "@/components/BookingContext";

export default function HotAirBalloonCard({
  id,
  title,
  image,
  description,
  options = [], // Array of { label: string, price: string }
  whatsappNumber = "+923499038984"
}) {
  const { open } = useBooking();
  const [selected, setSelected] = useState(options[0]);

  const handleBooking = () => {
    const safari = {
      title: `${title} (${selected.label})`,
      price: selected.price,
    };
    open(safari);
  };

  return (
    <div id={id} className="card h-100 shadow-sm p-5" style={{ minHeight: "100vh" }}>
      {/* Heading */}
      <div className="card-header bg-white border-bottom-0">
        <h4 className="text-center mb-0">{title}</h4>
      </div>

      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: "220px" }}>
        <Image
          src={image}
          alt={title}
          fill
          className="card-img-top"
          style={{
            objectFit: "cover",
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
          }}
        />
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">
        {/* Dynamic Price */}
        <h5 className="text-success fw-bold text-center mb-3">
          {selected.price}
        </h5>

        {/* Paragraph */}
        <p className="card-text text-muted text-center" style={{ fontSize: "0.95rem" }}>
          {description}
        </p>

        {/* Option Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap">
          {options.map((option, index) => (
            <button
              key={index}
              className={`btn ${
                selected.label === option.label
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setSelected(option)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Book Now Button */}

        <div className="mt-auto d-flex flex-column flex-md-row justify-content-center gap-3">
        <button onClick={handleBooking} className="btn btn-warning px-4 py-2">
          Book Online
        </button>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in booking the ${title} (${selected.label}).`}
          className="btn btn-success px-4 py-2 d-flex align-items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-whatsapp"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.958 7.958 0 0 0 8.002 0C3.582 0 .004 3.578.004 7.998c0 1.41.372 2.782 1.078 3.995L.055 16l4.108-1.074a7.972 7.972 0 0 0 3.838.98h.002c4.42 0 8.003-3.578 8.003-7.998a7.96 7.96 0 0 0-2.405-5.582zM8.002 14.67a6.638 6.638 0 0 1-3.385-.918l-.242-.144-2.437.637.65-2.374-.158-.244a6.62 6.62 0 0 1-1.017-3.47c0-3.655 2.976-6.63 6.634-6.63a6.61 6.61 0 0 1 4.709 1.954 6.583 6.583 0 0 1 1.926 4.679c0 3.654-2.975 6.63-6.63 6.63zm3.602-4.85c-.198-.099-1.174-.58-1.357-.646-.183-.066-.316-.099-.45.1-.132.198-.516.646-.633.779-.116.132-.233.148-.431.05-.198-.1-.837-.308-1.595-.983-.59-.528-.987-1.18-1.102-1.379-.116-.198-.012-.305.087-.403.089-.088.198-.232.298-.348.099-.116.132-.199.198-.331.066-.132.033-.248-.017-.347-.05-.1-.45-1.079-.616-1.478-.162-.389-.327-.337-.45-.343-.116-.006-.248-.007-.38-.007s-.347.05-.53.248c-.183.199-.696.68-.696 1.66 0 .978.713 1.922.812 2.053.099.132 1.4 2.135 3.395 2.992.475.205.844.327 1.132.418.476.151.91.13 1.253.079.382-.057 1.174-.48 1.34-.942.165-.462.165-.858.116-.942-.05-.083-.182-.132-.38-.232z" />
          </svg>
          Book on WhatsApp
        </a>
        </div>
      </div>
    </div>
  );
}
