// components/TopNavbar.js

import Link from "next/link";

export default function TopNavbar() {
  const socialLinks = [
    { name: "facebook", url: "https://www.facebook.com/profile.php?id=61572858855822" },
    { name: "instagram", url: "https://www.instagram.com/YourProfile" },
    { name: "tiktok", url: "https://www.tiktok.com/@YourHandle" },
    { name: "youtube", url: "https://www.youtube.com/YourChannel" },
  ];

  return (
    <div className="container-fluid text-light py-3" style={{ backgroundColor: "#005a5a" }}>
      <div className="row justify-content-between align-items-center px-3">
        
        {/* Left Side: Contact Info */}
        <div className="col-12 col-md-auto mb-2 mb-md-0 text-center text-md-start">
          <span className="me-3 d-block d-md-inline">
            <i className="bi bi-envelope-fill me-1"></i>
            eesamuneeb@gmail.com
          </span>
          <span className="d-block d-md-inline">
            <i className="bi bi-telephone-fill me-1"></i>
            +971 50 424 7436
          </span>
        </div>

        {/* Right Side: Social Icons */}
        <div className="col-12 col-md-auto text-center text-md-end">
          {socialLinks.map(({ name, url }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="me-2 d-inline-flex align-items-center justify-content-center"
              style={{
                backgroundColor: '#4DAFA6',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                textDecoration: 'none',
                fontSize: '18px'
              }}
            >
              <i className={`bi bi-${name}`}></i>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
