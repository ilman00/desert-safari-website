// components/TopNavbar.js

import Link from "next/link";

export default function AdminLayout({ children }) {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm px-0">
                <div className="container-fluid px-0">
                    <Link href="/admin/dashboard" className="navbar-brand fw-bold ms-3">
                        <h3>Admin Dashboard</h3>
                    </Link>

                    <button
                        className="navbar-toggler me-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-4">
                            <li className="nav-item bg-secondary rounded"><Link href="/admin/custom-packages" className="nav-link text-light">Custom Packages</Link></li>
                            <li className="nav-item bg-success rounded"><Link href="/admin/create-custom-package" className="nav-link text-light">Create  Package</Link></li>
                        </ul>
                    </div>

                    {/* Booking Button triggers modal */}
                    <div className="d-none d-lg-block me-3">
                        <Link href="/packages" className="btn btn-primary">Register An Admin</Link>
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
}
