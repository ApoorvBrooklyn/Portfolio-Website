import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "apoorvssadhale@gmail.com",
      reply_to: email,
      subject: `Message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to send message.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
