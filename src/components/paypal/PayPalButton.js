'use client';

import { useEffect, useRef } from 'react';
import { loadScript } from '@paypal/paypal-js';

export default function PayPalButton({ bookingId, price, description }) {
  const loadedRef = useRef(false);
  console.log("Paypal CLient Id", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_LIVE);

  useEffect(() => {
    if (!price) {
      console.warn("⛔ Price is missing. PayPal button won't load.");
      return;
    }

    if (loadedRef.current) return;
    loadedRef.current = true;

    const loadPayPal = async () => {
      try {
        // Load PayPal SDK script
        await loadScript({
          'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_LIVE,
          'disable-funding': 'venmo,paylater',
          components: 'buttons',
        });

        if (!window.paypal) {
          throw new Error("PayPal SDK not available after script load.");
        }

        // Clean up any previous renders (important if button reloads)
        const container = document.getElementById('paypal-button-container');
        if (container) container.innerHTML = '';

        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'black',
            shape: 'rect',
            label: 'pay',
          },
          createOrder: async () => {
            const res = await fetch('/api/paypal/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ price, bookingId, description }),
            });

            const data = await res.json();
            if (!data.id) throw new Error("No order ID returned");
            return data.id;
          },
          onApprove: async (data) => {
            const res = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderID: data.orderID, bookingId, description }),
            });

            const details = await res.json();
            if (details.status === 'COMPLETED') {
              const params = new URLSearchParams({
                name: description,
                price: price,
                bookingId: bookingId,
                currency: 'USD',
              });

              window.location.href = `/thank-you?${params.toString()}`;
              
            } else {
              alert("⚠️ Payment not completed.");
            }
          },
          onError: (err) => {
            console.error("PayPal Error:", err);
            alert("❌ PayPal payment failed.");
          },
        }).render('#paypal-button-container');
      } catch (error) {
        console.error("🚫 Failed to initialize PayPal Buttons:", error);
      }
    };

    loadPayPal();
  }, [price, bookingId, description]);

  return (
    <div
      id="paypal-button-container"
      aria-label="PayPal payment button"
    />
  );
}
