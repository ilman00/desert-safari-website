"use client";
import React from "react";
import "./ImageCard.css";

export default function ImageCard({ src, alt = "Gallery Image" }) {
  return (
    <div className="col-6 col-md-3 mb-4 d-flex justify-content-center">
      <div className="image-wrapper position-relative rounded overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="img-fluid w-100 h-100 object-fit-cover image-zoom"
        />
        <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 rounded"></div>
      </div>
    </div>
  );
}
