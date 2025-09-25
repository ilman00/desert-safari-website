"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");

        if (!token) {
            router.push("/admin/login");
            setLoading(false)
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
