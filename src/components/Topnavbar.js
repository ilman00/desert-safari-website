// components/TopNavbar.js

import Link from "next/link";
export default function TopNavbar() {
  return (
    <div className="text-light py-3 " style={{ backgroundColor: "#005a5a" }}>
      <div className="ps-3 pe-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left Side: Contact Info */}
        <div className="mb-2 mb-md-0">
          <span className="me-3 p-3">
            <i className="bi bi-envelope-fill me-1"></i>
            info@safaridesert.ae
          </span>
          <span className="p-3">
            <i className="bi bi-telephone-fill me-1"></i>
            +971 55 123 4567
          </span>
        </div>

        {/* Right Side: Social Icons */}
        <div>
          <Link
            href="#"
            className="me-2 d-inline-flex align-items-center justify-content-center"
            style={{
              backgroundColor: '#4DAFA6', // lighter shade of #1B7D75
              color: '#fff',               // icon color
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              textDecoration: 'none',
              fontSize: '18px'
            }}
          >
            <i className="bi bi-facebook"></i>
          </Link>

          <Link href="#" className="me-2 d-inline-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#4DAFA6', // lighter shade of #1B7D75
            color: '#fff',               // icon color
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            textDecoration: 'none',
            fontSize: '18px'
          }}>
            <i className="bi bi-instagram"></i>
          </Link>
          <Link href="#" className="me-2 d-inline-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#4DAFA6', // lighter shade of #1B7D75
            color: '#fff',               // icon color
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            textDecoration: 'none',
            fontSize: '18px'
          }}>
            <i className="bi bi-tiktok"></i>
          </Link>
          <Link href="#" className="me-2 d-inline-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#4DAFA6', // lighter shade of #1B7D75
            color: '#fff',               // icon color
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            textDecoration: 'none',
            fontSize: '18px'
          }}>
            <i className="bi bi-youtube"></i>
          </Link>

        </div>
      </div>
    </div>
  );
}
