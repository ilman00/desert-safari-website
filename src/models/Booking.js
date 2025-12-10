import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    safariPackages: [{ type: String }],
    packageId: String ,
    price: { type: Number, required: true },
    adults: { type: Number, default: 1 },
    kids: { type: Number, default: 0 },
    message: { type: String },
    paymentStatus: { type: String, enum: ["paid", "pending"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
