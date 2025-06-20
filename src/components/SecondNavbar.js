import Link from "next/link";

export default function SecondNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm px-0">
      <div className="container-fluid px-0">
        {/* Brand */}
        <Link href="/" className="navbar-brand fw-bold ms-3">
          <img src="/images/safari-desert.png" alt="Safari Desert" height="40" />
        </Link>

        {/* Mobile Toggle */}
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

        {/* Nav Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-4">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/#packages" className="nav-link">Our Safari Packages</Link>
            </li>
            <li className="nav-item">
              <Link href="/gallery" className="nav-link">Our Gallery</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">About Us</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link href="/faqs" className="nav-link">FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Booking Button */}
        <div className="d-none d-lg-block me-3">
          <Link href="/book" className="btn btn-warning">Booking</Link>
        </div>
      </div>
    </nav>
  );
}
