"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { marked } from "marked";
import { useRouter } from "next/navigation";

interface Props {
  slug?: string;
  initial?: {
    title: string;
    date: string;
    description: string;
    tags: string[];
    rawContent: string;
  };
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildMarkdown(title: string, date: string, description: string, tags: string, body: string) {
  const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
  return `---\ntitle: "${title}"\ndate: "${date}"\ndescription: "${description}"\ntags: [${tagArray.map((t) => `"${t}"`).join(", ")}]\n---\n\n${body}`;
}

const TOOLBAR = [
  { label: "B", title: "Bold", wrap: ["**", "**"] },
  { label: "I", title: "Italic", wrap: ["_", "_"] },
  { label: "`", title: "Inline code", wrap: ["`", "`"] },
  { label: "H2", title: "Heading 2", line: "## " },
  { label: "H3", title: "Heading 3", line: "### " },
  { label: "```", title: "Code block", block: "```\n\n```" },
  { label: "—", title: "Divider", insert: "\n---\n" },
  { label: "[ ]", title: "Link", template: "[text](url)" },
];

export default function PostEditor({ slug, initial }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [title, setTitle] = useState(initial?.title ?? "");
  const [date, setDate] = useState(initial?.date ?? today);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [body, setBody] = useState(initial?.rawContent ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const previewHtml = useCallback(() => {
    return String(marked.parse(body || "_Nothing to preview yet._"));
  }, [body]);

  const insertAt = (text: string, wrap?: [string, string], line?: string, block?: string, template?: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = body.slice(start, end);
    let newText = body;
    let cursorPos = start;

    if (wrap) {
      const replacement = `${wrap[0]}${selected || "text"}${wrap[1]}`;
      newText = body.slice(0, start) + replacement + body.slice(end);
      cursorPos = start + wrap[0].length + (selected || "text").length + wrap[1].length;
    } else if (line) {
      const lineStart = body.lastIndexOf("\n", start - 1) + 1;
      newText = body.slice(0, lineStart) + line + body.slice(lineStart);
      cursorPos = lineStart + line.length + (end - lineStart);
    } else if (block) {
      newText = body.slice(0, start) + block + body.slice(end);
      cursorPos = start + block.indexOf("\n") + 1;
    } else if (template) {
      newText = body.slice(0, start) + template + body.slice(end);
      cursorPos = start + template.length;
    }

    setBody(newText);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newBody = body.slice(0, start) + "  " + body.slice(end);
      setBody(newBody);
      setTimeout(() => el.setSelectionRange(start + 2, start + 2), 0);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) { setError("Title is required."); return; }
    setSaving(true);
    setError("");
    const computedSlug = slug ?? slugify(title);
    const markdown = buildMarkdown(title, date, description, tags, body);

    const method = slug ? "PUT" : "POST";
    const url = slug ? `/api/admin/posts/${slug}` : "/api/admin/posts";
    const bodyPayload = slug ? { markdown } : { slug: computedSlug, markdown };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyPayload),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      if (!slug) router.push(`/admin/posts/${computedSlug}/edit`);
    } else {
      const data = await res.json();
      setError(data.error ?? "Save failed.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Meta fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-neutral-500 mb-1.5">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full text-base font-medium border border-neutral-200 rounded-md px-3 py-2.5 bg-white text-neutral-950 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors"
          />
          {title && !slug && (
            <p className="text-xs text-neutral-400 mt-1 font-mono">/blog/{slugify(title)}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1.5">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2 bg-white text-neutral-950 focus:outline-none focus:border-neutral-400 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1.5">Tags (comma-separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="pytorch, transformers, ml"
            className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2 bg-white text-neutral-950 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors font-mono"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-neutral-500 mb-1.5">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One sentence that appears in the post list"
            className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2 bg-white text-neutral-950 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors"
          />
        </div>
      </div>

      {/* Editor */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between bg-neutral-50 border-b border-neutral-200 px-3 py-2">
          <div className="flex items-center gap-1 flex-wrap">
            {TOOLBAR.map((btn) => (
              <button
                key={btn.label}
                type="button"
                title={btn.title}
                onClick={() => insertAt(btn.label, btn.wrap as [string,string] | undefined, btn.line, btn.block, btn.template)}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200 rounded px-2 py-1 transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setTab("write")}
              className={`text-xs px-2.5 py-1 rounded transition-colors ${tab === "write" ? "bg-white border border-neutral-200 text-neutral-950 shadow-sm" : "text-neutral-400 hover:text-neutral-700"}`}
            >
              Write
            </button>
            <button
              onClick={() => setTab("preview")}
              className={`text-xs px-2.5 py-1 rounded transition-colors ${tab === "preview" ? "bg-white border border-neutral-200 text-neutral-950 shadow-sm" : "text-neutral-400 hover:text-neutral-700"}`}
            >
              Preview
            </button>
          </div>
        </div>

        {tab === "write" ? (
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleTab}
            placeholder={`Write in Markdown…\n\n## Section heading\n\nYour content here. Use the toolbar above for formatting.`}
            className="w-full min-h-[460px] resize-y px-4 py-4 text-sm font-mono text-neutral-800 bg-white placeholder:text-neutral-300 focus:outline-none leading-relaxed"
            spellCheck
          />
        ) : (
          <div
            className="blog-content min-h-[460px] px-6 py-6 bg-white text-sm"
            dangerouslySetInnerHTML={{ __html: previewHtml() }}
          />
        )}
      </div>

      {/* Save bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          {saved && <p className="text-xs text-green-600">Saved ✓</p>}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors px-3 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-sm font-medium bg-neutral-950 text-white rounded-md px-5 py-2 hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : slug ? "Save changes" : "Publish post"}
          </button>
        </div>
      </div>
    </div>
  );
}
