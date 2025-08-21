import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { dbConnect } from '@/lib/dbConnect';


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // your Gmail
    pass: process.env.EMAIL_PASS        // App password (not your main Gmail password!)
  }
});


async function sendEmail(orderData, description) {
  const purchaseUnit = orderData.purchase_units?.[0];

  const capture = purchaseUnit?.payments?.captures?.[0];
  const amount = capture?.amount?.value || 'N/A';
  const currency = capture?.amount?.currency_code || 'N/A';
  
  const info = await transporter.sendMail({
    from: `"Safari Booking" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: '✅ New Booking Received (PayPal)',
    text: `A new booking was completed.\n\nOrder ID: ${orderData.id}\nAmount: ${amount} ${currency} \n description: ${description}`
  });

  console.log('📧 Email sent:', info.messageId);
}


async function sendWhatsAppMessage(orderData) {
  const purchaseUnit = orderData.purchase_units?.[0];
  const amount = purchaseUnit?.amount?.value || 'N/A';
  const currency = purchaseUnit?.amount?.currency_code || 'N/A';

  await twilioClient.messages.create({
    body: `✅ New Booking Received\nOrder ID: ${orderData.id}\nAmount: ${amount} ${currency}`,
    from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
    to: `whatsapp:${process.env.OWNER_WHATSAPP_NUMBER}`
  });

  console.log('💬 WhatsApp message sent');
}




export async function POST(req) {
  try {
    dbConnect()
    const { orderID , description} = await req.json();

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString('base64');

    const res = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      }
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error }, { status: res.status });
    }

    const data = await res.json();

    if(data.status === "COMPLETED"){
      await sendEmail(data, description)
      // await sendWhatsAppMessage(data)
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Capture Order Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
