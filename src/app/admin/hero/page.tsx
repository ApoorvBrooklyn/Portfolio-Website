"use client";
import React, { useState, useEffect } from "react";
import { AdminShell } from "../AdminShell";

interface HeroData {
  label: string;
  name: string;
  headline: string;
  subline: string;
  githubUrl: string;
  resumeUrl: string;
}

export default function HeroEditor() {
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/hero").then((r) => r.json()).then(setData);
  }, []);

  if (!data) {
    return (
      <AdminShell title="Hero" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
        <p className="text-sm text-neutral-400">Loading…</p>
      </AdminShell>
    );
  }

  const set = (field: keyof HeroData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData({ ...data, [field]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Save failed.");
    }
  };

  const fieldClass =
    "w-full text-sm border border-neutral-200 rounded-md px-3 py-2 bg-white text-neutral-950 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors";
  const labelClass = "block text-xs font-medium text-neutral-500 mb-1.5";

  return (
    <AdminShell title="Hero" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
      <div className="space-y-6 max-w-2xl">

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Label (shown above name)</label>
            <input value={data.label} onChange={set("label")} className={fieldClass} placeholder="AI Engineer" />
          </div>
          <div>
            <label className={labelClass}>Name</label>
            <input value={data.name} onChange={set("name")} className={fieldClass} placeholder="Apoorv Sadhale" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Headline</label>
          <textarea
            value={data.headline}
            onChange={set("headline")}
            rows={3}
            className={`${fieldClass} resize-none`}
            placeholder="I build neural networks and ML systems…"
          />
        </div>

        <div>
          <label className={labelClass}>Subline</label>
          <textarea
            value={data.subline}
            onChange={set("subline")}
            rows={4}
            className={`${fieldClass} resize-none`}
            placeholder="ECE student at RVCE. Interning at…"
          />
        </div>

        <div>
          <label className={labelClass}>GitHub URL</label>
          <input value={data.githubUrl} onChange={set("githubUrl")} className={fieldClass} placeholder="https://github.com/…" />
        </div>

        <div>
          <label className={labelClass}>Resume URL</label>
          <input value={data.resumeUrl} onChange={set("resumeUrl")} className={fieldClass} placeholder="https://drive.google.com/…" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {saved && <p className="text-xs text-green-600">Saved ✓</p>}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-sm font-medium bg-neutral-950 text-white rounded-md px-5 py-2 hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
