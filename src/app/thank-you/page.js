import { Suspense } from 'react';
import ThankYouContent from './ThankYouContent';

export default function ThankYouPage() {
  return (
    <Suspense fallback={<p className="text-center py-5">Loading...</p>}>
      <ThankYouContent />
    </Suspense>
  );
}