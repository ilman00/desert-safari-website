export default function PackageCard({ image, title, price, features, whatsappLink, bookLink }) {
  return (
    <article className="card h-100 shadow-sm">
      {/* Package Image */}
      <img src={image} className="card-img-top" alt={`${title} in Dubai`} />

      {/* Package Details */}
      <div className="card-body">
        <h3 className="card-title h5 text-center">{title}</h3>
        <p className="text-center fw-bold text-success mb-3">{price}</p>

        {/* Feature List */}
        <ul className="list-unstyled">
          {features.map((item, index) => (
            <li
              key={index}
              className="py-2 px-3 px-md-3 border-secondary" 
              style={{ fontSize: "clamp(1rem, 1.3vw, 1.5rem)", borderBottom: "0.5px solid rgba(c,c,c)" }}
            >
              {item}
            </li>

          ))}
        </ul>
      </div>

      <div className="card-footer d-flex align-items-center gap-2 px-3 pb-3 bg-white border-0">
        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          className="btn border-warning btn-sm w-50 d-flex align-items-center justify-content-center fw-bold"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            height: "100%", // allow flex alignment
          }}
        >
          <i className="bi bi-whatsapp me-1"></i> WhatsApp
        </a>

        {/* Book Now Button */}
        <a
          href={bookLink}
          className="btn btn-warning w-50 d-flex align-items-center justify-content-center"
          style={{
            height: "48px", // make this taller
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Book Now
        </a>
      </div>



    </article>
  );
}
