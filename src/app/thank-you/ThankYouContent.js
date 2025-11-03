'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ThankYouContent() {
  const params = useSearchParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const booking = {
      name: params.get('name'),
      price: parseFloat(params.get('price')) || 0,
      bookingId: params.get('bookingId'),
      currency: params.get('currency') || 'AED',
    };
    setDetails(booking);
  }, [params]);

  // ✅ Fire Google Ads conversion once details are loaded
  useEffect(() => {
    if (details && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17520497621/cpiqCNuzobkbENWntqJB',
        value: details.price,
        currency: details.currency,
      });
      console.log('✅ Google Ads conversion fired:', details);
    }
  }, [details]);

  if (!details) return null;

  return (
    <div className="container text-center my-5">
      <h1 className="text-success fw-bold">Thank you for your booking!</h1>
      <p className="mt-3">
        Your booking for <strong>{details.name}</strong> was successful.
      </p>
      <p>
        Amount Paid: <strong>{details.price} {details.currency}</strong>
      </p>
      <p>Booking ID: {details.bookingId}</p>
    </div>
  );
}
