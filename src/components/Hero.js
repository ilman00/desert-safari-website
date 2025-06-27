export default function Hero() {
  return (
    <section className="position-relative">
      {/* Background Video */}
      <video
        className="w-100 position-absolute top-0 start-0 h-100 object-fit-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ zIndex: -2 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fullscreen Blur Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "	rgba(0, 90, 90, 0.7)", // your color with transparency
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(27, 125, 117, 0.3)",
          zIndex: -1,
        }}
      ></div>


      {/* Overlay Content */}
      <div
        className="container text-light text-center d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100vh', zIndex: 1 }}
      >
        <h1 className="display-4 fw-bold">Unleash the Adventure – Experience the Best Desert Safari Dubai!</h1>
        <p className="lead">Embark on an unforgettable desert safari Dubai adventure with Safari Desert AE. Enjoy thrilling buggy and quad bike rides, serene camel trekking, breathtaking desert safari Dubai experiences, and live entertainment with belly dance and BBQ. Book now for the ultimate UAE desert safari Dubai experience!</p>
        <a href="/packages" className="btn btn-warning btn-lg mt-3 text-light">
          View Packages
        </a>
      </div>
    </section>
  );
}
