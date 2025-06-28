// app/cancel/page.jsx
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">❌ Payment Cancelled</h1>
      <p>Your booking was not completed. You can try again.</p>
      <Link href="/">
        <button className="btn btn-warning mt-3 mb-5">Try Again</button>
      </Link>
    </div>
  );
}
