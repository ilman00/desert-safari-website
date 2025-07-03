import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/lib/dbConnect';
import Booking from '@/models/Booking'; // ✅ Import your actual Booking model

export async function GET(req) {
  try {
    await dbConnect();

    // ✅ Extract token from Authorization header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied: Not an admin' }, { status: 403 });
    }

    // ✅ Fetch all bookings
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('❌ Booking fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
