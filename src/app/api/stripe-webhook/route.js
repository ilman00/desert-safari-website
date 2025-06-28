import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

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
  const signature = req.headers.get("stripe-signature");
  let rawBody;

  try {
    // ✅ Must read raw body here
    rawBody = await bufferFromWebReadableStream(req.body);

    // ✅ Must use the exact secret from `stripe listen` CLI
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("✅ Stripe Event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("🎉 Success! Customer:", session.customer_details?.email);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return new Response("Webhook error", { status: 400 });
  }
}
