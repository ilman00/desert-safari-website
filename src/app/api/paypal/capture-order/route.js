// pages/api/paypal/capture-order.js

import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Booking from '@/models/Booking';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Ensure consistent environment variables: PAYPAL_API_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET, EMAIL_USER, EMAIL_PASS, OWNER_EMAIL, TWILIO keys

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
    },
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function notifyOwnerByEmail(orderData, description) {
    const purchaseUnit = orderData.purchase_units?.[0];
    const capture = purchaseUnit?.payments?.captures?.[0];
    const amount = capture?.amount?.value ?? 'N/A';
    const currency = capture?.amount?.currency_code ?? 'N/A';

    const info = await transporter.sendMail({
        from: `"Booking" <${process.env.EMAIL_USER}>`,
        to: process.env.OWNER_EMAIL,
        subject: '✅ New Booking Received (PayPal)',
        text: `Order ID: ${orderData.id}\nAmount: ${amount} ${currency}\nDescription: ${description}`,
    });
    console.log('Email sent', info.messageId);
}

async function notifyOwnerWhatsApp(orderData) {
    const purchaseUnit = orderData.purchase_units?.[0];
    const capture = purchaseUnit?.payments?.captures?.[0];
    const amount = capture?.amount?.value ?? 'N/A';
    const currency = capture?.amount?.currency_code ?? 'N/A';

    await twilioClient.messages.create({
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${process.env.OWNER_WHATSAPP_NUMBER}`,
        body: `✅ New Booking\nOrder: ${orderData.id}\nAmount: ${amount} ${currency}`,
    });
    console.log('WhatsApp sent');
}

export async function POST(req) {
    try {
        await dbConnect();

        const { orderID, bookingId, description } = await req.json();
        if (!orderID) return NextResponse.json({ message: 'orderID required' }, { status: 400 });

        // 1. Authenticate and Capture
        const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID_LIVE}:${process.env.PAYPAL_SECRET_LIVE}`).toString('base64');

        // This uses the consistent PAYPAL_API_URL for live or sandbox
        const res = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await res.json();
        if (!res.ok) {
            console.error('PayPal capture failed', data);
            return NextResponse.json({ success: false, message: 'PayPal capture failed', details: data }, { status: 502 });
        }

        // 2. Update Booking Status (HIGHLY RECOMMENDED)
        if (bookingId) {
            try {
                await Booking.findByIdAndUpdate(bookingId, {
                    // Store the final status (e.g., 'COMPLETED', 'PENDING')
                    paymentStatus: data.status, 
                    paypalOrderId: data.id,
                    paypalRaw: data,
                });
            } catch (updateErr) {
                // Do not fail the API call if DB update fails. Log and continue.
                console.warn('Failed to update booking with payment info', updateErr); 
            }
        }

        // 3. Send notifications only if payment completed
        if (data.status === 'COMPLETED') {
            try {
                await notifyOwnerByEmail(data, description);
            } catch (mailErr) {
                console.error('Email notify failed', mailErr);
            }

            if (process.env.TWILIO_ACCOUNT_SID && process.env.OWNER_WHATSAPP_NUMBER) {
                try {
                    await notifyOwnerWhatsApp(data);
                } catch (waErr) {
                    console.error('WhatsApp notify failed', waErr);
                }
            }
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('capture-order error:', err);
        return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
    }
}