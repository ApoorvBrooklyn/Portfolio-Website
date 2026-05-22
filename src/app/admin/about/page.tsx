"use client";
import React, { useState, useEffect } from "react";
import { AdminShell } from "../AdminShell";

interface Experience {
  role: string;
  org: string;
  period: string;
  desc: string;
}

interface AboutData {
  bio: string[];
  gpa: string;
  skills: string[];
  experience: Experience[];
  certifications: string[];
}

export default function AboutEditor() {
  const [data, setData] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/about").then((r) => r.json()).then(setData);
  }, []);

  if (!data) {
    return (
      <AdminShell title="About & Experience" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
        <p className="text-sm text-neutral-400">Loading…</p>
      </AdminShell>
    );
  }

  const updateBio = (i: number, val: string) => {
    const bio = [...data.bio];
    bio[i] = val;
    setData({ ...data, bio });
  };

  const updateExp = (i: number, field: keyof Experience, val: string) => {
    const exp = [...data.experience];
    exp[i] = { ...exp[i], [field]: val };
    setData({ ...data, experience: exp });
  };

  const addExp = () =>
    setData({ ...data, experience: [...data.experience, { role: "", org: "", period: "", desc: "" }] });

  const removeExp = (i: number) =>
    setData({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        skills: typeof data.skills === "string"
          ? (data.skills as string).split(",").map((s) => s.trim()).filter(Boolean)
          : data.skills,
        certifications: typeof data.certifications === "string"
          ? (data.certifications as string).split("\n").filter(Boolean)
          : data.certifications,
      }),
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

  const fieldClass = "w-full text-sm border border-neutral-200 rounded-md px-3 py-2 bg-white text-neutral-950 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors";
  const labelClass = "block text-xs font-medium text-neutral-500 mb-1.5";

  return (
    <AdminShell title="About & Experience" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
      <div className="space-y-8">

        {/* Bio */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Bio</h3>
          <div className="space-y-3">
            {data.bio.map((para, i) => (
              <div key={i}>
                <label className={labelClass}>Paragraph {i + 1}</label>
                <textarea
                  value={para}
                  onChange={(e) => updateBio(i, e.target.value)}
                  rows={3}
                  className={`${fieldClass} resize-none`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* GPA + Skills */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>GPA</label>
            <input
              value={data.gpa}
              onChange={(e) => setData({ ...data, gpa: e.target.value })}
              className={fieldClass}
              placeholder="8.31"
            />
          </div>
          <div>
            <label className={labelClass}>Skills (comma-separated)</label>
            <textarea
              value={Array.isArray(data.skills) ? data.skills.join(", ") : data.skills}
              onChange={(e) => setData({ ...data, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              rows={3}
              className={`${fieldClass} resize-none font-mono text-xs`}
              placeholder="Python, PyTorch, C++"
            />
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Experience</h3>
            <button
              onClick={addExp}
              className="text-xs text-neutral-500 hover:text-neutral-950 border border-dashed border-neutral-300 hover:border-neutral-400 rounded px-3 py-1.5 transition-colors"
            >
              + Add role
            </button>
          </div>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i} className="border border-neutral-200 rounded-lg p-4 space-y-3 bg-white relative">
                <button
                  onClick={() => removeExp(i)}
                  className="absolute top-3 right-3 text-xs text-neutral-300 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  ✕
                </button>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className={labelClass}>Role</label>
                    <input value={exp.role} onChange={(e) => updateExp(i, "role", e.target.value)} className={fieldClass} placeholder="ML Engineer Intern" />
                  </div>
                  <div>
                    <label className={labelClass}>Organisation</label>
                    <input value={exp.org} onChange={(e) => updateExp(i, "org", e.target.value)} className={fieldClass} placeholder="Samsung Research" />
                  </div>
                  <div>
                    <label className={labelClass}>Period</label>
                    <input value={exp.period} onChange={(e) => updateExp(i, "period", e.target.value)} className={fieldClass} placeholder="2023" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <input value={exp.desc} onChange={(e) => updateExp(i, "desc", e.target.value)} className={fieldClass} placeholder="What you built or achieved" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Certifications</h3>
          <textarea
            value={Array.isArray(data.certifications) ? data.certifications.join("\n") : data.certifications}
            onChange={(e) => setData({ ...data, certifications: e.target.value.split("\n").filter(Boolean) })}
            rows={4}
            className={`${fieldClass} resize-none`}
            placeholder={"Data Science for Engineers — NPTEL\nMachine Learning Foundations — Coursera"}
          />
          <p className="text-xs text-neutral-400 mt-1">One per line</p>
        </section>

        {/* Save */}
        <div className="flex items-center justify-between pt-2">
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
