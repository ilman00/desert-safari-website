import { dbConnect } from "@/lib/dbConnect";
import Booking from "../../../models/Booking";
import nodemailer from "nodemailer";

// Optional if using Node 18+, otherwise uncomment next line
// import fetch from "node-fetch";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(orderData) {
    // 1. Robust Date Handling Fix:
    // Create a safe Date object. orderData.pickupDate should be a Date object
    // from Mongoose. toDateString() is used instead of toLocaleDateString()
    // to prevent timezone shifts from changing the displayed date (e.g., Dec 5 -> Dec 4).
    const safePickupDate = orderData.pickupDate ? new Date(orderData.pickupDate) : null;
    const formattedDate = safePickupDate ? safePickupDate.toDateString() : "Date Missing or Invalid";

    try {
        const info = await transporter.sendMail({
            from: `"Safari Booking" <${process.env.EMAIL_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: "🛑 New Booking – Payment Pending",
            text: `A new booking has been received.

Booking Details:
- Name: ${orderData.name}
- Email: ${orderData.email || "Not provided"}
- Phone: ${orderData.phone}
- Pickup Date: ${formattedDate}
- Pickup Location: ${orderData.pickupLocation}
- Packages: ${orderData.safariPackages.join(", ")}
- Adults: ${orderData.adults}
- Kids: ${orderData.kids}
- Price: ${orderData.price} AED
- Message: ${orderData.message || "No message"}

Please follow up with the customer.`,
        });

        console.log("📧 Email sent:", info.messageId);
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const recaptchaToken = body.recaptchaToken;
        const reCaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

        // Verify reCAPTCHA first
        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${reCaptchaSecret}&response=${recaptchaToken}`,
        });

        const verifyData = await verifyRes.json();
        console.log("ReCAPTCHA verifyData:", verifyData);

        if (!verifyData.success || verifyData.score < 0.5) {
            return new Response(
                JSON.stringify({ success: false, message: "Failed reCAPTCHA verification" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Only connect to DB if reCAPTCHA passed
        await dbConnect();

        // 2. Database Saving Fix: Ensure pickupDate is included in the new Booking object
        const booking = new Booking({
            name: body.name,
            email: body.email || "",
            phone: body.phone,
            // Ensure pickupDate is passed, Mongoose will convert the YYYY-MM-DD string to a Date object
            pickupDate: body.pickupDate, 
            pickupLocation: body.pickupLocation,
            safariPackages: Array.isArray(body.packages) ? body.packages : [body.packages],
            price: body.price,
            adults: body.adults,
            kids: body.kids,
            message: body.message,
        });

        const bookedPackage = await booking.save();

        await sendEmail(bookedPackage);

        return new Response(
            JSON.stringify({ success: true, id: bookedPackage._id }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Booking API error:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}