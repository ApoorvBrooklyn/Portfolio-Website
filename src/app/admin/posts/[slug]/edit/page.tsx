"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminShell } from "../../../AdminShell";
import PostEditor from "../../PostEditor";

export default function EditPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [initialData, setInitialData] = useState<null | {
    title: string; date: string; description: string; tags: string[]; rawContent: string;
  }>(null);

  useEffect(() => {
    fetch(`/api/admin/posts/${slug}`)
      .then((r) => r.json())
      .then((post) => {
        setInitialData({
          title: post.title,
          date: post.date,
          description: post.description,
          tags: post.tags,
          rawContent: post.rawContent ?? "",
        });
      });
  }, [slug]);

  if (!initialData) {
    return (
      <AdminShell title="Edit post" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
        <p className="text-sm text-neutral-400">Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Edit post" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
      <PostEditor slug={slug} initial={initialData} />
    </AdminShell>
  );
}
