'use client';

import Link from "next/link";
import Image from "next/image";

import { useBooking } from "@/components/BookingContext";

export default function SecondNavbar() {
  const { open } = useBooking();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm px-0">
      <div className="container-fluid px-0">
        <Link href="/" className="navbar-brand fw-bold ms-3">
          <Image src="/images/safari-desert.png" width={120} height={40} alt="Safari Desert" />
        </Link>

        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-4">
            <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link href="/packages" className="nav-link">Our Safari Packages</Link></li>
            <li className="nav-item"><Link href="/gallery" className="nav-link">Our Gallery</Link></li>
            <li className="nav-item"><Link href="/about-us" className="nav-link">About Us</Link></li>
            <li className="nav-item"><Link href="/contact-us" className="nav-link">Contact Us</Link></li>
            <li className="nav-item"><Link href="/faqs" className="nav-link">FAQs</Link></li>
          </ul>
        </div>

        {/* Booking Button triggers modal */}
        <div className="d-none d-lg-block me-3">
          <button onClick={() => open()} className="btn btn-warning">Booking</button>
        </div>
      </div>
    </nav>
  );
}
