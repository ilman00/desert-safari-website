'use client';

import { useEffect, useState } from 'react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews/all');
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
    setLoading(false);
  };

  const approveReview = async (id) => {
    try {
      setActionStatus('Approving...');
      await fetch(`/api/reviews/${id}`, { method: 'PATCH' });
      await fetchReviews();
      setActionStatus('Approved successfully.');
    } catch (error) {
      setActionStatus('Error approving.');
    }
  };

  const deleteReview = async (id) => {
    try {
      setActionStatus('Deleting...');
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      await fetchReviews();
      setActionStatus('Deleted successfully.');
    } catch (error) {
      setActionStatus('Error deleting.');
    }
  };

  if (loading) return <p className="text-center py-5">Loading reviews...</p>;

  return (
    <section className="container py-5">
      <h2 className="mb-4">Manage Customer Reviews</h2>
      {actionStatus && <p className="text-success">{actionStatus}</p>}

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r._id}>
                <td>{r.name || 'Anonymous'}</td>
                <td>{r.rating} ⭐</td>
                <td style={{ maxWidth: '300px' }}>{r.message}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === 'approved' ? 'bg-success' : 'bg-warning text-dark'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>
                  {r.status === 'pending' && (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => approveReview(r._id)}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteReview(r._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
