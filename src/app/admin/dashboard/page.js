'use client'; // ✅ MUST be at the top

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct


export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') {
        router.push('/admin/login');
        return;
      }
    } catch (err) {
      router.push('/admin/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/admin/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setBookings(data.bookings || []);
        } else {
          setError(data.error || 'Failed to fetch bookings');
        }
      } catch (err) {
        setError('Something went wrong');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">📋 Safari Bookings</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Pickup</th>
              <th>Package</th>
              <th>Price</th>
              <th>Adults</th>
              <th>Kids</th>
              <th>Message</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b, i) => (
                <tr key={b._id}>
                  <td>{i + 1}</td>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.pickupLocation}</td>
                  <td>{b.safariPackage}</td>
                  <td>${b.price}</td>
                  <td>{b.adults}</td>
                  <td>{b.kids}</td>
                  <td className="text-wrap" style={{ maxWidth: 200 }}>{b.message || '-'}</td>
                  <td>
                    <span className={`badge ${b.paymentStatus === 'paid' ? 'bg-success' : 'bg-secondary'}`}>
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center text-muted">No bookings yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
