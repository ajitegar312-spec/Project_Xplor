import { NextResponse } from "next/server";

// Mock lead endpoint — replace with SMTP/CRM/WA integration later.
// Contract: POST { name, email, company?, budget?, message } -> { ok: true }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.name || !body?.email?.includes("@") || !body?.message) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }
    // Simulate latency; log server-side only (never expose real contacts to client).
    await new Promise((r) => setTimeout(r, 300));
    console.log("[mock /api/contact]", { name: body.name, email: body.email });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
