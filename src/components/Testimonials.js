'use client';

import Image from "next/image";

export default function Testimonials() {
 
  const testimonials = [
    {
      name: 'Ayesha Khan',
      role: 'Tourist from Pakistan',
      image: '/images/girl.png',
      message: 'The city tour was incredible! Well organized and the guide was super friendly. Highly recommended!',
    },
    {
      name: 'John Smith',
      role: 'Traveler from UK',
      image: '/images/man.jpg',
      message: 'A seamless experience from pickup to drop-off. Truly the best way to explore Dubai’s highlights.',
    },
    {
      name: 'Fatima Ali',
      role: 'Visitor from KSA',
      image: '/images/girl.png',
      message: 'Loved every moment of the desert safari. Great service and unforgettable views!',
    },
    {
      name: 'Ali Raza',
      role: 'Backpacker from Lahore',
      image: '/images/man.png',
      message: 'Affordable and professional — I’ll book again on my next visit to the UAE!',
    },
    {
      name: 'Emma Watson',
      role: 'Frequent Flyer',
      image: '/images/girl.png',
      message: 'Clean vehicles, kind drivers, and epic views. My favorite tour experience ever!',
    },
  ];

  // Group testimonials in sets of 3
  const groups = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    groups.push(testimonials.slice(i, i + 3));
  }

  return (
    <section className="container-fluid py-5" id="testimonials">
      <h2 className="text-center mb-4">What Our Guests Say</h2>

      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
        <div className="carousel-inner">
          {groups.map((group, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <div className="row">
                {group.map((t, index) => (
                  <div key={index} className="col-md-4">
                    <div className="card h-100 shadow-sm p-4 mx-2">
                      <i className="bi bi-quote text-warning fs-2 mb-3"></i>
                      <p className="text-muted">{t.message}</p>
                      <div className="d-flex align-items-center mt-3">
                        <Image
                          src={t.image}
                          alt={t.name}
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                          style={{ objectFit: 'cover' }}
                        />
                        <div>
                          <strong>{t.name}</strong>
                          <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="carousel-indicators mt-4">
          {groups.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
