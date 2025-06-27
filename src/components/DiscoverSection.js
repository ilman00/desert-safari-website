"use client";

import { useBooking } from "@/components/BookingContext";

export default function DiscoverSection() {
    const { open } = useBooking();

    return (
      <section
        className="position-relative text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: 'url("/images/desert-safari-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Full blur overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }}
        ></div>
  
        {/* Content */}
        <div className="container position-relative z-2">
          <div className="p-4">
            <p>DISCOVER MORE</p>
            <h2 className="mb-3">Thrill, Adventure & Memories – Your Ultimate Desert Safari Dubai</h2>
            <p className="mb-0">
            An exciting desert safari excursion in Dubai is exactly what you need for an unforgettable evening. Safari Desert AE in Dubai offers one of the top desert safari experiences, quickly becoming one of the most popular tourist activities in Dubai. With thrilling dune bashing, camel rides, and cultural shows, this desert safari in Dubai is a must-do for adventure lovers and those seeking unique experiences in the heart of the desert.
            </p>
            <div className="mt-5 text-center">
            <button 
              onClick={() => open()} 
              className="btn btn-warning px-4"
            >
              Book Now
            </button>
          </div>
          </div>
        </div>
      </section>
    );
  }
  