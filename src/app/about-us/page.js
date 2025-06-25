export default function AboutUs() {
  return (
    <>
      <section
        className="position-relative text-white text-center d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/images/desert-safari-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
        <div className="position-relative z-1">
          <h1 className="fw-bold display-4">About Safari Desert AE</h1>
          <p className="lead">Experience adventure, culture, and unforgettable moments.</p>
        </div>
      </section>
      <section className="container py-5 text-center">
        <p className="text-muted">Who We Are</p>
        <h2 className="fw-bold mb-4">Welcome to the Ultimate Desert Safari Experience in Dubai</h2>
        <p className="mx-auto" style={{ maxWidth: "800px" }}>
          Explore adventure, culture, and breathtaking desert views with Safari Desert AE. Our desert tours offer everything from thrilling dune bashing to cultural performances — all in the heart of the Arabian desert.
        </p>
      </section>
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src="/images/dubai-city-tours-1.jpg" alt="Our Story" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold">Our Story</h3>
            <p>
              Safari Desert AE was born out of a passion for showcasing the beauty and culture of the UAE’s vast deserts. We have served thousands of happy explorers with premium experiences, from 4x4 dune bashing to traditional shows.
            </p>
            <p>
              Our mission is to blend adventure with authenticity — to take you beyond the tourist spots and into the heart of the desert.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <div className="container text-center">
          <h3 className="fw-bold mb-4">Why Choose Safari Desert AE?</h3>
          <div className="row">
            {[
              { icon: "bi bi-car-front", title: "Modern 4x4 Rides", desc: "Enjoy safe and thrilling rides with our top-notch vehicles." },
              { icon: "bi bi-star", title: "Top Rated Tours", desc: "Hundreds of 5-star reviews from global travelers." },
              { icon: "bi bi-person-lines-fill", title: "Experienced Guides", desc: "Guides who bring culture and history to life." },
            ].map((item, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card h-100 shadow border-0">
                  <div className="card-body">
                    <i className={`${item.icon} text-success mb-3`} style={{ fontSize: "2rem" }}></i>
                    <h5 className="fw-bold">{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
      className="position-relative text-white text-center d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundImage: "url('/images/Liwa-Oasis-A-Desert-Escape-by-tripscpae-tourism-1-3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
      <div className="position-relative z-1">
        <h2 className="fw-bold mb-3">Ready for Your Desert Adventure?</h2>
        <a href="/booking" className="btn btn-warning btn-lg px-4">
          Book Now
        </a>
      </div>
    </section>
    

    </>

  )
}