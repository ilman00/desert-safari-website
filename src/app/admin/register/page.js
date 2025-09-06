'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router  = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem("admin_token");
    if(!token){
        alert("Only admin has Access to this page")
        router.push("/")
    }
  }, [router])

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/admin/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // If using token in header:
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('✅ Admin registered successfully!');
      setEmail('');
      setPassword('');
      setError('');
    } else {
      setError(data.error || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Register Admin</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="newadmin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <button type="submit" className="btn btn-success w-100">
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
}
