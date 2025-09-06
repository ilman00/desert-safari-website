import { dbConnect } from "@/lib/dbConnect";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();

    // Basic validation
    const required = ["name", "phone", "pickupLocation"];
    for (const k of required) {
      if (!body[k]) {
        return new Response(
          JSON.stringify({ success: false, error: `${k} is required` }),
          { status: 400 }
        );
      }
    }

    const safariPackages = Array.isArray(body.safariPackages)
      ? body.safariPackages
      : body.safariPackages
      ? [body.safariPackages]
      : [];

    const priceNum = Number(body.price);
    const price = Number.isFinite(priceNum) ? priceNum : 0;

    const booking = new Booking({
      name: body.name,
      email: body.email || "",
      phone: body.phone,
      pickupLocation: body.pickupLocation,
      safariPackages,
      packageId: body.packageId,
      price,                 // schema will cast if it is String
      adults: Number(body.adults) || 1,
      kids: Number(body.kids) || 0,     // map kids -> kids
      message: body.message || "",
      paymentStatus: body.paymentType === "online" ? "paid" : "pending",
    });

    const savedBooking = await booking.save();

    return new Response(
      JSON.stringify({ success: true, booking: savedBooking }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
}
