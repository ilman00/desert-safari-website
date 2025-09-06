import { dbConnect } from "@/lib/dbConnect";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();

    const booking = new Booking({
      name: body.name,
      email: body.email || "",
      phone: body.phone,
      pickupLocation: body.pickupLocation,
      safariPackages: Array.isArray(body.safariPackages)
        ? body.safariPackages
        : [body.safariPackages],
      packageId: body.packageId,
      price: body.price,
      adults: body.adults,
      kids: body.children,   // map children -> kids (matches schema)
      message: body.message,
      paymentStatus: body.paymentType === "online" ? "paid" : "pending",
    });

    const savedBooking = await booking.save();

    return new Response(
      JSON.stringify({ success: true, booking: savedBooking }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error.message, error.stack);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
