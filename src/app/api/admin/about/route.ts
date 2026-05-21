import { NextRequest, NextResponse } from "next/server";
import { saveAbout, readAboutSync } from "@/lib/content";
import { revalidatePath } from "next/cache";

export async function GET() {
  const data = readAboutSync();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await saveAbout(data);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
