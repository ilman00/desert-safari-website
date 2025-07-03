// app/api/admin/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Admin from '@/models/Admin';
import { dbConnect } from '@/lib/dbConnect';
import { verifyAdmin } from '@/lib/middleware/verifyAdmin';

export async function POST(req) {
  const auth = await verifyAdmin(req);

  if (!auth.isAuthorized) {

    return NextResponse.json({ error: auth.message }, { status: 403 });
  }
  console.log(auth);
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    return NextResponse.json({ message: 'Admin registered successfully' }, { status: 201 });
  } catch (err) {
    console.error('Error registering admin:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
