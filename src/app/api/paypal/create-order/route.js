import { NextResponse } from "next/server";
import { validatePayPalBody } from "@/utils/validatePaypalBody";

export async function POST(req) {
  const { bookingId, price, description } = await req.json();

  // Validate required fields early
  if (!bookingId || !price || !description) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID_LIVE}:${process.env.PAYPAL_SECRET_LIVE}`
  ).toString("base64");

  let usd_price_to_2decimal;

  try {
    const res_of_exchangeRate = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_KEY}/latest/USD`
    );
    const AED_exchange_rate = await res_of_exchangeRate.json();
    const aed_price = AED_exchange_rate.conversion_rates.AED;

    const usd_price = price / aed_price;

    if (isNaN(usd_price)) {
      return NextResponse.json(
        { success: false, message: "Invalid price conversion" },
        { status: 400 }
      );
    }

    usd_price_to_2decimal = usd_price.toFixed(2);

    console.log("Price of the Package in USD:", usd_price_to_2decimal);
  } catch (err) {
    console.error("Exchange rate fetch failed", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch exchange rate" },
      { status: 500 }
    );
  }
  console.log("Amount in USD: ", usd_price_to_2decimal);
  // Call PayPal API

  const rawBody = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: usd_price_to_2decimal,
        },
        description: Array.isArray(description)
          ? description.join(", ")
          : String(description),
        custom_id: String(bookingId),
      },
    ],
    application_context: {
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
    },
  };


  


  const body = JSON.parse(JSON.stringify(rawBody));

  const response = await fetch(
    `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  console.log("PayPal API response:", data);

  return NextResponse.json(data);
}
