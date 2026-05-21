"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  title: string;
  back?: { href: string; label: string };
}

export function AdminShell({ children, title, back }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {back && (
              <Link
                href={back.href}
                className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {back.label}
              </Link>
            )}
            {back && <span className="text-neutral-200">·</span>}
            <span className="text-sm font-medium text-neutral-950">{title}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              View site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  };
  return (
    <button
      onClick={handleLogout}
      className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
    >
      Sign out
    </button>
  );
}
