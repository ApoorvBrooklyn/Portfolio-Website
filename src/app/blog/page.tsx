import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Writing — Apoorv Sadhale",
  description: "Notes on AI, ML, and building things.",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-neutral-950 mb-2">Writing</h1>
            <p className="text-neutral-500 text-sm">
              Notes on AI, ML, and things I&apos;m building or learning.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-neutral-400 text-sm">No posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-0 divide-y divide-neutral-100">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block py-6 hover:bg-neutral-50 -mx-4 px-4 rounded-md transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-950 group-hover:underline underline-offset-2">
                        {post.title}
                      </p>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {post.description}
                      </p>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-xs text-neutral-400 font-mono">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right space-y-1">
                      <p className="text-xs text-neutral-400 font-mono whitespace-nowrap">
                        {formatDate(post.date)}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {post.readingTime} min read
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
