import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
  rawContent: string;
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, fileName), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        readingTime: estimateReadingTime(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html, { sanitize: false }).process(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    readingTime: estimateReadingTime(content),
    content: processed.toString(),
    rawContent: content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
