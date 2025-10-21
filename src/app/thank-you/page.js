'use client';

import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function ThankYouPage() {
  const params = useSearchParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const booking = {
      name: params.get('name'),
      price: parseFloat(params.get('price')),
      bookingId: params.get('bookingId'),
      currency: params.get('currency') || 'AED',
    };
    setDetails(booking);
  }, [params]);

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

      {/* Google Ads Conversion Tracking */}
      <Script id="google-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', {
            send_to: 'AW-17274073545/AbCdEfGhIjKlmNoPqR', // Replace with your label
            value: ${details.price},
            currency: '${details.currency}'
          });
        `}
      </Script>
    </div>
  );
}
