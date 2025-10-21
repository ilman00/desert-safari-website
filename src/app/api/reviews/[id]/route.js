import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { Review } from '@/models/Reviews';

// PATCH: approve or update status
export async function PATCH(_, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    if (!updatedReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Status updated', review: updatedReview });
  } catch (error) {
    console.error('Error approving review:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE: remove a review
export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

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
