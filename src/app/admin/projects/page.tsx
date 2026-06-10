"use client";
import React, { useState, useEffect } from "react";
import { AdminShell } from "../AdminShell";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  tags: string[];
}

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [newTags, setNewTags] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch("/api/admin/projects").then((r) => r.json()).then(setProjects);
  }, []);

  if (!projects) {
    return (
      <AdminShell title="Projects" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
        <p className="text-sm text-neutral-400">Loading…</p>
      </AdminShell>
    );
  }

  const update = (i: number, field: keyof Project, val: string) => {
    const next = [...projects];
    next[i] = { ...next[i], [field]: val };
    setProjects(next);
  };

  const addProject = () => {
    const maxId = projects.length ? Math.max(...projects.map((p) => p.id)) : 0;
    setProjects([...projects, { id: maxId + 1, name: "", description: "", link: "", tags: [] }]);
  };

  const removeProject = (i: number) => setProjects(projects.filter((_, idx) => idx !== i));

  const addTag = (i: number) => {
    const tag = (newTags[i] ?? "").trim();
    if (!tag || projects[i].tags.includes(tag)) { setNewTags({ ...newTags, [i]: "" }); return; }
    const next = [...projects];
    next[i] = { ...next[i], tags: [...next[i].tags, tag] };
    setProjects(next);
    setNewTags({ ...newTags, [i]: "" });
  };

  const removeTag = (i: number, tag: string) => {
    const next = [...projects];
    next[i] = { ...next[i], tags: next[i].tags.filter((t) => t !== tag) };
    setProjects(next);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projects),
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
    <AdminShell title="Projects" back={{ href: "/admin/dashboard", label: "Dashboard" }}>
      <div className="space-y-4">
        {projects.length === 0 && (
          <p className="text-sm text-neutral-400 italic">No projects yet.</p>
        )}

        {projects.map((project, i) => (
          <div key={project.id} className="border border-neutral-200 rounded-lg p-4 space-y-3 bg-white relative">
            <button
              onClick={() => removeProject(i)}
              className="absolute top-3 right-3 text-xs text-neutral-300 hover:text-red-400 transition-colors"
              title="Remove project"
            >
              ✕
            </button>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  value={project.name}
                  onChange={(e) => update(i, "name", e.target.value)}
                  className={fieldClass}
                  placeholder="Transformer — from scratch"
                />
              </div>
              <div>
                <label className={labelClass}>Link</label>
                <input
                  value={project.link}
                  onChange={(e) => update(i, "link", e.target.value)}
                  className={fieldClass}
                  placeholder="https://github.com/…"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={project.description}
                onChange={(e) => update(i, "description", e.target.value)}
                rows={2}
                className={`${fieldClass} resize-none`}
                placeholder="What you built and why it matters"
              />
            </div>

            <div>
              <label className={labelClass}>Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs text-neutral-700 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(i, tag)}
                      className="text-neutral-300 hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 max-w-xs">
                <input
                  value={newTags[i] ?? ""}
                  onChange={(e) => setNewTags({ ...newTags, [i]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(i); } }}
                  placeholder="Add tag…"
                  className={fieldClass}
                />
                <button
                  onClick={() => addTag(i)}
                  className="text-sm px-3 py-2 border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 transition-colors whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addProject}
          className="w-full text-sm text-neutral-500 hover:text-neutral-950 border border-dashed border-neutral-300 hover:border-neutral-400 rounded-lg py-4 transition-colors"
        >
          + Add project
        </button>

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
