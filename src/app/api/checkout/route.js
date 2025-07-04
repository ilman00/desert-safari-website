import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { tourName, price, bookingId } = await req.json();

        const origin = req.headers.get("origin");

        const discountRate = 0.05;

        // Extract numeric price
        const numericPrice = parseInt(String(price).match(/\d+/)?.[0]);

        if (!tourName || isNaN(numericPrice)) {
            return new Response(
                JSON.stringify({ error: "Invalid tourName or price" }),
                { status: 400 }
            );
        }

        // Calculate discounted price
        const discountedPrice = Math.round(numericPrice * (1 - discountRate) * 100); // in fils (100 = 1 AED)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'aed',
                        product_data: {
                            name: `${tourName} (5% Online Discount)`, // show it in stripe invoice
                        },
                        unit_amount: discountedPrice, // already in smallest unit
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
            },
        });

        console.log("Created session:", session.id);
        console.log("View at: https://dashboard.stripe.com/test/checkout/sessions/" + session.id);

        return Response.json({ url: session.url });


    } catch (error) {
        console.error("Stripe error:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}
