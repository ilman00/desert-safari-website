"use client"
async function getPackages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/custom-package`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function AdminPackagesPage() {
  const packages = await getPackages();

  return (
    <div className="container my-5">
      <h1 className="mb-4 fw-bold">All Custom Packages</h1>

      {packages.length === 0 ? (
        <div className="alert alert-info">No packages available.</div>
      ) : (
        <div className="row g-4">
          {packages.map((pkg) => (
            <div className="col-md-6 col-lg-4" key={pkg._id}>
              <div className="card shadow-sm h-100 border-0">
                {/* Image */}
                {pkg.imageUrl && (
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  {/* Title */}
                  <h5 className="card-title fw-semibold">{pkg.title}</h5>

                  {/* Price */}
                  <p className="text-success fw-bold mb-2">${pkg.price}</p>

                  {/* Expiry */}
                  {pkg.expiryDate && (
                    <p className="small text-muted mb-2">
                      <i className="bi bi-calendar-event me-2"></i>
                      Expires:{" "}
                      {new Date(pkg.expiryDate).toLocaleDateString()}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-muted flex-grow-1">
                    {pkg.description?.slice(0, 80)}...
                  </p>

                  {/* Actions */}
                  <div className="d-flex gap-2 mt-auto">
                    <a
                      href={`/packages/${pkg.slug}`}
                      className="btn btn-outline-primary btn-sm flex-fill"
                    >
                      View
                    </a>
                    <a
                      href={`/admin/packages/edit/${pkg._id}`}
                      className="btn btn-outline-warning btn-sm flex-fill"
                    >
                      Edit
                    </a>
                    <button
                      className="btn btn-outline-danger btn-sm flex-fill"
                      onClick={() => handleDelete(pkg._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// (Optional) Delete Handler
async function handleDelete(id) {
  if (confirm("Are you sure you want to delete this package?")) {
    await fetch(`/api/custom-package/${id}`, { method: "DELETE" });
    location.reload(); // refresh page after deletion
  }
}
