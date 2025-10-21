import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { Review } from '@/models/Reviews';

// POST - Add a new review
export async function POST(req) {
    try {
        await dbConnect()
        const body = await req.json();
        const { name, rating, message } = body;

        if (!message || !rating)
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

        const review = new Review({ name, rating, message });
        await review.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// GET - Fetch approved reviews
export async function GET() {
    try {
        await dbConnect()
        const reviews = await Review.find({ status: 'approved' }).sort({ date: -1 });
        console.log(reviews)
        return NextResponse.json(reviews);
    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PATCH(){
    try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing id ' }, { status: 400 });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { status: "Approve" },
      { new: true }
    );

    if (!updatedReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Status updated', review: updatedReview });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(){
    try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Review deleted', review: deletedReview });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}