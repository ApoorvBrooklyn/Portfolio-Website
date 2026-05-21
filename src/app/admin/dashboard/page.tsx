"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AdminShell } from "../AdminShell";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/posts").then((r) => r.json()).then(setPosts);
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    setPosts((p) => p.filter((x) => x.slug !== slug));
    setDeleting(null);
  };

  return (
    <AdminShell title="Dashboard">
      <div className="space-y-8">
        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/posts/new"
            className="flex items-center justify-center gap-2 border border-dashed border-neutral-300 rounded-lg px-4 py-5 text-sm text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            New post
          </Link>
          <Link
            href="/admin/about"
            className="flex items-center justify-center gap-2 border border-neutral-200 rounded-lg px-4 py-5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Edit about &amp; experience
          </Link>
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center justify-center gap-2 border border-neutral-200 rounded-lg px-4 py-5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View blog ↗
          </Link>
        </div>

        {/* Posts list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Posts ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <p className="text-sm text-neutral-400 py-6 text-center border border-dashed border-neutral-200 rounded-lg">
              No posts yet.{" "}
              <Link href="/admin/posts/new" className="underline underline-offset-2">
                Write your first one →
              </Link>
            </p>
          ) : (
            <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-lg overflow-hidden">
              {posts.map((post) => (
                <div key={post.slug} className="flex items-center justify-between gap-4 px-4 py-3 bg-white hover:bg-neutral-50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-950 truncate">{post.title}</p>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">{post.date}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors px-2 py-1"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded px-2.5 py-1.5 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1 disabled:opacity-50"
                    >
                      {deleting === post.slug ? "…" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
