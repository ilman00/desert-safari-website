import mongoose from "mongoose"

const CustomPackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    addons: [
      {
        name: { type: String},
        price: Number
      }
    ],
    expiryDate: Date,
    slug: { type: String, unique: true },
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
  });
  
 export const CustomPackage =
    mongoose.models.CustomPackage ||
    mongoose.model("CustomPackage", CustomPackageSchema);