import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { tourName, price, bookingId } = await req.json();

    const origin = req.headers.get("origin");

    const discountRate = 0.05;

    // Validate inputs
    const numericPrice = parseInt(String(price).match(/\d+/)?.[0]);
    if ((!Array.isArray(tourName) && typeof tourName !== "string") || isNaN(numericPrice)) {
      return new Response(
        JSON.stringify({ error: "Invalid tourName or price" }),
        { status: 400 }
      );
    }

    const discountedPrice = Math.round(numericPrice * (1 - discountRate) * 100); // AED -> fils

    // Format package name(s)
    const formattedName = Array.isArray(tourName)
      ? tourName.join(", ")
      : tourName;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'aed',
            product_data: {
              name: `${formattedName} (5% Online Discount)`,
            },
            unit_amount: discountedPrice,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        bookingId,
        originalPrice: `${numericPrice} AED`,
        discountApplied: "5%",
        packages: formattedName,
      },
    });

    return Response.json({ url: session.url });

  } catch (error) {
    console.error("Stripe error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
