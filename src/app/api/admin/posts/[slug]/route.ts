import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/lib/posts";
import { savePost, deletePost } from "@/lib/content";
import { revalidatePath } from "next/cache";

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { markdown } = await req.json();
    await savePost(params.slug, markdown);
    revalidatePath("/blog");
    revalidatePath(`/blog/${params.slug}`);
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await deletePost(params.slug);
    revalidatePath("/blog");
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
