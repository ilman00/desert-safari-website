'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const groups = [];
  for (let i = 0; i < reviews.length; i += 3) {
    groups.push(reviews.slice(i, i + 3));
  }

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;

  const StarRating = ({ rating }) => (
    <div className="mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi bi-star${star <= rating ? "-fill" : ""} text-warning`}
          style={{ fontSize: "1.1rem", marginRight: "2px" }}
        ></i>
      ))}
    </div>
  );


  if (loading) {
    return (
      <section className="container py-5 text-center">
        <p>Loading reviews...</p>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="container py-5 text-center">
        <p>No reviews yet.</p>
      </section>
    );
  }

  return (
    <section className="container-fluid py-5 bg-light" id="reviews">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-3">Customer Reviews</h2>
          <div className="d-flex align-items-center justify-content-center mb-2">
            <div className="me-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className="bi bi-star-fill text-warning"
                  style={{ fontSize: "1.3rem" }}
                ></i>
              ))}
            </div>
            <span className="fs-4 fw-bold">{averageRating}</span>
          </div>
          <p className="text-muted">Based on {reviews.length} reviews</p>
        </div>

        <div
          id="reviewCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-inner">
            {groups.map((group, i) => (
              <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                <div className="row">
                  {group.map((review) => (
                    <div key={review._id} className="col-md-4 mb-3 mb-md-0">
                      <div className="card h-100 shadow-sm p-4 mx-2 border-0">
                        <StarRating rating={review.rating || 5} />
                        <p className="text-muted mb-4" style={{ minHeight: "80px" }}>
                          &ldquo;{review.message}&rdquo;
                        </p>
                        <div className="d-flex align-items-center mt-auto pt-3 border-top">
                          <Image
                            src={"/images/man.jpg"}
                            alt={review.name}
                            className="rounded-circle me-3"
                            width="50"
                            height="50"
                            style={{ objectFit: "cover" }}
                          />
                          <div>
                            <strong className="d-block">{review.name}</strong>
                            <small className="text-muted">{review.date?.slice(0, 10)}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#reviewCarousel"
            data-bs-slide="prev"
            style={{ width: "5%" }}
          >
            <span
              className="carousel-control-prev-icon bg-dark rounded-circle p-3"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#reviewCarousel"
            data-bs-slide="next"
            style={{ width: "5%" }}
          >
            <span
              className="carousel-control-next-icon bg-dark rounded-circle p-3"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>

          <div className="carousel-indicators position-relative mt-4">
            {groups.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#reviewCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
