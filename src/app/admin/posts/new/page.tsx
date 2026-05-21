"use client";
import React from "react";
import { AdminShell } from "../../AdminShell";
import PostEditor from "../PostEditor";

export default function NewPostPage() {
  return (
    <AdminShell title="New post" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
      <PostEditor />
    </AdminShell>
  );
}
