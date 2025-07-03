import Stripe from 'stripe';

import nodemailer from 'nodemailer';
import { Twilio } from 'twilio';
import Booking from '@/models/Booking';



const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsAppNotification(customerEmail, tourName, amountTotal) {
  const message = `📢 New Booking Received\nCustomer: ${customerEmail}\nTour: ${tourName}\nAmount Paid: ${amountTotal / 100} AED`;

  await twilioClient.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.OWNER_WHATSAPP_NUMBER,
    body: message,
  });
}

async function sendEmailNotification(customerEmail, tourName, amountTotal) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Safari Booking" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: '🎉 New Safari Booking',
    text: `Customer: ${customerEmail}\nTour: ${tourName}\nAmount Paid: ${amountTotal / 100} AED`,
  });
}



export const config = {
  api: {
    bodyParser: false, // required to read raw body
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper to get raw buffer from stream
async function bufferFromWebReadableStream(stream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req) {
  try {
    await connectDB();

    const rawBody = await bufferFromWebReadableStream(req.body);
    const sig = req.headers.get('stripe-signature');

    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log('Webhook hit');
    console.log('✅ Stripe Event:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      const amountTotal = session.amount_total;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 1,
      });

      const tourName = lineItems.data[0]?.description || "Unknown Package";
      console.log('🎉 Success! Customer:', customerEmail);

      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'paid' });
      }

      // Send notifications
      await sendWhatsAppNotification(customerEmail, tourName, amountTotal);
      await sendEmailNotification(customerEmail, tourName, amountTotal);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (err) {
    console.error('❌ Webhook Error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
