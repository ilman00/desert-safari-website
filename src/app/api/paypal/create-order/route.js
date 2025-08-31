// app/api/create-paypal-order/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { bookingId,price, description } = await req.json();
  let usd_price
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString('base64');

  try{

    const res_of_exchangeRate = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_KEY}/latest/USD`)
    const AED_exchange_rate = await res_of_exchangeRate.json()
    const aed_price = AED_exchange_rate.conversion_rates.AED
    usd_price = price / aed_price

    if(!usd_price){
      return NextResponse.json({success: false, message: "USD price required for conversion"})
    }
    console.log("Price of the Package in USD:", usd_price);

  }catch(err){
    console.error("Exchange rate fetch failed", err);
    return NextResponse.json({ success: false, message: "Failed to fetch exchange rate" }, { status: 500 });
  }

  if (!bookingId || !price || !description) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
  }
  

  const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${auth}`
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: usd_price.toFixed(2)
        },
        description: description,
        custom_id: bookingId
      }],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW"
      }
    })
  });

  const data = await response.json();
  console.log("data",data);
  return NextResponse.json(data);
}
