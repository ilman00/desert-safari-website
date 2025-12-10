'use client';

import { useEffect, useRef } from 'react';

export default function PayPalButton({ bookingId, description }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!bookingId) return;
    if (!window.paypal) {
      console.error("PayPal SDK not loaded");
      return;
    }

    const buttons = window.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId, description }),
        });

        const data = await res.json();

        console.log("Create order API response:", data);  // 👈 ADD THIS

        if (!data?.id) {
          console.error("CreateOrder ERROR: No order id returned", data);
          throw new Error("No order id returned");
        }

        return data.id;
      },


      onApprove: async (data) => {
        const res = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderID: data.orderID, bookingId, description }),
        });

        const result = await res.json();
        console.log("Capture result:", result);

        // ⛔ Handle PayPal card decline here
        if (result?.details?.[0]?.description?.includes("This card")) {
          alert(
            "Your card cannot be used for this payment.\n" +
            "PayPal does not support cards issued in your country.\n" +
            "Please try using a card from a PayPal-supported region."
          );
          return;
        }

        // ⛔ Handle general payment failure
        if (result?.status && result.status !== "COMPLETED") {
          alert("Payment failed. Please try again or use another card.");
          return;
        }

        // ✅ Success
        if (result.status === "COMPLETED") {
          window.location.href = `/thank-you?bookingId=${bookingId}`;
        }
      }
      ,

      onError: (err) => {
        console.error("PayPal Error:", err);

        // Detect card submission error
        if (err?.error_message?.includes("This card can’t be used for your payment")) {
          alert(
            "Your card cannot be used for this payment.\n" +
            "PayPal does not support cards issued in your country. " +
            "Please try using a card from a PayPal-supported region."
          );
          return;
        }

        // Default fallback error
        alert("Something went wrong while processing your payment. Please try again.");
      }

    });

    buttons.render(containerRef.current);

    return () => {
      buttons?.close();
    };

  }, [bookingId, description]);

  return <div ref={containerRef} id="paypal-button-container" />;
}
