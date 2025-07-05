// components/Footer.js
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="text-light pt-5"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #1b7d75, #00322f)",
        fontWeight: "200",
      }}
    >
      <div className="container-fluid">
        {/* Flex container to separate left and right sections */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-4">
          {/* Left: Company Info and Social Icons */}
          <div className="col-lg-4">
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
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn].map(
                (Icon, idx) => (
                  <a
                    key={idx}
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
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right: Grouped Services/Support/Company */}
          <div className="col-lg-7">
            <div className="row">
              {/* Our Services */}
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <h5 className="mb-3 text-uppercase text-warning">Our Services</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="/#evening" className="text-light text-decoration-none">
                      Evening Desert Safari
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/#Morning" className="text-light text-decoration-none">
                      Morning
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/#private" className="text-light text-decoration-none">
                      Private Desert Safari
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/#dune-buggy" className="text-light text-decoration-none">
                      Safari Desert With Dune Buggy
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/#UAE-city-tours" className="text-light text-decoration-none">
                      UAE City Tours
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <h5 className="mb-3 text-uppercase text-warning">Support</h5>
                <ul className="list-unstyled">
                  <li className="mb-2 text-light">Help Center</li>
                  <li className="mb-2 text-light">Ticket Support</li>
                  <li className="mb-2 text-light">FAQ</li>
                  <li className="mb-2 text-light">Contact Us</li>
                </ul>
              </div>

              {/* Company */}
              <div className="col-12 col-md-4">
                <h5 className="mb-3 text-uppercase text-warning">Company</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="/about-us" className="text-light text-decoration-none">
                      About Us
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-light text-decoration-none">
                      Article & News
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/contact-us" className="text-light text-decoration-none">
                      Contact Us
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/gallery" className="text-light text-decoration-none">
                      Our Gallery
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-light mt-5" />
        <p className="text-center mb-0 pb-3">
          &copy; {new Date().getFullYear()} Safari Desert AE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
