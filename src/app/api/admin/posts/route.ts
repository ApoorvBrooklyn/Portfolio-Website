import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { savePost } from "@/lib/content";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const { slug, markdown } = await req.json();
    if (!slug || !markdown) {
      return NextResponse.json({ error: "slug and markdown required" }, { status: 400 });
    }
    await savePost(slug, markdown);
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    return NextResponse.json({ ok: true, slug });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
