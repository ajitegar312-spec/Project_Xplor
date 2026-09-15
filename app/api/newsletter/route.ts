import { NextResponse } from "next/server";

// Mock newsletter endpoint. Contract: POST { email } -> { ok: true }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.email?.includes("@")) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
