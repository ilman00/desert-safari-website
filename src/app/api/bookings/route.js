import { dbConnect } from "@/lib/dbConnect";
import Booking from "../../../models/Booking";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASS, // App password
  },
});

async function sendEmail(orderData) {
  const info = await transporter.sendMail({
    from: `"Safari Booking" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: "🛑 New Booking – Payment Pending",
    text: `A new booking has been received. The customer has not completed payment yet or selected online payment.

Booking Details:
- Name: ${orderData.name}
- Email: ${orderData.email || "Not provided"}
- Phone: ${orderData.phone}
- Pickup Location: ${orderData.pickupLocation}
- Packages: ${orderData.safariPackages.join(", ")}
- Adults: ${orderData.adults}
- Kids: ${orderData.kids}
- Price: ${orderData.price} AED
- Message: ${orderData.message || "No message"}

Please follow up with the customer to confirm and arrange payment.
    `,
  });

  console.log("📧 Email sent:", info.messageId);
}

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();

    const booking = new Booking({
      name: body.name,
      email: body.email || "",
      phone: body.phone,
      pickupLocation: body.pickupLocation,
      safariPackages: Array.isArray(body.packages)
        ? body.packages
        : [body.packages],
      price: body.price,
      adults: body.adults,
      kids: body.kids,
      message: body.message,
    });

    const bookedPackage = await booking.save();

    // Send email to admin
    await sendEmail(bookedPackage);

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
