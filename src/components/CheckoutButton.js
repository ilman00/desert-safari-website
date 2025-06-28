'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton({ tourName, price }) {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ tourName, price }),
    });

    const { id } = await res.json();

    const result = await stripe.redirectToCheckout({ sessionId: id });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <button
      className="btn btn-warning mt-2"
      onClick={handleClick}
    >
      Book Now
    </button>
  );
}
