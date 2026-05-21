"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Wrong password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-sm px-4">
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-neutral-950">Admin</h1>
          <p className="text-sm text-neutral-500 mt-1">Sign in to manage your site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoFocus
              required
              className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2.5 bg-white text-neutral-950 focus:outline-none focus:border-neutral-400 transition-colors"
              placeholder="Enter your admin password"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm font-medium bg-neutral-950 text-white rounded-md px-4 py-2.5 hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
