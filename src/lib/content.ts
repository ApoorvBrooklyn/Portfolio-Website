import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "content/posts");
const aboutPath = path.join(process.cwd(), "content/about.json");

// ── GitHub API helpers ──────────────────────────────────────────────────────

const GH_TOKEN = process.env.GITHUB_TOKEN;
const GH_OWNER = process.env.GITHUB_OWNER;
const GH_REPO = process.env.GITHUB_REPO;
const GH_BRANCH = process.env.GITHUB_BRANCH ?? "main";

function isGitHubConfigured() {
  return !!(GH_TOKEN && GH_OWNER && GH_REPO);
}

function assertGitHubConfigured() {
  if (!GH_TOKEN || !GH_OWNER || !GH_REPO) {
    throw new Error(
      "GitHub credentials not configured. Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO to your Vercel environment variables, then redeploy."
    );
  }
}

async function ghGet(filePath: string): Promise<{ sha: string; content: string } | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${filePath}?ref=${GH_BRANCH}`,
    {
      headers: { Authorization: `token ${GH_TOKEN}`, Accept: "application/vnd.github.v3+json" },
      cache: "no-store",
    }
  );
  if (res.status === 404) return null; // file doesn't exist yet — fine for new files
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${err}`);
  }
  return res.json();
}

async function ghWrite(filePath: string, content: string, message: string) {
  const existing = await ghGet(filePath);
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch: GH_BRANCH,
  };
  if (existing?.sha) body.sha = existing.sha;

  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${GH_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${err}`);
  }
}

async function ghDelete(filePath: string, message: string) {
  const existing = await ghGet(filePath);
  if (!existing?.sha) return;

  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${filePath}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `token ${GH_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sha: existing.sha, branch: GH_BRANCH }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub delete failed (${res.status}): ${err}`);
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

export async function savePost(slug: string, markdown: string): Promise<void> {
  if (isGitHubConfigured()) {
    await ghWrite(`content/posts/${slug}.md`, markdown, `Update post: ${slug}`);
  } else {
    assertLocalOrThrow();
    if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
    fs.writeFileSync(path.join(postsDir, `${slug}.md`), markdown, "utf8");
  }
}

export async function deletePost(slug: string): Promise<void> {
  if (isGitHubConfigured()) {
    await ghDelete(`content/posts/${slug}.md`, `Delete post: ${slug}`);
  } else {
    assertLocalOrThrow();
    const file = path.join(postsDir, `${slug}.md`);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
}

export async function saveAbout(data: object): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  if (isGitHubConfigured()) {
    await ghWrite("content/about.json", content, "Update about data");
  } else {
    assertLocalOrThrow();
    fs.writeFileSync(aboutPath, content, "utf8");
  }
}

export function readAboutSync() {
  return JSON.parse(fs.readFileSync(aboutPath, "utf8"));
}

// In production (Vercel) without GitHub credentials, the filesystem is read-only.
// Throw a clear error instead of a cryptic EROFS crash.
function assertLocalOrThrow() {
  if (process.env.NODE_ENV === "production") {
    assertGitHubConfigured();
  }
}
