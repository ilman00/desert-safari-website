"use client";
import { useState } from "react";
import Image from "next/image";
export default function AdminPackagesList({ packages }) {
  const [items, setItems] = useState(packages);

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this package?")) {
      await fetch(`/api/admin/custom-packages/delete/${id}`, { method: "DELETE" });
      setItems(items.filter((pkg) => pkg._id !== id));
    }
  }

  if (items.length === 0) {
    return <div className="alert alert-info">No packages available.</div>;
  }

  return (
    <div className="row g-4">
      {items.map((pkg) => (
        <div className="col-md-6 col-lg-4" key={pkg._id}>
          <div className="card shadow-sm h-100 border-0">
            {pkg.imageUrl && (
              <Image
                width={200}
                height={200}
                src={pkg.imageUrl}
                alt={pkg.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
            )}
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-semibold">{pkg.title}</h5>
              <p className="text-success fw-bold mb-2">${pkg.price}</p>

              {pkg.expiryDate && (
                <p className="small text-muted mb-2">
                  <i className="bi bi-calendar-event me-2"></i>
                  Expires: {new Date(pkg.expiryDate).toLocaleDateString()}
                </p>
              )}

              <p className="text-muted flex-grow-1">
                {pkg.description?.slice(0, 80)}...
              </p>

              <div className="d-flex gap-2 mt-auto">
                <a
                  href={`/packages/${pkg.slug}`}
                  className="btn btn-outline-primary btn-sm flex-fill"
                >
                  View
                </a>
                <a
                  href={`/packages/edit/${pkg._id}`}
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
  );
}
