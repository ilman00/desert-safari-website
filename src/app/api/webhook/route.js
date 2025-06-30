import Stripe from 'stripe';

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
      console.log('🎉 Success! Customer:', session.customer_details?.email);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (err) {
    console.error('❌ Webhook Error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
