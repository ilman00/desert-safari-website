// pages/api/paypal/create-order.js

import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Booking from '@/models/Booking'; 
// Environment variables required: PAYPAL_API_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET, EXCHANGE_RATE_KEY

async function getUsdFromAed(aedAmount) {
    const key = process.env.EXCHANGE_RATE_KEY;
    if (!key) throw new Error('Missing EXCHANGE_RATE_KEY');

    // Use latest/AED to get the conversion rate to USD (USD per AED)
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/AED`);
    if (!res.ok) throw new Error('Failed to fetch exchange rates');
    const json = await res.json();
    const usdRate = json?.conversion_rates?.USD;
    if (!usdRate) throw new Error('USD rate not found from exchange API');

    // Calculation: AED Amount * USD per AED rate
    const usd = Number(aedAmount) * Number(usdRate);
    return usd.toFixed(2);
}

export async function POST(req) {
    try {
        await dbConnect();

        const { bookingId, description } = await req.json();
        if (!bookingId) {
            return NextResponse.json({ success: false, message: 'bookingId is required' }, { status: 400 });
        }

        // 1. Fetch booking from DB to confirm amount (Server Authoritative)
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
        }

        // 2. CRITICAL FIX: Check if the booking is already paid (Anti-Double-Payment)
        // Ensure you use the exact status string you use when updating in capture-order.js
        if (booking.paymentStatus === 'COMPLETED') {
             return NextResponse.json(
                { success: false, message: 'This booking has already been paid.' }, 
                { status: 409 }
            );
        }

        // 3. Get the amount and convert currency
        const aedAmount = booking.totalPrice ?? booking.price ?? booking.amount;
        if (aedAmount == null) {
            return NextResponse.json({ success: false, message: 'Booking amount missing' }, { status: 400 });
        }

        const usdAmount = await getUsdFromAed(aedAmount);
        
        // Truncate/limit description to PayPal limits (127 chars)
        const desc = String(Array.isArray(description) ? description.join(', ') : (description ?? booking.title ?? 'Booking')).slice(0, 127);

        // 4. Create PayPal order
        const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID_LIVE}:${process.env.PAYPAL_SECRET_LIVE}`).toString('base64');

        const body = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: { currency_code: 'USD', value: usdAmount },
                    description: desc,
                    custom_id: String(bookingId),
                },
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
            },
        };

        const res = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) {
            console.error('PayPal create-order failed', data);
            return NextResponse.json({ success: false, message: 'PayPal create order failed', details: data }, { status: 502 });
        }

        return NextResponse.json({ id: data.id, raw: data });
    } catch (err) {
        console.error('create-order error:', err);
        return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
    }
}