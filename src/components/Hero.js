import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="position-relative"
      style={{
        backgroundImage: "url('/images/desert-safari-background.jpg')", // Update with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "70vh",
      }}
    >
      {/* Fullscreen Blur Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0, 90, 90, 0.4)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(27, 125, 117, 0.3)",
          zIndex: 0,
        }}
      ></div>

      {/* Overlay Content */}
      <div
        className="container text-light text-center d-flex flex-column justify-content-center align-items-center position-relative"
        style={{ minHeight: "70vh", zIndex: 1 }}
      >
        <h1 className="display-4 fw-bold">
          Unleash the Adventure – Experience the Best Desert Safari Dubai!
        </h1>
        <p className="lead">
          Embark on an unforgettable desert safari Dubai adventure with Safari Desert AE. Enjoy thrilling buggy and quad bike rides, serene camel trekking, breathtaking desert safari Dubai experiences, and live entertainment with belly dance and BBQ. Book now for the ultimate UAE desert safari Dubai experience!
        </p>
        <Link href="/packages" className="btn btn-warning btn-lg mt-3 text-light">
          View Packages
        </Link>
      </div>
    </section>
  );
}
