// src/models/Admin.js
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export default Admin;
