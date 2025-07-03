'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton({ tourName, price, bookingId, disabled, loading, onSuccess }) {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tourName, price, bookingId }), // ✅ include bookingId
    });

    const { id } = await res.json();

    const result = await stripe.redirectToCheckout({ sessionId: id });

    if (result.error) {
      alert(result.error.message);
    } else {
      onSuccess?.(); // ✅ Optionally close modal on success
    }
  };


  return (
    <button
      className="btn btn-warning mt-2"
      onClick={handleClick}
      disabled={disabled}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Booking...
        </>
      ) : (
        `Book Now for ${price} AED`
      )}
    </button>
  );
}
