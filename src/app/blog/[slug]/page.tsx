import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getAllSlugs } from "@/lib/posts";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Apoorv Sadhale`,
    description: post.description,
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-14">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-10"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Writing
          </Link>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-neutral-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 leading-snug mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <span className="font-mono">{formatDate(post.date)}</span>
              <span>{post.readingTime} min read</span>
              {post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-neutral-100">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
