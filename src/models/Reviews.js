import mongoose from 'mongoose';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

// Define schema
const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  message: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
});

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);