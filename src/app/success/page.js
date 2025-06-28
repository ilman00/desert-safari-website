// app/success/page.jsx
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-success">✅ Payment Successful!</h1>
      <p>Thank you for booking! We’ll contact you soon.</p>
      <Link href="/">
        <button className="btn btn-primary mt-3 mb-5">Go to Home</button>
      </Link>
    </div>
  );
}
