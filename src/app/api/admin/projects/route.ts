import { NextRequest, NextResponse } from "next/server";
import { readProjectsSync, saveProjects } from "@/lib/content";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = readProjectsSync();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await saveProjects(data);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
