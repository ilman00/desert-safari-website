// lib/middleware/verifyAdmin.js
import jwt from 'jsonwebtoken';

export async function verifyAdmin(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return { isAuthorized: false, message: 'No token provided' };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return { isAuthorized: false, message: 'Unauthorized' };
    }

    return { isAuthorized: true, admin: decoded };
  } catch (error) {
    return { isAuthorized: false, message: 'Invalid token' };
  }
}
