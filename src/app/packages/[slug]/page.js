import CustomBookingModal from "../../../components/custom-packages/CustomeBookingModal";

async function getPackage(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/custom-package/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function PackagePage({ params }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h2 className="text-danger mb-2">Package not found</h2>
        <p className="text-muted">
          The package you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div
        className="card shadow-lg border-0 rounded-4 mx-auto"
        style={{ maxWidth: "700px" }}
      >
        {/* Image */}
        {pkg.imageUrl && (
          <Image
            width={500}
            height={500}
            src={pkg.imageUrl}
            alt={pkg.title}
            className="card-img-top rounded-top-4"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        )}

        <div className="card-body p-4">
          {/* Title */}
          <h1 className="card-title h2 fw-bold mb-3">{pkg.title}</h1>

          {/* Price */}
          <h4 className="text-success fw-semibold mb-3">${pkg.price}</h4>

          {/* Description */}
          {pkg.description && (
            <p className="card-text text-muted mb-3">{pkg.description}</p>
          )}

          {/* Expiry Date */}
          {pkg.expiryDate && (
            <p className="small text-secondary mb-4">
              <i className="bi bi-calendar-event me-2"></i>
              <strong>Expires on:</strong>{" "}
              {new Date(pkg.expiryDate).toLocaleDateString()}
            </p>
          )}

          {/* Addons */}
          {pkg.addons?.length > 0 && (
            <div className="mb-4">
              <ul className="list-group list-group-flush">
                {pkg.addons.map((addon, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{addon.name}</span>
                    {addon.price && (
                      <span className="text-muted">${addon.price}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex gap-3">
            {/* Online Booking opens modal */}
            <CustomBookingModal pkg={pkg} />

            <a
              href={`https://wa.me/923000000000?text=I%20want%20to%20book%20${encodeURIComponent(
                pkg.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success flex-fill btn-lg rounded-3 d-flex align-items-center justify-content-center"
            >
              <i className="bi bi-whatsapp me-2"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
