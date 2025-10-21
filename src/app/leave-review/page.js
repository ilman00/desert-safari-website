'use client';

import { useState } from 'react';

export default function LeaveReview() {
  const [form, setForm] = useState({ name: '', rating: 5, message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('Thank you! Your review will appear after admin approval.');
        setForm({ name: '', rating: 5, message: '' });
      } else {
        setStatus('Error submitting review.');
      }
    } catch (err) {
      setStatus('Server error.');
    }
  };

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">Leave a Review</h2>

      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 shadow-sm border rounded-4"
        style={{ maxWidth: '500px' }}
      >
        <div className="mb-3">
          <label className="form-label">Name (optional)</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating</label>
          <select
            className="form-select"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Your Review</label>
          <textarea
            className="form-control"
            rows={4}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Review
        </button>

        {status && <p className="text-center mt-3 text-muted">{status}</p>}
      </form>
    </section>
  );
}
