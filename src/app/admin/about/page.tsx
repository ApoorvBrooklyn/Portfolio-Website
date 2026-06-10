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
  const [newSkill, setNewSkill] = useState("");

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

  // Bio
  const updateBio = (i: number, val: string) => {
    const bio = [...data.bio];
    bio[i] = val;
    setData({ ...data, bio });
  };
  const addBio = () => setData({ ...data, bio: [...data.bio, ""] });
  const removeBio = (i: number) =>
    setData({ ...data, bio: data.bio.filter((_, idx) => idx !== i) });

  // Skills
  const removeSkill = (s: string) =>
    setData({ ...data, skills: data.skills.filter((x) => x !== s) });
  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      setData({ ...data, skills: [...data.skills, trimmed] });
    }
    setNewSkill("");
  };

  // Experience
  const updateExp = (i: number, field: keyof Experience, val: string) => {
    const experience = [...data.experience];
    experience[i] = { ...experience[i], [field]: val };
    setData({ ...data, experience });
  };
  const addExp = () =>
    setData({ ...data, experience: [...data.experience, { role: "", org: "", period: "", desc: "" }] });
  const removeExp = (i: number) =>
    setData({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });

  // Certifications
  const updateCert = (i: number, val: string) => {
    const certifications = [...data.certifications];
    certifications[i] = val;
    setData({ ...data, certifications });
  };
  const addCert = () => setData({ ...data, certifications: [...data.certifications, ""] });
  const removeCert = (i: number) =>
    setData({ ...data, certifications: data.certifications.filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/about", {
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
  const sectionHead = "text-xs font-semibold uppercase tracking-widest text-neutral-400";

  return (
    <AdminShell title="About & Experience" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
      <div className="space-y-10">

        {/* ── Bio ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className={sectionHead}>Bio</h3>
            <button
              onClick={addBio}
              className="text-xs text-neutral-500 hover:text-neutral-950 border border-dashed border-neutral-300 hover:border-neutral-400 rounded px-3 py-1.5 transition-colors"
            >
              + Add paragraph
            </button>
          </div>
          <div className="space-y-3">
            {data.bio.length === 0 && (
              <p className="text-sm text-neutral-400 italic">No bio paragraphs yet.</p>
            )}
            {data.bio.map((para, i) => (
              <div key={i} className="relative">
                <label className={labelClass}>Paragraph {i + 1}</label>
                <textarea
                  value={para}
                  onChange={(e) => updateBio(i, e.target.value)}
                  rows={3}
                  className={`${fieldClass} resize-none pr-8`}
                />
                <button
                  onClick={() => removeBio(i)}
                  className="absolute top-6 right-2 text-neutral-300 hover:text-red-400 transition-colors text-xs"
                  title="Remove paragraph"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── GPA ── */}
        <section>
          <h3 className={`${sectionHead} mb-4`}>GPA</h3>
          <div className="max-w-[160px]">
            <label className={labelClass}>GPA (out of 10)</label>
            <input
              value={data.gpa}
              onChange={(e) => setData({ ...data, gpa: e.target.value })}
              className={fieldClass}
              placeholder="8.31"
            />
          </div>
        </section>

        {/* ── Skills ── */}
        <section>
          <h3 className={`${sectionHead} mb-4`}>Skills</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {data.skills.length === 0 && (
              <p className="text-sm text-neutral-400 italic">No skills yet.</p>
            )}
            {data.skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-700 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md"
              >
                {s}
                <button
                  onClick={() => removeSkill(s)}
                  className="text-neutral-300 hover:text-red-400 transition-colors leading-none"
                  title="Remove skill"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 max-w-sm">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
              placeholder="Add skill…"
              className={fieldClass}
            />
            <button
              onClick={addSkill}
              className="text-sm px-4 py-2 border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 transition-colors whitespace-nowrap"
            >
              Add
            </button>
          </div>
        </section>

        {/* ── Experience ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className={sectionHead}>Experience</h3>
            <button
              onClick={addExp}
              className="text-xs text-neutral-500 hover:text-neutral-950 border border-dashed border-neutral-300 hover:border-neutral-400 rounded px-3 py-1.5 transition-colors"
            >
              + Add role
            </button>
          </div>
          {data.experience.length === 0 && (
            <p className="text-sm text-neutral-400 italic">No experience entries yet.</p>
          )}
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
                    <input
                      value={exp.role}
                      onChange={(e) => updateExp(i, "role", e.target.value)}
                      className={fieldClass}
                      placeholder="ML Engineer Intern"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Organisation</label>
                    <input
                      value={exp.org}
                      onChange={(e) => updateExp(i, "org", e.target.value)}
                      className={fieldClass}
                      placeholder="Samsung Research"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Period</label>
                    <input
                      value={exp.period}
                      onChange={(e) => updateExp(i, "period", e.target.value)}
                      className={fieldClass}
                      placeholder="2023"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <input
                    value={exp.desc}
                    onChange={(e) => updateExp(i, "desc", e.target.value)}
                    className={fieldClass}
                    placeholder="What you built or achieved"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className={sectionHead}>Certifications</h3>
            <button
              onClick={addCert}
              className="text-xs text-neutral-500 hover:text-neutral-950 border border-dashed border-neutral-300 hover:border-neutral-400 rounded px-3 py-1.5 transition-colors"
            >
              + Add
            </button>
          </div>
          {data.certifications.length === 0 && (
            <p className="text-sm text-neutral-400 italic">No certifications yet.</p>
          )}
          <div className="space-y-2">
            {data.certifications.map((c, i) => (
              <div key={i} className="relative">
                <input
                  value={c}
                  onChange={(e) => updateCert(i, e.target.value)}
                  className={`${fieldClass} pr-8`}
                  placeholder="Data Science for Engineers — NPTEL"
                />
                <button
                  onClick={() => removeCert(i)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 text-neutral-300 hover:text-red-400 transition-colors text-xs"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Save bar ── */}
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
