import { dbConnect } from "@/lib/dbConnect";
import Booking from "../../../models/Booking";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();

    const booking = new Booking({
      name: body.name,
      email: body.email || "", // optional fallback
      phone: body.phone,
      pickupLocation: body.pickupLocation,
      safariPackages: Array.isArray(body.packages) ? body.packages : [body.packages],
      price: body.price,
      adults: body.adults,
      kids: body.kids,
      message: body.message,
    });

    const bookedPackage = await booking.save();
    return new Response(
      JSON.stringify({ success: true, id: bookedPackage._id }),
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
