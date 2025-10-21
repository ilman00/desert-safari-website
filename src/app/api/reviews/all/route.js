import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { Review } from '@/models/Reviews';



export async function GET() {
    try {
        await dbConnect();
        const reviews = await Review.find().sort({ date: -1 });
        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Error fetching all reviews:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
