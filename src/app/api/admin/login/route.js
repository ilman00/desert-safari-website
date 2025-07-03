// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin';
import { dbConnect } from '@/lib/dbConnect';

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Option 1: Return token in response body
    return NextResponse.json({ token }, { status: 200 });

    // Option 2 (optional): Set token as HTTP-only cookie
    // return NextResponse.json({ message: 'Login successful' }, {
    //   status: 200,
    //   headers: {
    //     'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=604800`,
    //   }
    // });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
