// components/Footer.js
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Image from "next/image";
export default function Footer() {
  return (
    <footer
      className="text-light pt-5"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #1b7d75, #00322f)", 
      }}
    >
      <div className="container-fluid">
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-12 col-md-6 col-lg-3">
            <Image
              src="/images/safari-desert.png"
              alt="Safari Desert"
              width={180}
              height={60}
              className="mb-3"
            />
            <p>
              Safari Desert AE has desert safari in Dubai that include pick-up
              and drop-off, a BBQ, and a camel ride. Arabian Desert Tour is the
              best company in Dubai, UAE, for city tours and desert safaris.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="#"
                className="text-light"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                }}
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-light"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                }}
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-light"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                }}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-light"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                }}
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="text-light"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                }}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="mb-3 text-uppercase text-warning">Our Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#evening" className="text-light text-decoration-none">Evening Desert Safari</a>
              </li>
              <li className="mb-2">
                <a href="#Morning" className="text-light text-decoration-none">Morning</a>
              </li>
              <li className="mb-2">
                <a href="#private" className="text-light text-decoration-none">Private Desert Safari</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Safari Desert With Dune Buggy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">UAE City Tours</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="mb-3 text-uppercase text-warning">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-light">Help Center</li>
              <li className="mb-2 text-light">Ticket Support</li>
              <li className="mb-2 text-light">FAQ</li>
              <li className="mb-2 text-light">Contact Us</li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="mb-3 text-uppercase text-warning">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Article & News</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Our Gallary</a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-light mt-5" />
        <p className="text-center mb-0 pb-3">
          &copy; {new Date().getFullYear()} Safari Desert AE. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
