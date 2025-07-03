// models/Booking.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    pickupLocation: String,
    safariPackage: String,
    price: String,
    adults: Number,
    kids: Number,
    message: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
